import { defineMiddleware } from "astro:middleware";
import { supabase } from "./lib/supabase";

export const onRequest = defineMiddleware(async (context, next) => {
    const { url, redirect } = context;

    // Only protect /admin routes
    if (url.pathname.startsWith("/admin")) {
        // Allow access to login page
        if (url.pathname === "/admin/login") {
            return next();
        }

        // Check session
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return redirect("/admin/login");
        }
    }

    return next();
});
