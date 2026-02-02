-- =====================================================
-- MENU PERMISSIONS SCHEMA
-- ระบบจัดการสิทธิ์การเข้าถึงเมนูรายบุคคล
-- =====================================================

-- Table: menu_item_permissions
-- เก็บข้อมูลว่า menu item แต่ละอันใครเห็นได้บ้าง
CREATE TABLE IF NOT EXISTS menu_item_permissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    menu_item_id UUID NOT NULL REFERENCES dashboard_menu_items(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    can_view BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(menu_item_id, user_id)
);

-- Add visibility_mode column to dashboard_menu_items
-- 'public' = ทุกคนเห็น (default)
-- 'restricted' = เฉพาะคนที่กำหนดไว้ใน permissions
ALTER TABLE dashboard_menu_items 
ADD COLUMN IF NOT EXISTS visibility_mode VARCHAR(20) DEFAULT 'public';

-- Table: team_users (เก็บข้อมูล user ที่ login เข้ามาในระบบ team)
CREATE TABLE IF NOT EXISTS team_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    email VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_menu_permissions_menu_item ON menu_item_permissions(menu_item_id);
CREATE INDEX IF NOT EXISTS idx_menu_permissions_user ON menu_item_permissions(user_id);
CREATE INDEX IF NOT EXISTS idx_team_users_email ON team_users(email);

-- Enable RLS
ALTER TABLE menu_item_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_users ENABLE ROW LEVEL SECURITY;

-- Note: dashboard_menu_items already has RLS enabled from team_dashboard_schema.sql

-- Policies for menu_item_permissions
CREATE POLICY "Superusers can manage all permissions" ON menu_item_permissions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_roles.user_id = auth.uid() 
            AND user_roles.role = 'superuser'
        )
        OR auth.jwt() ->> 'email' IN ('stc.bandu@gmail.com')
    );

CREATE POLICY "Users can view their own permissions" ON menu_item_permissions
    FOR SELECT USING (user_id = auth.uid());

-- UPDATE RLS for dashboard_menu_items to respect visibility_mode
-- First drop the old permissive policy
DROP POLICY IF EXISTS "Public can view active menu items" ON dashboard_menu_items;

-- Add new restrictive policy
CREATE POLICY "Users can view permitted menu items" ON dashboard_menu_items
FOR SELECT USING (
    is_active = true 
    AND (
        visibility_mode = 'public' 
        OR (visibility_mode IS NULL)
        OR EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_roles.user_id = auth.uid() 
            AND user_roles.role = 'superuser'
        )
        OR auth.jwt() ->> 'email' IN ('stc.bandu@gmail.com')
        OR EXISTS (
            SELECT 1 FROM menu_item_permissions mip
            WHERE mip.menu_item_id = id 
            AND mip.user_id = auth.uid()
            AND mip.can_view = true
        )
    )
);

-- Policies for team_users
CREATE POLICY "Superusers can manage team_users" ON team_users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_roles.user_id = auth.uid() 
            AND user_roles.role = 'superuser'
        )
        OR auth.jwt() ->> 'email' IN ('stc.bandu@gmail.com')
    );

CREATE POLICY "Users can view team_users" ON team_users
    FOR SELECT USING (true);

CREATE POLICY "Users can update their own record" ON team_users
    FOR UPDATE USING (user_id = auth.uid());

-- Function: Auto-create team_user on first login
CREATE OR REPLACE FUNCTION handle_new_team_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.team_users (user_id, email, display_name, avatar_url, last_login)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data->>'avatar_url',
        NOW()
    )
    ON CONFLICT (user_id) DO UPDATE SET
        email = EXCLUDED.email,
        display_name = COALESCE(EXCLUDED.display_name, team_users.display_name),
        avatar_url = COALESCE(EXCLUDED.avatar_url, team_users.avatar_url),
        last_login = NOW(),
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Auto-create team_user
DROP TRIGGER IF EXISTS on_auth_user_created_team ON auth.users;
CREATE TRIGGER on_auth_user_created_team
    AFTER INSERT OR UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_team_user();

-- =====================================================
-- VIEW: Get menu items with permissions for current user
-- =====================================================
CREATE OR REPLACE VIEW user_visible_menu_items AS
SELECT 
    dmi.*,
    CASE 
        WHEN dmi.visibility_mode = 'public' THEN true
        WHEN EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_roles.user_id = auth.uid() 
            AND user_roles.role = 'superuser'
        ) THEN true
        WHEN auth.jwt() ->> 'email' IN ('stc.bandu@gmail.com') THEN true
        WHEN EXISTS (
            SELECT 1 FROM menu_item_permissions mip
            WHERE mip.menu_item_id = dmi.id 
            AND mip.user_id = auth.uid()
            AND mip.can_view = true
        ) THEN true
        ELSE false
    END as is_visible
FROM dashboard_menu_items dmi;
