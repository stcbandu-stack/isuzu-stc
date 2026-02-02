import { defineMiddleware } from "astro:middleware";
import { createClient } from '@supabase/supabase-js';

export const onRequest = defineMiddleware(async (context, next) => {
    const { url, redirect, cookies } = context;

    // Protect /admin routes
    if (url.pathname.startsWith("/admin")) {
        // Allow access to login page and callback
        if (url.pathname === "/admin/login" || url.pathname === "/admin/login/" ||
            url.pathname === "/admin/callback" || url.pathname === "/admin/callback/") {
            return next();
        }

        // Get environment variables
        const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
        
        // Check if env vars are set
        if (!supabaseUrl || !supabaseAnonKey) {
            console.error('Missing Supabase environment variables');
            return redirect("/admin/login");
        }

        // Check session from cookies first
        const accessToken = cookies.get('sb-access-token')?.value;
        
        if (!accessToken) {
            return redirect("/admin/login");
        }

        try {
            // Create Supabase client with cookies
            const supabase = createClient(supabaseUrl, supabaseAnonKey, {
                global: {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            });

            // Verify the token is valid
            const { data: { user }, error } = await supabase.auth.getUser();
            
            if (error || !user) {
                return redirect("/admin/login");
            }
        } catch (err) {
            console.error('Auth error:', err);
            return redirect("/admin/login");
        }
    }

    // Protect /team routes (Team Dashboard)
    if (url.pathname.startsWith("/team")) {
        // Allow access to team login page and callback
        if (url.pathname === "/team/login" || url.pathname === "/team/login/" ||
            url.pathname === "/team/callback" || url.pathname === "/team/callback/") {
            return next();
        }

        // Get environment variables
        const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseAnonKey) {
            console.error('Missing Supabase environment variables');
            return redirect("/team/login");
        }

        // Check session from cookies
        const accessToken = cookies.get('sb-access-token')?.value;
        
        if (!accessToken) {
            return redirect("/team/login");
        }

        try {
            const supabase = createClient(supabaseUrl, supabaseAnonKey, {
                global: {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            });

            const { data: { user }, error } = await supabase.auth.getUser();
            
            if (error || !user) {
                return redirect("/team/login");
            }
        } catch (err) {
            console.error('Team auth error:', err);
            return redirect("/team/login");
        }
    }

    return next();
});
