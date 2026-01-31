-- Create Promotion Leads Table
CREATE TABLE IF NOT EXISTS public.promotion_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    branch TEXT NOT NULL,
    line_id TEXT,
    email TEXT,
    promotion_title TEXT,
    promotion_detail TEXT,
    source_url TEXT,
    status TEXT DEFAULT 'new' -- new, contacted, closed
);

-- Enable RLS
ALTER TABLE public.promotion_leads ENABLE ROW LEVEL SECURITY;

-- Policies
-- 1. Allow public insertion (for the lead form)
CREATE POLICY "Allow public to insert leads" 
ON public.promotion_leads FOR INSERT 
TO public 
WITH CHECK (true);

-- 2. Allow admins to view leads
CREATE POLICY "Allow admins to view leads" 
ON public.promotion_leads FOR SELECT 
TO authenticated 
USING (true);

-- Comment
COMMENT ON TABLE public.promotion_leads IS 'Stores leads captured from promotion interest forms';
