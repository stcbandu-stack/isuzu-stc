-- Schema สำหรับ Team Dashboard Builder
-- ตารางสำหรับเก็บกล่องและเมนูใน Dashboard

-- ตาราง Dashboard Boxes (กล่อง)
CREATE TABLE IF NOT EXISTS dashboard_boxes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  color VARCHAR(50) DEFAULT 'gray', -- สีพื้นหลังของกล่อง
  icon VARCHAR(100), -- ชื่อ icon (optional)
  position INTEGER DEFAULT 0, -- ลำดับการแสดงผล
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตาราง Dashboard Menu Items (ปุ่มเมนูภายในกล่อง)
CREATE TABLE IF NOT EXISTS dashboard_menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  box_id UUID REFERENCES dashboard_boxes(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  url VARCHAR(500), -- ลิงก์ปลายทาง (external หรือ internal)
  icon VARCHAR(100), -- ชื่อ icon
  color VARCHAR(50) DEFAULT 'blue', -- สีของปุ่ม
  open_in_new_tab BOOLEAN DEFAULT false,
  position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตาราง User Roles (สิทธิ์ผู้ใช้)
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL DEFAULT 'user', -- 'superuser', 'admin', 'user'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ตาราง Dashboard Page Content (สำหรับ GrapesJS)
CREATE TABLE IF NOT EXISTS dashboard_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  gjs_html TEXT, -- HTML content จาก GrapesJS
  gjs_css TEXT, -- CSS content จาก GrapesJS
  gjs_components TEXT, -- Components JSON จาก GrapesJS
  gjs_styles TEXT, -- Styles JSON จาก GrapesJS
  is_published BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies

-- Enable RLS
ALTER TABLE dashboard_boxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_pages ENABLE ROW LEVEL SECURITY;

-- Policies สำหรับ dashboard_boxes
CREATE POLICY "Public can view active boxes" ON dashboard_boxes
  FOR SELECT USING (is_active = true);

CREATE POLICY "Superusers can manage boxes" ON dashboard_boxes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'superuser'
    )
  );

-- Policies สำหรับ dashboard_menu_items
CREATE POLICY "Public can view active menu items" ON dashboard_menu_items
  FOR SELECT USING (is_active = true);

CREATE POLICY "Superusers can manage menu items" ON dashboard_menu_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'superuser'
    )
  );

-- Policies สำหรับ user_roles
CREATE POLICY "Users can view own role" ON user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Superusers can manage roles" ON user_roles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'superuser'
    )
  );

-- Policies สำหรับ dashboard_pages
CREATE POLICY "Authenticated users can view published pages" ON dashboard_pages
  FOR SELECT USING (is_published = true);

CREATE POLICY "Superusers can manage pages" ON dashboard_pages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'superuser'
    )
  );

-- Indexes
CREATE INDEX idx_dashboard_boxes_position ON dashboard_boxes(position);
CREATE INDEX idx_dashboard_menu_items_box_id ON dashboard_menu_items(box_id);
CREATE INDEX idx_dashboard_menu_items_position ON dashboard_menu_items(position);
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_dashboard_pages_slug ON dashboard_pages(slug);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_dashboard_boxes_updated_at
  BEFORE UPDATE ON dashboard_boxes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dashboard_menu_items_updated_at
  BEFORE UPDATE ON dashboard_menu_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_roles_updated_at
  BEFORE UPDATE ON user_roles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dashboard_pages_updated_at
  BEFORE UPDATE ON dashboard_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
