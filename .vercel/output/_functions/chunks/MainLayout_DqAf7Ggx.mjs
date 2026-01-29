import { e as createComponent, g as addAttribute, n as renderHead, k as renderComponent, o as renderSlot, r as renderTemplate, h as createAstro } from './astro/server_BorZG8IO.mjs';
import 'piccolore';
import { useSSRContext, mergeProps, ref, defineComponent, onMounted, onUnmounted } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
/* empty css                         */

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main$3 = {
  __name: 'ContactModal',
  props: {
  show: Boolean
},
  emits: ['close'],
  setup(__props, { expose: __expose }) {
  __expose();





const branches = [
  {
    name: 'สำนักงานใหญ่ อ.เมือง (บ้านดู่)',
    phones: ['053-702-666', '086-429-5060'],
    facebook: 'https://www.facebook.com/stcbu'
  },
  {
    name: 'สาขาพาน',
    phones: ['053-722-999', '086-430-1787'],
    facebook: 'https://www.facebook.com/ISUZU.ONLINE.PHAN'
  },
  {
    name: 'สาขาแม่สาย',
    phones: ['053-667-669', '087-305-1222'],
    facebook: 'https://www.facebook.com/Isuzumaesai'
  },
  {
    name: 'สาขาแม่จัน',
    phones: ['053-160-999', '081-465-7555'],
    facebook: 'https://www.facebook.com/IsuzuMaechan'
  }
];

const __returned__ = { branches };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($props.show) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-[100] flex items-center justify-center p-4" }, _attrs))} data-v-64bce73b><div class="absolute inset-0 bg-black/80 backdrop-blur-md" data-v-64bce73b></div><div class="relative bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-scale-up" data-v-64bce73b><button class="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10 p-2 hover:bg-white/10 rounded-full" data-v-64bce73b><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-64bce73b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-64bce73b></path></svg></button><div class="p-8 md:p-10" data-v-64bce73b><div class="text-center mb-10" data-v-64bce73b><h2 class="text-3xl font-black text-white uppercase tracking-tight" data-v-64bce73b> ติดต่อ<span class="text-isuzu-red" data-v-64bce73b>เรา</span></h2><div class="w-20 h-1 bg-isuzu-red mx-auto mt-4 rounded-full" data-v-64bce73b></div></div><div class="grid grid-cols-2 gap-6 mb-12" data-v-64bce73b><div class="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 flex flex-col items-center group hover:border-isuzu-red/30 transition-all" data-v-64bce73b><div class="bg-white p-2 rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-300" data-v-64bce73b><img src="/fb-qr.svg" alt="อีซูซุสงวนไทย Facebook" class="w-32 h-32 md:w-40 md:h-40" data-v-64bce73b></div><p class="text-white font-bold text-sm" data-v-64bce73b>อีซูซุสงวนไทย</p><p class="text-gray-400 text-xs mt-1" data-v-64bce73b>Facebook Page</p></div><div class="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 flex flex-col items-center group hover:border-isuzu-red/30 transition-all" data-v-64bce73b><div class="bg-white p-2 rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-300" data-v-64bce73b><img src="/line-oa.svg" alt="Line @STCCR" class="w-32 h-32 md:w-40 md:h-40" data-v-64bce73b></div><p class="text-[#06C755] font-bold text-sm" data-v-64bce73b>@STCCR</p><p class="text-gray-400 text-xs mt-1" data-v-64bce73b>Line Official Account</p></div></div><div class="space-y-4" data-v-64bce73b><h3 class="text-gray-400 font-bold text-xs uppercase tracking-[0.2em] px-2" data-v-64bce73b>ช่องทางการติดต่อ</h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-3" data-v-64bce73b><!--[-->`);
    ssrRenderList($setup.branches, (branch) => {
      _push(`<div class="bg-slate-800/30 p-4 rounded-2xl border border-slate-700/30 flex flex-col justify-center" data-v-64bce73b><p class="text-isuzu-red font-bold text-sm mb-2" data-v-64bce73b>${ssrInterpolate(branch.name)}</p><div class="flex flex-col gap-1" data-v-64bce73b><!--[-->`);
      ssrRenderList(branch.phones, (phone) => {
        _push(`<a${
          ssrRenderAttr("href", 'tel:' + phone.replace(/-/g, ''))
        } class="text-white hover:text-isuzu-red text-base font-medium transition-colors flex items-center gap-2 group" data-v-64bce73b><svg class="w-4 h-4 text-gray-500 group-hover:text-isuzu-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-64bce73b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" data-v-64bce73b></path></svg> ${
          ssrInterpolate(phone)
        }</a>`);
      });
      _push(`<!--]--><a${ssrRenderAttr("href", branch.facebook)} target="_blank" rel="noopener noreferrer" class="mt-1 text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 group" data-v-64bce73b><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" data-v-64bce73b><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" data-v-64bce73b></path></svg> Facebook </a></div></div>`);
    });
    _push(`<!--]--></div></div></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/ContactModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined
};
const ContactModal = /*#__PURE__*/_export_sfc(_sfc_main$3, [['ssrRender',_sfc_ssrRender$3],['__scopeId',"data-v-64bce73b"]]);

const _sfc_main$2 = {
  __name: 'Navbar',
  setup(__props, { expose: __expose }) {
  __expose();

const isOpen = ref(false);
const showContactModal = ref(false);

const menuItems = [
  { name: 'หน้าแรก', href: '/' },
  { name: 'รถบรรทุก', href: '/trucks' },
  { name: 'โปรโมชั่น', href: '/promotions' },
  { 
    name: 'บริการ', 
    href: '#',
    children: [
      { name: 'คำนวณค่างวด', href: 'https://www.isuzu-tis.com/calculator' },
      { name: 'เปรียบเทียบรุ่น', href: 'https://www.isuzu-tis.com/compare/' }
    ]
  },
  { name: 'เกี่ยวกับเรา', href: '/about' },
];

const __returned__ = { isOpen, showContactModal, menuItems, ref, ContactModal };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<nav${ssrRenderAttrs(mergeProps({ class: "bg-gradient-to-r from-isuzu-dark to-slate-900 shadow-lg sticky top-0 z-50" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between h-16"><div class="flex-shrink-0"><a href="/" class="flex items-center group"><img src="/STC-LOGO-RGB.svg" alt="ISUZU STC" class="h-10 w-auto transition-transform group-hover:scale-105"></a></div><div class="hidden md:block"><div class="ml-10 flex items-center space-x-1"><!--[-->`);
  ssrRenderList($setup.menuItems, (item) => {
    _push(`<!--[-->`);
    if (item.children) {
      _push(`<div class="relative group"><button class="text-gray-300 group-hover:bg-isuzu-red group-hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1">${ssrInterpolate(item.name)} <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div class="absolute left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50"><div class="pt-2"><div class="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl"><!--[-->`);
      ssrRenderList(item.children, (subItem) => {
        _push(`<a${
          ssrRenderAttr("href", subItem.href)
        } target="_blank" rel="noopener noreferrer" class="block px-4 py-3 text-sm text-gray-300 hover:bg-isuzu-red hover:text-white transition-colors border-b border-slate-700 last:border-0">${
          ssrInterpolate(subItem.name)
        }</a>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    } else {
      _push(`<a${
        ssrRenderAttr("href", item.href)
      } class="text-gray-300 hover:bg-isuzu-red hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-isuzu-red/20">${
        ssrInterpolate(item.name)
      }</a>`);
    }
    _push(`<!--]-->`);
  });
  _push(`<!--]--></div></div><div class="hidden md:block"><button class="bg-isuzu-red hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-isuzu-red/40 hover:scale-105"> ติดต่อเรา </button></div><div class="md:hidden"><button class="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition-colors"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">`);
  if (!$setup.isOpen) {
    _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`);
  } else {
    _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`);
  }
  _push(`</svg></button></div></div></div>`);
  if ($setup.isOpen) {
    _push(`<div class="md:hidden bg-slate-800/95 backdrop-blur-lg border-t border-slate-700"><div class="px-2 pt-2 pb-3 space-y-1"><!--[-->`);
    ssrRenderList($setup.menuItems, (item) => {
      _push(`<!--[-->`);
      if (item.children) {
        _push(`<div class="space-y-1"><div class="px-4 py-3 text-isuzu-red font-bold text-sm uppercase tracking-wider">${ssrInterpolate(item.name)}</div><!--[-->`);
        ssrRenderList(item.children, (subItem) => {
          _push(`<a${
            ssrRenderAttr("href", subItem.href)
          } target="_blank" rel="noopener noreferrer" class="text-gray-300 hover:bg-slate-700 block px-8 py-3 rounded-lg text-base font-medium transition-all duration-300">${
            ssrInterpolate(subItem.name)
          }</a>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<a${
          ssrRenderAttr("href", item.href)
        } class="text-gray-300 hover:bg-isuzu-red hover:text-white block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300">${
          ssrInterpolate(item.name)
        }</a>`);
      }
      _push(`<!--]-->`);
    });
    _push(`<!--]--><button class="w-full bg-isuzu-red text-white block px-4 py-3 rounded-lg text-base font-medium text-center mt-4 hover:bg-red-700 transition-colors"> ติดต่อเรา </button></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(ssrRenderComponent($setup["ContactModal"], {
    show: $setup.showContactModal,
    onClose: $event => ($setup.showContactModal = false)
  }, null, _parent));
  _push(`</nav>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/Navbar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined
};
const Navbar = /*#__PURE__*/_export_sfc(_sfc_main$2, [['ssrRender',_sfc_ssrRender$2]]);

const _sfc_main$1 = {  };

function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<footer${
    ssrRenderAttrs(mergeProps({ class: "bg-gray-900 border-t border-gray-800 pt-16 pb-8" }, _attrs))
  }><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12"><div class="lg:col-span-3 space-y-6"><div class="flex items-center"><img src="/STC-LOGO-RGB.svg" alt="ISUZU STC" class="h-10 w-auto"></div><p class="text-gray-400 text-sm leading-relaxed"> อีซูซุสงวนไทยเชียงราย ตัวแทนจำหน่ายรถยนต์อีซูซุมาตรฐานครบวงจร พร้อมศูนย์บริการและอะไหล่แท้ มุ่งมั่นให้บริการด้วยใจเพื่อความพึงพอใจสูงสุดของคุณ </p><div class="pt-4 border-t border-gray-800/50"><h4 class="text-white font-semibold text-sm mb-3">มาเป็นเพื่อนกับเรา</h4><div class="flex items-center space-x-4 bg-gray-800/30 p-3 rounded-xl border border-gray-800"><img src="/line-oa.svg" alt="Line OA @STCCR" class="h-16 w-16 rounded-lg bg-white p-1"><div><p class="text-isuzu-red font-bold text-lg">@STCCR</p><p class="text-gray-400 text-xs">สแกนเพื่อรับข่าวสารและโปรโมชั่น</p></div></div></div><div class="flex space-x-4"><a href="https://www.facebook.com/isuzustc/" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-[#1877F2] transition-colors"><span class="sr-only">Facebook</span><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path></svg></a><a href="https://www.youtube.com/@STCCR" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-[#FF0000] transition-colors"><span class="sr-only">YouTube</span><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg></a><a href="https://line.me/R/ti/p/@STCCR" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-[#06C755] transition-colors"><span class="sr-only">Line</span><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.038 1.087l-.164 1.022c-.049.307-.238 1.201 1.027.655 1.265-.546 6.829-4.02 9.317-6.887 1.748-1.921 2.689-3.945 2.689-6.097zm-18.156 3.235c-.172 0-.312-.14-.312-.312v-3.792c0-.172.14-.312.312-.312h.156c.172 0 .312.14.312.312v3.324h1.844c.172 0 .312.14.312.312v.156c0 .172-.14.312-.312.312h-2.312zm3.375 0c-.172 0-.312-.14-.312-.312v-3.792c0-.172.14-.312.312-.312h.156c.172 0 .312.14.312.312v3.792c0 .172-.14.312-.312.312h-.156zm6.188 0c0 .15-.098.282-.244.312-.023.003-.047.006-.071.006-.118 0-.223-.067-.272-.171l-2.003-2.802v2.655c0 .172-.14.312-.312.312h-.156c-.172 0-.312-.14-.312-.312v-3.792c0-.15.098-.282.244-.312.023-.003.047-.006.071-.006.118 0 .223.067.272.171l2.003 2.802v-2.655c0-.172.14-.312.312-.312h.156c.172 0 .312.14.312.312v3.792zm4.148-2.094c0 .172-.14.312-.312.312h-1.844v.938h1.844c.172 0 .312.14.312.312v.156c0 .172-.14.312-.312.312h-2.312c-.172 0-.312-.14-.312-.312v-3.792c0-.172.14-.312.312-.312h2.312c.172 0 .312.14.312.312v.156c0 .172-.14.312-.312.312h-1.844v.938h1.844c.172 0 .312.14.312.312v.156z"></path></svg></a></div></div><div class="lg:col-span-2"><h3 class="text-white font-bold text-lg mb-6">เมนูลัด</h3><ul class="space-y-4"><li><a href="/" class="text-gray-400 hover:text-white transition-colors">หน้าหลัก</a></li><li><a href="/trucks" class="text-gray-400 hover:text-white transition-colors">รถบรรทุก</a></li><li><a href="https://www.isuzu-tis.com/calculator" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">คำนวณค่างวด</a></li><li><a href="https://www.isuzu-tis.com/compare/" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">เปรียบเทียบรุ่น</a></li><li><a href="/about" class="text-gray-400 hover:text-white transition-colors">เกี่ยวกับเรา</a></li></ul></div><div class="lg:col-span-7"><h3 class="text-white font-bold text-lg mb-6">ติดต่อสาขาใกล้บ้านท่าน</h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8"><div><h4 class="text-isuzu-red font-semibold mb-2 flex items-center"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg> สำนักงานใหญ่ อ.เมือง (บ้านดู่) </h4><p class="text-gray-400 text-sm mb-2">222 หมู่ 2 ต.บ้านดู่ อ.เมือง จ.เชียงราย 57100</p><div class="flex flex-col space-y-1 text-sm"><a href="tel:053-702-666" class="text-gray-400 hover:text-white transition-colors flex items-center"><svg class="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>053-702-666</a><a href="tel:086-429-5060" class="text-gray-400 hover:text-white transition-colors flex items-center ml-5">086-429-5060</a></div></div><div><h4 class="text-isuzu-red font-semibold mb-2 flex items-center"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> สาขาพาน </h4><p class="text-gray-400 text-sm mb-2">227 หมู่ 17 ต.สันกลาง อ.พาน จ.เชียงราย 57120</p><div class="flex flex-col space-y-1 text-sm"><a href="tel:053-722-999" class="text-gray-400 hover:text-white transition-colors flex items-center"><svg class="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>053-722-999</a><a href="tel:086-430-1787" class="text-gray-400 hover:text-white transition-colors flex items-center ml-5">086-430-1787</a></div></div><div><h4 class="text-isuzu-red font-semibold mb-2 flex items-center"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> สาขาแม่สาย </h4><p class="text-gray-400 text-sm mb-2">419 หมู่ 11 ต.ห้วยไคร้ อ.แม่สาย จ.เชียงราย 57220</p><div class="flex flex-col space-y-1 text-sm"><a href="tel:053-667-669" class="text-gray-400 hover:text-white transition-colors flex items-center"><svg class="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>053-667-669</a><a href="tel:087-305-1222" class="text-gray-400 hover:text-white transition-colors flex items-center ml-5">087-305-1222</a></div></div><div><h4 class="text-isuzu-red font-semibold mb-2 flex items-center"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> สาขาแม่จัน </h4><p class="text-gray-400 text-sm mb-2">333 หมู่ 5 ต.จอมสวรรค์ อ.แม่จัน จ.เชียงราย 57110</p><div class="flex flex-col space-y-1 text-sm"><a href="tel:053-160-999" class="text-gray-400 hover:text-white transition-colors flex items-center"><svg class="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>053-160-999</a><a href="tel:081-465-7555" class="text-gray-400 hover:text-white transition-colors flex items-center ml-5">081-465-7555</a></div></div></div></div></div><div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500"><p>© ${
    ssrInterpolate(new Date().getFullYear())
  } อีซูซุสงวนไทย. All rights reserved.</p><div class="flex space-x-6 mt-4 md:mt-0"><a href="/policy" class="hover:text-white transition-colors">Privacy Policy</a><a href="/policy" class="hover:text-white transition-colors">Terms of Service</a></div></div></div></footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};
const Footer = /*#__PURE__*/_export_sfc(_sfc_main$1, [['ssrRender',_sfc_ssrRender$1]]);

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ToastContainer",
  setup(__props, { expose: __expose }) {
    __expose();
    const toasts = ref([]);
    let nextId = 0;
    const addToast = (event) => {
      const customEvent = event;
      const { message, type, duration } = customEvent.detail;
      const id = nextId++;
      const item = { id, message, type, duration };
      toasts.value.push(item);
      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    };
    const removeToast = (id) => {
      const index = toasts.value.findIndex((t) => t.id === id);
      if (index !== -1) {
        toasts.value.splice(index, 1);
      }
    };
    onMounted(() => {
      window.addEventListener("toast-notification", addToast);
    });
    onUnmounted(() => {
      window.removeEventListener("toast-notification", addToast);
    });
    const __returned__ = { toasts, get nextId() {
      return nextId;
    }, set nextId(v) {
      nextId = v;
    }, addToast, removeToast };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] flex flex-col gap-2 w-full max-w-sm pointer-events-none p-4" }, _attrs))} data-v-503d819c><!--[-->`);
  ssrRenderList($setup.toasts, (toast) => {
    _push(`<div class="${ssrRenderClass([{
      "bg-green-600/90 border-green-500": toast.type === "success",
      "bg-red-600/90 border-red-500": toast.type === "error",
      "bg-blue-600/90 border-blue-500": toast.type === "info"
    }, "pointer-events-auto flex items-center p-4 rounded-lg shadow-lg text-white border min-w-[300px] backdrop-blur-md"])}" data-v-503d819c><div class="flex-shrink-0 mr-3" data-v-503d819c>`);
    if (toast.type === "success") {
      _push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-503d819c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-503d819c></path></svg>`);
    } else {
      _push(`<!---->`);
    }
    if (toast.type === "error") {
      _push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-503d819c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-503d819c></path></svg>`);
    } else {
      _push(`<!---->`);
    }
    if (toast.type === "info") {
      _push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-503d819c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-503d819c></path></svg>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div><div class="flex-1 text-sm font-medium" data-v-503d819c>${ssrInterpolate(toast.message)}</div><button class="ml-3 text-white/70 hover:text-white" data-v-503d819c><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-503d819c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-503d819c></path></svg></button></div>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/ToastContainer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ToastContainer = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-503d819c"]]);

const $$Astro = createAstro();
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const {
    title = "ISUZU STC - \u0E42\u0E0A\u0E27\u0E4C\u0E23\u0E39\u0E21\u0E23\u0E16\u0E22\u0E19\u0E15\u0E4C\u0E2D\u0E35\u0E0B\u0E39\u0E0B\u0E38",
    description = "\u0E28\u0E39\u0E19\u0E22\u0E4C\u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22\u0E23\u0E16\u0E22\u0E19\u0E15\u0E4C\u0E2D\u0E35\u0E0B\u0E39\u0E0B\u0E38 \u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E04\u0E23\u0E1A\u0E27\u0E07\u0E08\u0E23 \u0E17\u0E31\u0E49\u0E07\u0E02\u0E32\u0E22 \u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2B\u0E25\u0E31\u0E07\u0E01\u0E32\u0E23\u0E02\u0E32\u0E22 \u0E41\u0E25\u0E30\u0E2D\u0E30\u0E44\u0E2B\u0E25\u0E48\u0E41\u0E17\u0E49"
  } = Astro2.props;
  return renderTemplate`<html lang="th"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(description, "content")}><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Thai:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.css"><title>${title}</title>${renderHead()}</head> <body class="bg-slate-900 text-white font-sans antialiased flex flex-col min-h-screen overflow-x-hidden"> ${renderComponent($$result, "Navbar", Navbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/Website/isuzu-stc/src/components/Navbar.vue", "client:component-export": "default" })} <main class="flex-grow"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "ToastContainer", ToastContainer, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "D:/Website/isuzu-stc/src/components/ui/ToastContainer.vue", "client:component-export": "default" })} ${renderComponent($$result, "Footer", Footer, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/Website/isuzu-stc/src/components/Footer.vue", "client:component-export": "default" })} </body></html>`;
}, "D:/Website/isuzu-stc/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $, _export_sfc as _ };
