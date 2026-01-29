/* empty css                                 */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BorZG8IO.mjs';
import 'piccolore';
import { _ as _export_sfc, $ as $$MainLayout } from '../chunks/MainLayout_DqAf7Ggx.mjs';
import { useSSRContext, ref, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const dragThreshold = 30;


const _sfc_main = {
  __name: 'TruckCarousel',
  setup(__props, { expose: __expose }) {
  __expose();

const images = [
  '/images/trucks/FRR-S2024.jpg',
  '/images/trucks/FTR-TRACTOR.jpg',
  '/images/trucks/FTR2024.jpg',
  '/images/trucks/FVM-IESC.jpg',
  '/images/trucks/FVM.jpg',
  '/images/trucks/FVZ.jpg',
  '/images/trucks/FXZ-360.jpg',
  '/images/trucks/FYH2024.jpg',
  '/images/trucks/GXZ360.jpg',
  '/images/trucks/NLR.jpg',
  '/images/trucks/NMR-MIXER.jpg',
  '/images/trucks/NMR.jpg',
  '/images/trucks/NPR-MINIBUS.jpg',
  '/images/trucks/NPR.jpg',
  '/images/trucks/NQR.jpg',
];

const currentIndex = ref(0);
const isDragging = ref(false);
const startX = ref(0);
const startDrag = (e) => {
  isDragging.value = true;
  startX.value = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
};

const onDrag = (e) => {
  if (!isDragging.value) return;
  e.preventDefault();
};

const endDrag = (e) => {
  if (!isDragging.value) return;
  isDragging.value = false;

  const endX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
  const diff = startX.value - endX;

  if (Math.abs(diff) > dragThreshold) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
};

const selectSlide = (index) => {
  if (!isDragging.value) {
    currentIndex.value = index;
  }
};

const getCardStyle = (index) => {
  const distance = Math.abs(index - currentIndex.value);
  let actualDistance = Math.min(distance, images.length - distance);
  
  let offset = 0;
  let scale = 1;
  let opacity = 1;
  let zIndex = 0;

  if (actualDistance === 0) {
    // Card ตรงกลาง (ใหญ่สุด)
    scale = 1;
    opacity = 1;
    zIndex = 10;
    offset = 0;
  } else if (actualDistance === 1) {
    // Card ข้างเคียง
    scale = 0.85;
    opacity = 0.7;
    zIndex = 5;
    offset = 120;
  } else {
    // Card ที่ไกลออกไป
    scale = 0.75;
    opacity = 0.4;
    zIndex = 0;
    offset = 200;
  }

  // ปรับตำแหน่งตามทิศทาง (ซ้าย-ขวา)
  const isAfter = (index > currentIndex.value && index - currentIndex.value <= images.length / 2) ||
                  (index < currentIndex.value && currentIndex.value - index > images.length / 2);

  const translateX = isAfter ? offset : -offset;

  return {
    transform: `translateX(${translateX}px) scale(${scale})`,
    opacity,
    zIndex,
  };
};

const __returned__ = { images, currentIndex, isDragging, startX, dragThreshold, startDrag, onDrag, endDrag, nextSlide, prevSlide, selectSlide, getCardStyle, ref };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "relative w-full bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing",
    style: {"height":"600px"}
  }, _attrs))} data-v-c871ff48><div class="relative w-full h-full flex items-center justify-center" data-v-c871ff48><!--[-->`);
  ssrRenderList($setup.images, (image, index) => {
    _push(`<div class="absolute rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-300 ease-out" style="${
      ssrRenderStyle({
          aspectRatio: '4 / 5',
          width: 'clamp(200px, 50vw, 500px)',
          ...$setup.getCardStyle(index)
        })
    }" data-v-c871ff48><img${
      ssrRenderAttr("src", image)
    }${
      ssrRenderAttr("alt", `Truck ${index + 1}`)
    } class="w-full h-full object-cover" loading="lazy" data-v-c871ff48><div class="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" data-v-c871ff48></div></div>`);
  });
  _push(`<!--]--></div><button class="absolute left-4 p-3 bg-isuzu-red/80 hover:bg-isuzu-red text-white rounded-lg transition-colors z-10" data-v-c871ff48><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c871ff48><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-c871ff48></path></svg></button><button class="absolute right-4 p-3 bg-isuzu-red/80 hover:bg-isuzu-red text-white rounded-lg transition-colors z-10" data-v-c871ff48><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c871ff48><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-c871ff48></path></svg></button><div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-lg text-sm" data-v-c871ff48>${
    ssrInterpolate($setup.currentIndex + 1)
  } / ${
    ssrInterpolate($setup.images.length)
  }</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/TruckCarousel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const TruckCarousel = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender],['__scopeId',"data-v-c871ff48"]]);

const $$Trucks = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "\u0E23\u0E16\u0E1A\u0E23\u0E23\u0E17\u0E38\u0E01 - ISUZU STC", "description": "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E23\u0E16\u0E1A\u0E23\u0E23\u0E17\u0E38\u0E01 ISUZU King of Trucks EURO 5 MAX" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen overflow-x-hidden">  <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"> <div class="text-center mb-16"> <img src="/truck-logo.svg" alt="ISUZU King of Trucks" class="h-32 sm:h-40 lg:h-48 object-contain mx-auto mb-8"> <p class="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
ขีดสุดแห่งความคุ้มค่า การบริหารต้นทุน และเทคโนโลยีดีเซล
</p> </div> </section>  <div class="w-screen relative left-[calc(-50vw+50%)] overflow-x-hidden"> <div class="px-4 sm:px-6 lg:px-8 py-8"> <div class="max-w-6xl mx-auto mb-6"> <h2 class="text-3xl font-bold text-white">คอลเลกชั่นรถบรรทุก</h2> </div> ${renderComponent($$result2, "TruckCarousel", TruckCarousel, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/Website/isuzu-stc/src/components/TruckCarousel.vue", "client:component-export": "default" })} </div> </div>  <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"> <div class="grid md:grid-cols-3 gap-8">  <div class="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 hover:border-isuzu-red/50 transition-all duration-300 hover:shadow-2xl hover:shadow-isuzu-red/10"> <div class="mb-6"> <h3 class="text-2xl font-bold text-white mb-2">
ขีดสุดแห่งความคุ้มค่า
</h3> </div> <p class="text-gray-300 leading-relaxed">
ด้วยความพร้อมด้านโซลูชันที่ครบวงจร อีซูซุพร้อมเคียงคู่ผู้ประกอบการขนส่ง ช่วยลดต้นทุน เพิ่มผลกำไร คุ้มค่าตลอดการใช้งาน ด้วย <span class="font-semibold text-isuzu-red">ISUZU Life Cycle Solutions</span> </p> </div>  <div class="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 hover:border-isuzu-red/50 transition-all duration-300 hover:shadow-2xl hover:shadow-isuzu-red/10"> <div class="mb-6"> <h3 class="text-2xl font-bold text-white mb-2">
ขีดสุดแห่งเทคโนโลยีดีเซล
</h3> </div> <p class="text-gray-300 leading-relaxed">
ด้วยความเชี่ยวชาญด้านเทคโนโลยีเครื่องยนต์ดีเซล อีซูซุได้พัฒนาให้ ISUZU King of Trucks EURO 5 MAX ทุกรุ่นสามารถผ่านมาตรฐานไอเสีย ยูโร 5 โดยไม่ต้องเติมน้ำยาบำบัดไอเสีย เช่น AdBlue® หรือน้ำยาอื่นๆ
</p> <p class="text-xs text-gray-400 mt-4">
*AdBlue® is the registered trademark of the Verband der Automobilindustrie e. V. (VDA)
</p> </div>  <div class="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 hover:border-isuzu-red/50 transition-all duration-300 hover:shadow-2xl hover:shadow-isuzu-red/10"> <div class="mb-6"> <h3 class="text-2xl font-bold text-white mb-2">
ขีดสุดแห่งสมรรถนะ
</h3> </div> <p class="text-gray-300 leading-relaxed">
ด้วยเอกลักษณ์แห่งเครื่องยนต์จากอีซูซุ ที่ให้ประสิทธิภาพทั้งด้านกำลังและการประหยัดน้ำมันที่เหนือชั้น แข็งแกร่ง ทนทาน รองรับงานบรรทุกหนักได้อย่างมั่นใจ ตามแบบฉบับของ ISUZU King of Trucks EURO 5 MAX
</p> </div> </div> </section>  <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> <div class="bg-gradient-to-r from-isuzu-red/10 to-slate-800 border border-isuzu-red/20 rounded-2xl p-8"> <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">เพิ่มเติม</h2> <p class="text-gray-300 leading-relaxed">
สำหรับข้อมูลเพิ่มเติมเกี่ยวกับรถบรรทุก ISUZU King of Trucks EURO 5 MAX โปรดติดต่อเราผ่านหน้า ติดต่อเรา หรือเยี่ยมชมศูนย์บริการของเรา
</p> </div> </section> </div> ` })} `;
}, "D:/Website/isuzu-stc/src/pages/trucks.astro", void 0);

const $$file = "D:/Website/isuzu-stc/src/pages/trucks.astro";
const $$url = "/trucks";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Trucks,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
