/* empty css                                 */
import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_BorZG8IO.mjs';
import 'piccolore';
import { _ as _export_sfc, $ as $$MainLayout } from '../chunks/MainLayout_DqAf7Ggx.mjs';
import { useSSRContext, ref, computed, watch, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const _sfc_main = {
  __name: 'AboutPage',
  setup(__props, { expose: __expose }) {
  __expose();

const selectedBranchKey = ref('bandu');
const loadingMap = ref(true);

const branchData = {
    bandu: {
      name: 'สำนักงานใหญ่ อ.เมือง บ้านดู่',
      address: '222 หมู่ 2 ต.บ้านดู่ อ.เมือง จ.เชียงราย 57100',
      tel: '053-702-666',
      mobile: '086-429-5060',
      map: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7500.224788103395!2d99.853615!3d19.961775!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30d70735b7513e69%3A0xf2d5f8a9f4c925b7!2z4Lia4LiI4LiBLiDguK3guLXguIvguLnguIvguLjguKrguIfguKfguJnguYTguJfguKLguYDguIrguLXguKLguIfguKPguLLguKIg4Liq4Liz4LiZ4Lix4LiB4LiH4Liy4LiZ4LmD4Lir4LiN4LmIIC0gSXN1enUgU2FuZ3VhbnRoYWkgQ2hpYW5ncmFpIEhRLCDguKjguLnguJnguKLguYzguIvguYjguK3guKHguKrguLXguJXguLHguKfguJbguLHguIfguKHguLLguJXguKPguJDguLLguJnguK3guLXguIvguLnguIvguLg!5e0!3m2!1sth!2sus!4v1763961334628!5m2!1sth!2sus'
    },
    phan: {
      name: 'สาขาพาน',
      address: '227 หมู่ 17 ต.สันกลาง อ.พาน จ.เชียงราย 57120',
      tel: '053-722-999',
      mobile: '086-430-1787',
      map: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d60142.71206478927!2d99.746625!3d19.587949!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30d7718ac1549195%3A0x2eb747765529eb72!2z4Lia4Lij4Li04Lip4Lix4LiXIOC4reC4teC4i-C4ueC4i-C4uOC4quC4h-C4p-C4meC5hOC4l-C4ouC5gOC4iuC4teC4ouC4h-C4o-C4suC4oiDguIjguLPguIHguLHguJQg4Liq4Liy4LiC4Liy4Lie4Liy4LiZ!5e0!3m2!1sth!2sus!4v1763961522327!5m2!1sth!2sus'
    },
    maesai: {
      name: 'สาขาแม่สาย',
      address: '419 หมู่ 11 ต.ห้วยไคร้ อ.แม่สาย จ.เชียงราย 57220',
      tel: '053-667-669',
      mobile: '087-305-1222',
      map: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d935.5457987099076!2d99.871693!3d20.292683000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30d6f7e556969a4b%3A0x2b7a04cbfe701c3c!2z4Lit4Li14LiL4Li54LiL4Li44Liq4LiH4Lin4LiZ4LmE4LiX4Lii4LmA4LiK4Li14Lii4LiH4Lij4Liy4Lii4LiI4Liz4LiB4Lix4LiUIOC4quC4suC4guC4suC5geC4oeC5iOC4quC4suC4og!5e0!3m2!1sth!2sus!4v1763961556451!5m2!1sth!2sus'
    },
    maechan: {
      name: 'สาขาแม่จัน',
      address: '333 หมู่ 5 ต.จอมสวรรค์ อ.แม่จัน จ.เชียงราย 57110',
      tel: '053-160-999',
      mobile: '081-465-7555',
      map: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d239656.80826767316!2d99.896136!3d20.190808!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30d6f9c526d98abf%3A0x1edc2dcc8dbedac6!2z4Lit4Li14LiL4Li54LiL4Li44Liq4LiH4Lin4LiZ4LmE4LiX4Lii4LmA4LiK4Li14Lii4LiH4Lij4Liy4LiiIOC4quC4suC4guC4suC5geC4oeC5iOC4iOC4seC4mQ!5e0!3m2!1sth!2sus!4v1763961576636!5m2!1sth!2sus'
    }
};

const currentBranch = computed(() => branchData[selectedBranchKey.value]);

watch(selectedBranchKey, () => {
    loadingMap.value = true;
});

const __returned__ = { selectedBranchKey, loadingMap, branchData, currentBranch, ref, computed, watch };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-900 min-h-screen text-white overflow-hidden pb-12" }, _attrs))} data-v-8597cf0e><section class="relative h-[80vh] flex items-center justify-center overflow-hidden" data-v-8597cf0e><div class="absolute inset-0 z-0" data-v-8597cf0e><div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-gray-900 z-10" data-v-8597cf0e></div><img src="https://images.unsplash.com/photo-1562141989-c5c79ac8f576?q=80&amp;w=2070&amp;auto=format&amp;fit=crop" class="w-full h-full object-cover scale-110 animate-slow-zoom" data-v-8597cf0e></div><div class="relative z-20 text-center px-4 max-w-5xl mx-auto" data-v-8597cf0e><div class="inline-block px-4 py-1.5 bg-isuzu-red/20 border border-isuzu-red/30 rounded-full text-isuzu-red text-xs font-black uppercase tracking-[0.3em] mb-8 animate-fade-in-up" data-v-8597cf0e> 30+ Years of Excellence </div><h1 class="text-5xl md:text-8xl font-black mb-6 tracking-tighter animate-fade-in-up delay-100 uppercase" data-v-8597cf0e> อีซูซุสงวนไทย<span class="text-isuzu-red" data-v-8597cf0e>เชียงราย</span></h1><p class="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200" data-v-8597cf0e> ตำนานแห่งความเชื่อมั่นและบริการที่เหนือระดับ เคียงคู่ทุกความสำเร็จของชาวเชียงรายมาอย่างยาวนาน </p></div><div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce" data-v-8597cf0e><svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8597cf0e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-8597cf0e></path></svg></div></section><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30" data-v-8597cf0e><div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-center" data-v-8597cf0e><div class="space-y-8" data-v-8597cf0e><div class="space-y-4" data-v-8597cf0e><h2 class="text-isuzu-red font-bold tracking-widest uppercase text-sm" data-v-8597cf0e>Our Legacy</h2><h3 class="text-4xl md:text-5xl font-black leading-tight" data-v-8597cf0e>บริษัทในเครือกลุ่ม<br data-v-8597cf0e>อีซูซุสงวนไทย</h3></div><p class="text-gray-400 text-lg leading-relaxed" data-v-8597cf0e> กลุ่มอีซูซุสงวนไทยเปิดดำเนินธุรกิจขึ้นเมื่อปี พ.ศ. 2535 (ค.ศ. 1992) โดยดำเนินธุรกิจในด้านการจำหน่าย รถยนต์อีซูซุ ศูนย์บริการมาตรฐานอีซูซุและอะไหล่ อย่างครบวงจร เปิดให้บริการใน 9 จังหวัด 23 สาขาทั่วประเทศ 4 สาขาในเชียงราย </p><div class="grid grid-cols-2 gap-8 pt-4" data-v-8597cf0e><div class="border-l-2 border-isuzu-red pl-6 py-2" data-v-8597cf0e><div class="text-3xl font-black text-white mb-1" data-v-8597cf0e>30+</div><div class="text-gray-500 text-sm uppercase font-bold" data-v-8597cf0e>Years Experience</div></div><div class="border-l-2 border-isuzu-red pl-6 py-2" data-v-8597cf0e><div class="text-3xl font-black text-white mb-1" data-v-8597cf0e>23</div><div class="text-gray-500 text-sm uppercase font-bold" data-v-8597cf0e>Showrooms</div></div></div></div><div class="relative group" data-v-8597cf0e><div class="absolute -inset-4 bg-isuzu-red/10 rounded-3xl blur-2xl group-hover:bg-isuzu-red/20 transition-all duration-500" data-v-8597cf0e></div><img src="/images/network-map.png" alt="STM Network Map" class="relative rounded-2xl border border-gray-700 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" data-v-8597cf0e></div></div><div class="bg-gray-800/50 rounded-3xl border border-gray-700 p-8 md:p-16 mb-32 relative overflow-hidden group" data-v-8597cf0e><div class="absolute top-0 right-0 w-64 h-64 bg-isuzu-red/10 blur-[100px] rounded-full -mr-32 -mt-32 transition-colors group-hover:bg-isuzu-red/20" data-v-8597cf0e></div><div class="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10" data-v-8597cf0e><div class="space-y-6" data-v-8597cf0e><div class="p-3 bg-isuzu-red/20 rounded-2xl w-fit" data-v-8597cf0e><svg class="w-8 h-8 text-isuzu-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8597cf0e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-8597cf0e></path></svg></div><h4 class="text-3xl font-bold" data-v-8597cf0e>เป้าหมายและพันธกิจ</h4><p class="text-gray-400 text-lg leading-relaxed" data-v-8597cf0e> มุ่งสู่ความเป็นเลิศในด้านการขาย และการบริการหลังการขาย เพื่อให้ลูกค้าได้รับความพึงพอใจสูงสุดอย่างยั่งยืน </p></div><div class="space-y-6" data-v-8597cf0e><div class="p-3 bg-isuzu-red/20 rounded-2xl w-fit" data-v-8597cf0e><svg class="w-8 h-8 text-isuzu-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8597cf0e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" data-v-8597cf0e></path></svg></div><h4 class="text-3xl font-bold" data-v-8597cf0e>ความรับผิดชอบต่อสังคม</h4><p class="text-gray-400 text-lg leading-relaxed" data-v-8597cf0e> ถือมั่นในความรับผิดชอบต่อสังคม ดำเนินธุรกิจโดยคำนึงถึงหน้าที่และความรับผิดชอบที่พึงมีต่อสังคมส่วนรวมและสิ่งแวดล้อม </p></div></div></div><div class="text-center mb-16 px-4" data-v-8597cf0e><h2 class="text-4xl md:text-5xl font-black mb-4 uppercase" data-v-8597cf0e>สาขาใน<span class="text-isuzu-red" data-v-8597cf0e>เชียงราย</span></h2><div class="w-24 h-1 bg-isuzu-red mx-auto rounded-full mb-6" data-v-8597cf0e></div><p class="text-gray-400 text-lg" data-v-8597cf0e>ค้นหาโชว์รูมและศูนย์บริการมาตรฐานครบวงจรใกล้บ้านคุณ</p></div><div class="bg-gray-800/40 rounded-[2.5rem] border border-gray-700 overflow-hidden backdrop-blur-md shadow-2xl flex flex-col lg:flex-row min-h-[650px]" data-v-8597cf0e><div class="lg:w-[450px] p-8 md:p-12 flex flex-col justify-center bg-gray-900/30" data-v-8597cf0e><div class="space-y-8" data-v-8597cf0e><div data-v-8597cf0e><label class="block text-xs font-black text-isuzu-red uppercase tracking-[0.2em] mb-4" data-v-8597cf0e>Select Location</label><div class="relative" data-v-8597cf0e><select class="w-full bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4 text-white appearance-none focus:border-isuzu-red outline-none transition-all cursor-pointer font-bold text-lg" data-v-8597cf0e><!--[-->`);
  ssrRenderList($setup.branchData, (b, key) => {
    _push(`<option${
      ssrRenderAttr("value", key)
    } data-v-8597cf0e${
      (ssrIncludeBooleanAttr((Array.isArray($setup.selectedBranchKey))
        ? ssrLooseContain($setup.selectedBranchKey, key)
        : ssrLooseEqual($setup.selectedBranchKey, key))) ? " selected" : ""
    }>${
      ssrInterpolate(b.name)
    }</option>`);
  });
  _push(`<!--]--></select><div class="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-isuzu-red" data-v-8597cf0e><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8597cf0e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-8597cf0e></path></svg></div></div></div><div class="space-y-6 animate-fade-in" data-v-8597cf0e><div class="flex gap-5 p-6 bg-gray-900/50 rounded-2xl border border-gray-800 group hover:border-isuzu-red/30 transition-colors" data-v-8597cf0e><div class="flex-shrink-0 w-12 h-12 bg-isuzu-red/10 rounded-xl flex items-center justify-center text-isuzu-red" data-v-8597cf0e><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8597cf0e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-v-8597cf0e></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-v-8597cf0e></path></svg></div><div class="flex-1" data-v-8597cf0e><div class="text-xs font-bold text-gray-500 uppercase mb-1" data-v-8597cf0e>Address</div><div class="text-gray-200 leading-relaxed" data-v-8597cf0e>${
    ssrInterpolate($setup.currentBranch.address)
  }</div></div></div><div class="grid grid-cols-1 gap-4" data-v-8597cf0e><div class="flex gap-4 p-5 bg-gray-900/50 rounded-2xl border border-gray-800 group hover:border-isuzu-red/30 transition-colors" data-v-8597cf0e><div class="flex-shrink-0 w-10 h-10 bg-isuzu-red/10 rounded-lg flex items-center justify-center text-isuzu-red" data-v-8597cf0e><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8597cf0e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" data-v-8597cf0e></path></svg></div><div data-v-8597cf0e><div class="text-[10px] font-bold text-gray-500 uppercase mb-0.5" data-v-8597cf0e>Telephone</div><div class="text-gray-200 font-bold" data-v-8597cf0e>${
    ssrInterpolate($setup.currentBranch.tel)
  }</div></div></div><div class="flex gap-4 p-5 bg-gray-900/50 rounded-2xl border border-gray-800 group hover:border-isuzu-red/30 transition-colors" data-v-8597cf0e><div class="flex-shrink-0 w-10 h-10 bg-isuzu-red/10 rounded-lg flex items-center justify-center text-isuzu-red" data-v-8597cf0e><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8597cf0e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" data-v-8597cf0e></path></svg></div><div data-v-8597cf0e><div class="text-[10px] font-bold text-gray-500 uppercase mb-0.5" data-v-8597cf0e>Mobile</div><div class="text-gray-200 font-bold" data-v-8597cf0e>${
    ssrInterpolate($setup.currentBranch.mobile)
  }</div></div></div></div><a${
    ssrRenderAttr("href", `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent($setup.currentBranch.name + ' ' + $setup.currentBranch.address)}`)
  } target="_blank" class="w-full py-4 bg-isuzu-red hover:bg-red-700 text-white rounded-2xl font-black text-center transition-all shadow-xl shadow-isuzu-red/20 flex items-center justify-center gap-2 group" data-v-8597cf0e> เปิดใน Google Maps <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8597cf0e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" data-v-8597cf0e></path></svg></a></div></div></div><div class="flex-1 min-h-[500px] lg:min-h-full relative bg-gray-900" data-v-8597cf0e>`);
  if ($setup.loadingMap) {
    _push(`<div class="absolute inset-0 bg-gray-900 flex items-center justify-center" data-v-8597cf0e><div class="animate-pulse flex flex-col items-center" data-v-8597cf0e><div class="w-12 h-12 border-4 border-isuzu-red/20 border-t-isuzu-red rounded-full animate-spin" data-v-8597cf0e></div><span class="mt-4 text-gray-500 font-bold uppercase tracking-widest text-xs" data-v-8597cf0e>Loading Map...</span></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<iframe${
    ssrRenderAttr("src", $setup.currentBranch.map)
  } class="${
    ssrRenderClass([{ 'opacity-100': !$setup.loadingMap }, "absolute inset-0 w-full h-full border-none opacity-0 transition-opacity duration-1000"])
  }" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" data-v-8597cf0e></iframe><div class="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-900 via-gray-900/20 to-transparent pointer-events-none hidden lg:block" data-v-8597cf0e></div></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/AboutPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const AboutPage = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender],['__scopeId',"data-v-8597cf0e"]]);

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "\u0E40\u0E01\u0E35\u0E48\u0E22\u0E27\u0E01\u0E31\u0E1A\u0E40\u0E23\u0E32 - ISUZU STC" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AboutPage", AboutPage, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "D:/Website/isuzu-stc/src/components/AboutPage.vue", "client:component-export": "default" })} ` })}`;
}, "D:/Website/isuzu-stc/src/pages/about.astro", void 0);

const $$file = "D:/Website/isuzu-stc/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
