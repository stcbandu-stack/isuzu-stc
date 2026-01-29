import { defineMiddleware } from "astro:middleware";
import { createClient } from '@supabase/supabase-js';

export const onRequest = defineMiddleware(async (context, next) => {
    const { url, redirect, cookies } = context;

    // Only protect /admin routes
    if (url.pathname.startsWith("/admin")) {
        // Allow access to login page
        if (url.pathname === "/admin/login" || url.pathname === "/admin/login/") {
            return next();
        }

        // Create Supabase client with cookies
        const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
        
        const supabase = createClient(supabaseUrl, supabaseAnonKey, {
            global: {
                headers: {
                    Authorization: `Bearer ${cookies.get('sb-access-token')?.value || ''}`,
                },
            },
        });

        // Check session from cookies
        const accessToken = cookies.get('sb-access-token')?.value;
        
        if (!accessToken) {
            return redirect("/admin/login");
        }

        try {
            // Verify the token is valid
            const { data: { user }, error } = await supabase.auth.getUser();
            
            if (error || !user) {
                return redirect("/admin/login");
            }
        } catch (err) {
            return redirect("/admin/login");
        }
    }

    return next();
});
