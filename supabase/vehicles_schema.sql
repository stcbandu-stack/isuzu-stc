-- Create vehicles table
CREATE TABLE vehicles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  model_category VARCHAR(255) NOT NULL, -- Main category: V-Cross, Spark, 2 Drs, 4 Drs, Mu-X, X-Series
  sub_model VARCHAR(255) NOT NULL, -- E.g., 2Drs, Spacecab, Cab4, 4x2 Active
  engine VARCHAR(50), -- E.g., 1.9 Ddi, 3.0 Ddi
  grade VARCHAR(50), -- E.g., Z, S, M AT
  price NUMERIC NOT NULL,
  direct_url TEXT DEFAULT '',
  color_name VARCHAR(100), -- For future use
  color_hex VARCHAR(50), -- For future use
  image_url TEXT, -- To store vehicle image
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public read vehicles" ON vehicles FOR SELECT USING (true);
CREATE POLICY "Admin manage vehicles" ON vehicles FOR ALL USING (
  exists (select 1 from admin_profiles where id = auth.uid() and role = 'admin')
);

-- Insert Data (Based on Brochure)
INSERT INTO vehicles (model_category, sub_model, engine, grade, price) VALUES
-- V-Cross
('V-Cross', '2Drs', '3.0 Ddi', 'Z', 937000),
('V-Cross', '4Drs', '3.0 Ddi', 'Z', 1054000),
('V-Cross', '4Drs', '3.0 Ddi', 'M AT (ADAS)', 1297000),

-- Mu-X
('Mu-X', '4x2', '1.9 Ddi', 'Active', 1194000),
('Mu-X', '4x2', '1.9 Ddi', 'Elegant', 1429000),
('Mu-X', '4x2', '1.9 Ddi', 'Ultimate (ADAS)', 1554000),
('Mu-X', '4x2', '1.9 Ddi', 'RS (ADAS)', 1624000),
('Mu-X', '4x2', '3.0 Ddi', 'RS (ADAS)', 1659000),
('Mu-X', '4x4', '3.0 Ddi', 'RS (ADAS)', 1759000),

-- Spark
('Spark', 'Cab-Chassis', '1.9 Ddi', '-', 558000),
('Spark', 'Cab-Chassis (Refri)', '1.9 Ddi', '-', 563000),
('Spark', 'Cab-Chassis AT (Refri)', '1.9 Ddi', '-', 602000),
('Spark', 'Flat Deck (SWB)', '1.9 Ddi', 'B', 692000),
('Spark', 'Standard', '1.9 Ddi', 'B', 595000),
('Spark', 'Standard', '1.9 Ddi', 'S', 628000),
('Spark', 'Standard', '3.0 Ddi', 'S', 648000),
('Spark', 'Standard', '1.9 Ddi', 'S AT', 672000),
('Spark', '4x4', '3.0 Ddi', 'S', 740000),
('Spark', '4x4', '3.0 Ddi', 'S AT', 780000),

-- 2 Drs (Spacecab & Hi-Lander 2Drs)
('2 Drs', 'Spacecab', '1.9 Ddi', 'S', 668000),
('2 Drs', 'Spacecab', '1.9 Ddi', 'S AT', 712000),
('2 Drs', 'Spacecab', '1.9 Ddi', 'L', 733000),
('2 Drs', 'Spacecab', '1.9 Ddi', 'L AT', 777000),
('2 Drs', 'Hi-Lander', '1.9 Ddi', 'L', 778000),
('2 Drs', 'Hi-Lander', '1.9 Ddi', 'L AT', 822000),
('2 Drs', 'Hi-Lander', '1.9 Ddi', 'Z', 841000),
('2 Drs', 'Hi-Lander', '1.9 Ddi', 'Z AT', 885000),

-- 4 Drs (Cab4 & Hi-Lander 4Drs)
('4 Drs', 'Cab4', '1.9 Ddi', 'S', 749000),
('4 Drs', 'Cab4', '1.9 Ddi', 'S AT', 793000),
('4 Drs', 'Cab4', '1.9 Ddi', 'L', 829000),
('4 Drs', 'Cab4', '1.9 Ddi', 'L AT', 873000),
('4 Drs', 'Cab4', '1.9 Ddi', 'Z', 939000),
('4 Drs', 'Hi-Lander', '1.9 Ddi', 'L', 885000),
('4 Drs', 'Hi-Lander', '1.9 Ddi', 'L AT', 924000),
('4 Drs', 'Hi-Lander', '1.9 Ddi', 'Z', 952000),
('4 Drs', 'Hi-Lander', '1.9 Ddi', 'Z AT', 991000),
('4 Drs', 'Hi-Lander', '1.9 Ddi', 'M AT (ADAS)', 1157000),
('4 Drs', 'Hi-Lander', '3.0 Ddi', 'M AT (ADAS)', 1184000),

-- X-Series
('X-Series', 'Speed 2Drs', '1.9 Ddi', 'L', 768000),
('X-Series', 'Speed 4Drs', '1.9 Ddi', 'L', 864000),
('X-Series', 'HR 4Drs', '1.9 Ddi', 'Z', 1002000),
('X-Series', 'HR 4Drs', '1.9 Ddi', 'Z AT', 1041000);
