-- Migration: เพิ่มระบบ Year Tabs สำหรับ Team Dashboard
-- ข้อมูลจะแบ่งตามปี เช่น 2024, 2025, 2026 ...

-- ตาราง Dashboard Year Tabs
CREATE TABLE IF NOT EXISTS dashboard_year_tabs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL UNIQUE,
  label VARCHAR(100), -- ป้ายแสดง เช่น "ข้อมูลปี 2025"
  is_active BOOLEAN DEFAULT true,
  is_default BOOLEAN DEFAULT false, -- ปีที่แสดงเป็นค่าเริ่มต้น
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- เพิ่มคอลัมน์ year_tab_id ใน dashboard_boxes
ALTER TABLE dashboard_boxes 
  ADD COLUMN IF NOT EXISTS year_tab_id UUID REFERENCES dashboard_year_tabs(id) ON DELETE SET NULL;

-- ใส่ข้อมูลปีเริ่มต้น
INSERT INTO dashboard_year_tabs (year, label, is_active, is_default, position) VALUES
  (2025, 'ข้อมูลปี 2025', true, false, 1),
  (2026, 'ข้อมูลปี 2026', true, true, 0)
ON CONFLICT (year) DO NOTHING;

-- RLS
ALTER TABLE dashboard_year_tabs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active year tabs" ON dashboard_year_tabs
  FOR SELECT USING (is_active = true);

CREATE POLICY "Superusers can manage year tabs" ON dashboard_year_tabs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'superuser'
    )
  );

-- Index
CREATE INDEX IF NOT EXISTS idx_dashboard_year_tabs_year ON dashboard_year_tabs(year);
CREATE INDEX IF NOT EXISTS idx_dashboard_year_tabs_position ON dashboard_year_tabs(position);
CREATE INDEX IF NOT EXISTS idx_dashboard_boxes_year_tab_id ON dashboard_boxes(year_tab_id);

-- Trigger for updated_at
CREATE TRIGGER update_dashboard_year_tabs_updated_at
  BEFORE UPDATE ON dashboard_year_tabs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
