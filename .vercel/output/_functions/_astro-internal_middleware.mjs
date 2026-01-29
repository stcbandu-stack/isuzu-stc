import { d as defineMiddleware, s as sequence } from './chunks/index_DF-koQ3_.mjs';
import { createClient } from '@supabase/supabase-js';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_Blra9-16.mjs';
import 'piccolore';
import './chunks/astro/server_BorZG8IO.mjs';
import 'clsx';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const { url, redirect, cookies } = context;
  if (url.pathname.startsWith("/admin")) {
    if (url.pathname === "/admin/login" || url.pathname === "/admin/login/") {
      return next();
    }
    const supabaseUrl = "https://dcigpisivgpofeljvoph.supabase.co";
    const supabaseAnonKey = "sb_publishable_ccUnFtL3x-8eV8exjy4oIw__JiDK4VK";
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${cookies.get("sb-access-token")?.value || ""}`
        }
      }
    });
    const accessToken = cookies.get("sb-access-token")?.value;
    if (!accessToken) {
      return redirect("/admin/login");
    }
    try {
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

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
