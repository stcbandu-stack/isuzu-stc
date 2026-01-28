-- =============================================
-- ISUZU STC - Supabase Database Schema
-- =============================================

-- =============================================
-- 1. SLIDES TABLE (Hero Slideshow)
-- =============================================
CREATE TABLE public.slides (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    button_text VARCHAR(100),
    button_link VARCHAR(255),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add comment for documentation
COMMENT ON TABLE public.slides IS 'Hero slideshow images for landing page';

-- Create index for ordering
CREATE INDEX idx_slides_order ON public.slides(display_order, is_active);

-- =============================================
-- 2. ADMIN USERS TABLE (for authentication)
-- =============================================
-- Note: Supabase Auth handles user authentication
-- This table stores additional admin metadata

CREATE TABLE public.admin_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.admin_profiles IS 'Admin user profiles linked to Supabase Auth';

-- =============================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on slides table
ALTER TABLE public.slides ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active slides (public read)
CREATE POLICY "Public can view active slides"
ON public.slides
FOR SELECT
USING (is_active = true);

-- Policy: Only authenticated admins can view all slides
CREATE POLICY "Admins can view all slides"
ON public.slides
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.admin_profiles
        WHERE id = auth.uid()
    )
);

-- Policy: Only authenticated admins can insert slides
CREATE POLICY "Admins can insert slides"
ON public.slides
FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.admin_profiles
        WHERE id = auth.uid()
    )
);

-- Policy: Only authenticated admins can update slides
CREATE POLICY "Admins can update slides"
ON public.slides
FOR UPDATE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.admin_profiles
        WHERE id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.admin_profiles
        WHERE id = auth.uid()
    )
);

-- Policy: Only authenticated admins can delete slides
CREATE POLICY "Admins can delete slides"
ON public.slides
FOR DELETE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.admin_profiles
        WHERE id = auth.uid()
    )
);

-- Enable RLS on admin_profiles table
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can view their own profile
CREATE POLICY "Users can view own profile"
ON public.admin_profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Policy: Admins can update their own profile
CREATE POLICY "Users can update own profile"
ON public.admin_profiles
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- =============================================
-- 4. TRIGGER FOR updated_at
-- =============================================

-- Function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for slides table
CREATE TRIGGER update_slides_updated_at
    BEFORE UPDATE ON public.slides
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for admin_profiles table
CREATE TRIGGER update_admin_profiles_updated_at
    BEFORE UPDATE ON public.admin_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 5. SAMPLE DATA (Optional - for testing)
-- =============================================

-- INSERT INTO public.slides (title, description, image_url, button_text, button_link, display_order) VALUES
-- ('ISUZU D-MAX', 'พิชิตทุกเส้นทาง ด้วยพลังที่เหนือกว่า', '/images/slide-1.png', 'ดูรายละเอียด', '#dmax', 1),
-- ('ISUZU MU-X', 'SUV พรีเมียม สำหรับทุกไลฟ์สไตล์', '/images/slide-2.png', 'ดูรายละเอียด', '#mux', 2),
-- ('บริการรถยนต์สำหรับองค์กร', 'โซลูชั่นครบวงจรสำหรับธุรกิจของคุณ', '/images/slide-3.png', 'ติดต่อเรา', '#contact', 3);
