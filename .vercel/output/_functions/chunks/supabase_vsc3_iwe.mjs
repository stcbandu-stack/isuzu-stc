import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://dcigpisivgpofeljvoph.supabase.co";
const supabaseAnonKey = "sb_publishable_ccUnFtL3x-8eV8exjy4oIw__JiDK4VK";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase as s };
