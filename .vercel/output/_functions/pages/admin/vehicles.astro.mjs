/* empty css                                    */
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BorZG8IO.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../../chunks/MainLayout_DqAf7Ggx.mjs';
import { A as AdminNav } from '../../chunks/AdminNav_CMNxDHy1.mjs';
export { renderers } from '../../renderers.mjs';

const $$Vehicles = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Manage Vehicles - Admin" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-900 pt-20 pb-12"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <!-- Header --> <div class="mb-8"> <h1 class="text-3xl font-bold text-white mb-2">
ระบบหลังบ้าน (Admin Dashboard)
</h1> <p class="text-gray-400">
จัดการข้อมูลและรูปภาพในหน้าเว็บไซต์ ISUZU STC
</p> </div> <div class="grid grid-cols-1 lg:grid-cols-4 gap-8"> <!-- Sidebar Navigation --> <div class="lg:col-span-1"> ${renderComponent($$result2, "AdminNav", AdminNav, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/Website/isuzu-stc/src/components/admin/AdminNav.vue", "client:component-export": "default" })} </div> <!-- Main Content --> <div class="lg:col-span-3"> <div class="bg-gray-800/50 rounded-2xl p-6 border border-gray-700"> <div class="mb-8 border-b border-gray-700 pb-4"> <h2 class="text-2xl font-bold text-white">
จัดการข้อมูลรถยนต์
</h2> <p class="text-gray-400 mt-1">
เพิ่ม ลบ แก้ไข ข้อมูลรถยนต์และสี
</p> </div> ${renderComponent($$result2, "VehicleList", null, { "client:only": "vue", "client:component-hydration": "only", "client:component-path": "D:/Website/isuzu-stc/src/components/admin/VehicleList.vue", "client:component-export": "default" })} </div> </div> </div> </div> </div> ` })} ${renderScript($$result, "D:/Website/isuzu-stc/src/pages/admin/vehicles.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Website/isuzu-stc/src/pages/admin/vehicles.astro", void 0);

const $$file = "D:/Website/isuzu-stc/src/pages/admin/vehicles.astro";
const $$url = "/admin/vehicles";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Vehicles,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
