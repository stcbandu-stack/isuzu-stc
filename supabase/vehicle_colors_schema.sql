-- 1. Create vehicle_colors table
CREATE TABLE vehicle_colors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  color_name VARCHAR(100) NOT NULL,
  color_hex VARCHAR(50) NOT NULL,
  image_url TEXT, -- Specific image for this color
  price_extra NUMERIC DEFAULT 0, -- Extra cost for this color (e.g. Pearl White)
  direct_url TEXT, -- Specific link for this color variant
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable RLS
ALTER TABLE vehicle_colors ENABLE ROW LEVEL SECURITY;

-- 3. Policies for vehicle_colors
CREATE POLICY "Public read vehicle_colors" ON vehicle_colors FOR SELECT USING (true);
CREATE POLICY "Admin manage vehicle_colors" ON vehicle_colors FOR ALL USING (
  exists (select 1 from admin_profiles where id = auth.uid() and role = 'admin')
);

-- 4. Sample Data Insertion (Mocking colors for existing categories)
-- Note: This uses a DO block to dynamically find IDs, ensuring it works even if IDs changed.

DO $$
DECLARE
  v_record RECORD;
BEGIN
  -- Loop through all vehicles to add standard colors
  FOR v_record IN SELECT id, model_category FROM vehicles LOOP
    
    -- Add generic colors for visualization (You can edit these later)
    INSERT INTO vehicle_colors (vehicle_id, color_name, color_hex, price_extra)
    VALUES 
      (v_record.id, 'Bavarian Black Mica', '#1a1a1a', 0),
      (v_record.id, 'Siberian White', '#f0f0f0', 0),
      (v_record.id, 'Bohemian Silver', '#c0c0c0', 0);

    -- Add specific colors for V-Cross (Example)
    IF v_record.model_category = 'V-Cross' THEN
       INSERT INTO vehicle_colors (vehicle_id, color_name, color_hex, price_extra)
       VALUES (v_record.id, 'Namibu Orange Mica', '#e67300', 7000);
    END IF;

    -- Add specific colors for Mu-X
    IF v_record.model_category = 'Mu-X' THEN
       INSERT INTO vehicle_colors (vehicle_id, color_name, color_hex, price_extra)
       VALUES (v_record.id, 'Glacier Blue', '#4d88ff', 0);
    END IF;

  END LOOP;
END $$;

-- 5. (Optional) Cleanup old columns from vehicles if you want to enforce strict normalization
-- ALTER TABLE vehicles DROP COLUMN color_name;
-- ALTER TABLE vehicles DROP COLUMN color_hex;
