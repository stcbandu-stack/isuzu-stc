import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables are not set');
}

// สร้าง Supabase client พร้อมตั้งค่า persistSession ให้เก็บใน localStorage
// เพื่อให้ session คงอยู่แม้ปิด browser
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        // เก็บ session ใน localStorage (จะคงอยู่หลังปิด browser)
        persistSession: true,
        // ใช้ localStorage เป็น storage (default)
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        // key ที่ใช้เก็บใน localStorage
        storageKey: 'sb-isuzu-stc-auth',
        // ตรวจสอบ session อัตโนมัติเมื่อเปิดหน้าเว็บ
        autoRefreshToken: true,
        detectSessionInUrl: true,
    }
});

// Helper function สำหรับ logout (ล้าง localStorage ด้วย)
export async function signOutAndClearStorage() {
    // Sign out จาก Supabase (จะล้าง localStorage อัตโนมัติ)
    await supabase.auth.signOut();
    
    // ล้าง cookies
    if (typeof document !== 'undefined') {
        document.cookie = 'sb-access-token=; path=/; max-age=0';
        document.cookie = 'sb-refresh-token=; path=/; max-age=0';
    }
    
    // ล้าง localStorage ด้วย (เผื่อกรณี signOut ไม่ล้างให้)
    if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem('sb-isuzu-stc-auth');
    }
}
