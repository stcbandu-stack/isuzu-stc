-- Create Promotions Table
CREATE TABLE IF NOT EXISTS public.promotions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    direct_url TEXT,
    is_active BOOLEAN DEFAULT true
);

-- Enable RLS
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;

-- Policies
-- 1. Public Read Access
CREATE POLICY "Allow public read-only access to promotions" 
ON public.promotions FOR SELECT 
TO public 
USING (is_active = true);

-- 2. Admin Full Access
CREATE POLICY "Allow authenticated admins to manage promotions" 
ON public.promotions FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Sample Data (using placeholder images 4:5 aspect ratio)
INSERT INTO public.promotions (title, description, image_url, direct_url)
VALUES 
(
    'โปรแรง! อีซูซุ วี-ครอส ขับเคลื่อน 4 ล้อ ดอกเบี้ยพิเศษ 0.99%', 
    'เป็นเจ้าของอีซูซุ วี-ครอส 4x4 วันนี้ รับข้อเสนอสุดพิเศษ ดอกเบี้ย 0.99% หรือเลือกรับช่วยผ่อน 10,000 บาท นาน 6 เดือน พร้อมฟรีประกันภัยชั้น 1',
    'https://placehold.co/800x1000/e31a22/ffffff?text=V-Cross+Promotion',
    'https://www.isuzu-tis.com/promotions'
),
(
    'ISUZU MU-X พิเศษ! ฟรีบัตรน้ำมัน 20,000 บาท', 
    'ซื้อ ISUZU MU-X รุ่นใดก็ได้ รับฟรีบัตรน้ำมันมูลค่า 20,000 บาท พร้อมแพ็กเกจบำรุงรักษาอีซูซุ สไมล์คลับ นาน 3 ปี สำหรับลูกค้าเชียงรายเท่านั้น',
    'https://placehold.co/800x1000/1a1a1a/ffffff?text=MU-X+Fuel+Promo',
    NULL
),
(
    'ออกรถกระบะอีซูซุ ใช้เงินเพียง 9,900 บาท', 
    'โปรดาวน์น้อยสำหรับชาวเชียงราย ออกรถอีซูซุ ดีแมคซ์ สปาร์ค หรือ แค็บ4 ใช้เงินดาวน์เพียง 9,900 บาท ไม่ต้องมีคนค้ำประกัน ผ่อนนานสูงสุด 84 เดือน',
    'https://placehold.co/800x1000/555555/ffffff?text=D-Max+9900',
    NULL
);
