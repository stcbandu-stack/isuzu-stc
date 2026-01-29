import{s as a}from"./supabase.Br-sM2rM.js";const o=async()=>{const{data:{session:s}}=await a.auth.getSession();s||(window.location.href="/admin/login")};o();
