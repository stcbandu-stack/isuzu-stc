/* empty css                                 */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BorZG8IO.mjs';
import 'piccolore';
import { _ as _export_sfc, $ as $$MainLayout } from '../chunks/MainLayout_DqAf7Ggx.mjs';
import { useSSRContext, mergeProps, defineComponent, ref, computed, onMounted, watch, onUnmounted } from 'vue';
import { s as supabase } from '../chunks/supabase_vsc3_iwe.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
/* empty css                                      */
export { renderers } from '../renderers.mjs';

const _sfc_main$3 = {
  __name: 'PromotionCard',
  props: {
  promotion: {
    type: Object,
    required: true
  }
},
  emits: ['select'],
  setup(__props, { expose: __expose }) {
  __expose();




const __returned__ = {  };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(mergeProps({ class: "group bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-isuzu-red transition-all duration-300 hover:shadow-2xl hover:shadow-isuzu-red/10 flex flex-col h-full" }, _attrs))
  }><div class="relative aspect-[4/5] overflow-hidden"><img${
    ssrRenderAttr("src", $props.promotion.image_url)
  }${
    ssrRenderAttr("alt", $props.promotion.title)
  } class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy"><div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div></div><div class="p-6 flex flex-col flex-grow"><h3 class="text-xl font-bold text-white mb-3 group-hover:text-isuzu-red transition-colors line-clamp-2 min-h-[3.5rem]">${
    ssrInterpolate($props.promotion.title)
  }</h3><p class="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">${
    ssrInterpolate($props.promotion.description)
  }</p><button class="w-full py-3 bg-gray-700 hover:bg-isuzu-red text-white rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn"> ดูรายละเอียดเพิ่มเติม <svg class="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></button></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/PromotionCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined
};
const PromotionCard = /*#__PURE__*/_export_sfc(_sfc_main$3, [['ssrRender',_sfc_ssrRender$3]]);

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PromotionLeadForm",
  props: {
    promotion: {
      type: Object,
      required: true
    }
  },
  emits: ["close", "success", "back"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const formData = ref({
      fullName: "",
      phone: "",
      branch: "",
      lineId: "",
      email: "",
      promotionTitle: props.promotion.title,
      promotionDetail: props.promotion.description
    });
    const isSubmitting = ref(false);
    const errorMsg = ref("");
    const branches = ["บ้านดู่", "พาน", "แม่สาย", "แม่จัน"];
    const handleSubmit = async () => {
      if (!formData.value.fullName || !formData.value.phone || !formData.value.branch) {
        errorMsg.value = "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน";
        return;
      }
      isSubmitting.value = true;
      errorMsg.value = "";
      try {
        const { error } = await supabase.from("promotion_leads").insert([
          {
            full_name: formData.value.fullName,
            phone: formData.value.phone,
            branch: formData.value.branch,
            line_id: formData.value.lineId,
            email: formData.value.email,
            promotion_title: formData.value.promotionTitle,
            promotion_detail: formData.value.promotionDetail,
            source_url: window.location.href
          }
        ]);
        if (error) throw error;
        emit("success");
      } catch (err) {
        console.error("Error submitting lead:", err);
        errorMsg.value = "เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง";
      } finally {
        isSubmitting.value = false;
      }
    };
    const __returned__ = { props, emit, formData, isSubmitting, errorMsg, branches, handleSubmit };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 animate-fade-in" }, _attrs))} data-v-027a5275><div class="border-b border-gray-700 pb-4 mb-6" data-v-027a5275><h3 class="text-xl font-bold text-white" data-v-027a5275>สนใจโปรโมชั่น</h3><p class="text-gray-400 text-sm mt-1" data-v-027a5275>กรุณากรอกข้อมูลเพื่อให้ที่ปรึกษาการขายติดต่อกลับ</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-027a5275><div class="space-y-2" data-v-027a5275><label class="block text-sm font-medium text-gray-300" data-v-027a5275> ชื่อ-นามสกุล <span class="text-isuzu-red" data-v-027a5275>*</span></label><input${ssrRenderAttr("value", $setup.formData.fullName)} type="text" placeholder="ระบุชื่อของคุณ" class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-isuzu-red focus:border-transparent outline-none transition-all" required data-v-027a5275></div><div class="space-y-2" data-v-027a5275><label class="block text-sm font-medium text-gray-300" data-v-027a5275> เบอร์โทรติดต่อกลับ <span class="text-isuzu-red" data-v-027a5275>*</span></label><input${ssrRenderAttr("value", $setup.formData.phone)} type="tel" placeholder="08X-XXX-XXXX" class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-isuzu-red focus:border-transparent outline-none transition-all" required data-v-027a5275></div><div class="space-y-2" data-v-027a5275><label class="block text-sm font-medium text-gray-300" data-v-027a5275> เลือกสาขาที่สะดวก <span class="text-isuzu-red" data-v-027a5275>*</span></label><select class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-isuzu-red focus:border-transparent outline-none transition-all" required data-v-027a5275><option value="" disabled selected data-v-027a5275>เลือกสาขา</option><!--[-->`);
  ssrRenderList($setup.branches, (branch) => {
    _push(`<option${ssrRenderAttr("value", branch)} data-v-027a5275${ssrIncludeBooleanAttr(Array.isArray($setup.formData.branch) ? ssrLooseContain($setup.formData.branch, branch) : ssrLooseEqual($setup.formData.branch, branch)) ? " selected" : ""}>${ssrInterpolate(branch)}</option>`);
  });
  _push(`<!--]--></select></div><div class="space-y-2" data-v-027a5275><label class="block text-sm font-medium text-gray-300" data-v-027a5275> LINE ID <span class="text-gray-500 text-xs" data-v-027a5275>(ไม่บังคับ)</span></label><input${ssrRenderAttr("value", $setup.formData.lineId)} type="text" placeholder="Your Line ID" class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-isuzu-red focus:border-transparent outline-none transition-all" data-v-027a5275></div><div class="space-y-2 md:col-span-2" data-v-027a5275><label class="block text-sm font-medium text-gray-300" data-v-027a5275> อีเมล <span class="text-gray-500 text-xs" data-v-027a5275>(ไม่บังคับ)</span></label><input${ssrRenderAttr("value", $setup.formData.email)} type="email" placeholder="example@mail.com" class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-isuzu-red focus:border-transparent outline-none transition-all" data-v-027a5275></div></div><div class="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 space-y-3" data-v-027a5275><div data-v-027a5275><label class="block text-xs font-bold text-isuzu-red uppercase tracking-wider mb-1" data-v-027a5275>โปรโมชั่นที่สนใจ</label><p class="text-white font-medium" data-v-027a5275>${ssrInterpolate($setup.formData.promotionTitle)}</p></div><div data-v-027a5275><label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1" data-v-027a5275>รายละเอียด</label><p class="text-gray-400 text-xs line-clamp-2 italic" data-v-027a5275>${ssrInterpolate($setup.formData.promotionDetail)}</p></div></div>`);
  if ($setup.errorMsg) {
    _push(`<p class="text-isuzu-red text-sm font-medium" data-v-027a5275>${ssrInterpolate($setup.errorMsg)}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="grid grid-cols-2 gap-4 mt-8" data-v-027a5275><button class="py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-2xl font-bold transition-all disabled:opacity-50"${ssrIncludeBooleanAttr($setup.isSubmitting) ? " disabled" : ""} data-v-027a5275> ย้อนกลับ </button><button class="${ssrRenderClass([{ "opacity-50 cursor-not-allowed bg-gray-500 hover:bg-gray-500": $setup.isSubmitting }, "py-4 bg-isuzu-red hover:bg-red-700 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group"])}"${ssrIncludeBooleanAttr($setup.isSubmitting) ? " disabled" : ""} data-v-027a5275>`);
  if ($setup.isSubmitting) {
    _push(`<span class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" data-v-027a5275></span>`);
  } else {
    _push(`<span data-v-027a5275>ส่งข้อมูล</span>`);
  }
  _push(`</button></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/PromotionLeadForm.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const PromotionLeadForm = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-027a5275"]]);

const ITEMS_PER_PAGE = 4;

const _sfc_main$1 = {
  __name: 'PromotionModal',
  props: {
  promotion: Object
},
  emits: ['close'],
  setup(__props, { expose: __expose }) {
  __expose();

const props = __props;


const showLeadForm = ref(false);
const isSuccess = ref(false);

// Gallery
const visibleCount = ref(ITEMS_PER_PAGE);
const loadMoreTrigger = ref(null);

const galleryImages = computed(() => {
  if (!props.promotion?.gallery_images || !Array.isArray(props.promotion.gallery_images)) {
    return [];
  }
  return props.promotion.gallery_images;
});

const visibleGallery = computed(() => {
  return galleryImages.value.slice(0, visibleCount.value);
});

const hasMoreGallery = computed(() => {
  return visibleCount.value < galleryImages.value.length;
});

const loadMoreGallery = () => {
  visibleCount.value += ITEMS_PER_PAGE;
};

// Intersection Observer for infinite scroll
let observer = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMoreGallery.value) {
      loadMoreGallery();
    }
  }, { threshold: 0.1 });
});

watch(loadMoreTrigger, (el) => {
  if (el && observer) {
    observer.observe(el);
  }
}, { immediate: true });

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

// Reset visible count when promotion changes
watch(() => props.promotion, () => {
  visibleCount.value = ITEMS_PER_PAGE;
});

// Lightbox
const lightboxImage = ref(null);

const openLightbox = (url) => {
  lightboxImage.value = url;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightboxImage.value = null;
  document.body.style.overflow = '';
};

const handleSuccess = () => {
  isSuccess.value = true;
};

const __returned__ = { props, showLeadForm, isSuccess, ITEMS_PER_PAGE, visibleCount, loadMoreTrigger, galleryImages, visibleGallery, hasMoreGallery, loadMoreGallery, get observer() { return observer }, set observer(v) { observer = v; }, lightboxImage, openLightbox, closeLightbox, handleSuccess, ref, computed, watch, onMounted, onUnmounted, PromotionLeadForm };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($props.promotion) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md" }, _attrs))} data-v-b78221f0><div class="bg-gray-800 rounded-3xl shadow-2xl w-full max-w-5xl border border-gray-700 overflow-hidden flex flex-col md:flex-row max-h-[90vh]" data-v-b78221f0><button class="absolute top-4 right-4 md:hidden text-white bg-black/50 p-2 rounded-full z-10" data-v-b78221f0><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b78221f0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-b78221f0></path></svg></button>`);
    if (!$setup.showLeadForm && !$setup.isSuccess) {
      _push(`<div class="md:w-1/2 bg-gray-900 border-r border-gray-700/50 overflow-y-auto" data-v-b78221f0><div class="p-6 space-y-4" data-v-b78221f0><div class="aspect-[4/5] w-full relative shadow-2xl rounded-2xl overflow-hidden cursor-pointer" data-v-b78221f0><img${ssrRenderAttr("src", $props.promotion.image_url)} class="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300" data-v-b78221f0><div class="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100" data-v-b78221f0><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b78221f0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" data-v-b78221f0></path></svg></div></div>`);
      if ($setup.galleryImages.length > 0) {
        _push(`<div class="space-y-3" data-v-b78221f0><h4 class="text-gray-400 text-sm font-medium flex items-center gap-2" data-v-b78221f0><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b78221f0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-b78221f0></path></svg> รูปภาพเพิ่มเติม (${ssrInterpolate($setup.galleryImages.length)}) </h4><div class="grid grid-cols-2 gap-2" data-v-b78221f0><!--[-->`);
        ssrRenderList($setup.visibleGallery, (img, idx) => {
          _push(`<div class="aspect-[5/4] rounded-xl overflow-hidden cursor-pointer border border-gray-700/50 hover:border-isuzu-red/50 transition-colors" data-v-b78221f0><img${ssrRenderAttr("src", img)} class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" data-v-b78221f0></div>`);
        });
        _push(`<!--]--></div>`);
        if ($setup.hasMoreGallery) {
          _push(`<div class="flex justify-center py-4" data-v-b78221f0><button class="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl text-sm transition-colors border border-gray-700" data-v-b78221f0> โหลดเพิ่มเติม (${ssrInterpolate($setup.galleryImages.length - $setup.visibleCount)} รูป) </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="${ssrRenderClass([[$setup.showLeadForm || $setup.isSuccess ? 'w-full' : 'md:w-1/2'], "p-8 md:p-12 overflow-y-auto flex flex-col"])}" data-v-b78221f0><div class="flex justify-between items-start mb-6" data-v-b78221f0><span class="px-3 py-1 bg-isuzu-red/20 text-isuzu-red text-xs font-bold rounded-full uppercase tracking-widest border border-isuzu-red/30" data-v-b78221f0>Promotion</span><button class="hidden md:block text-gray-400 hover:text-white transition-colors" data-v-b78221f0><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b78221f0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-b78221f0></path></svg></button></div>`);
    if ($setup.isSuccess) {
      _push(`<div class="flex-grow flex flex-col items-center justify-center text-center space-y-6 py-12 animate-fade-in" data-v-b78221f0><div class="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-4 scale-up" data-v-b78221f0><svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b78221f0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" data-v-b78221f0></path></svg></div><h3 class="text-3xl font-black text-white" data-v-b78221f0>ส่งข้อมูลสำเร็จ</h3><p class="text-gray-400 text-lg" data-v-b78221f0>รอที่ปรึกษาการขายติดต่อกลับขอบคุณครับ</p><button class="px-12 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-2xl font-bold transition-all mt-8" data-v-b78221f0> กลับสู่หน้าหลัก </button></div>`);
    } else if ($setup.showLeadForm) {
      _push(ssrRenderComponent($setup["PromotionLeadForm"], {
        promotion: $props.promotion,
        onBack: $event => ($setup.showLeadForm = false),
        onSuccess: $setup.handleSuccess,
        class: "flex-grow"
      }, null, _parent));
    } else {
      _push(`<!--[--><h2 class="text-3xl font-extrabold text-white mb-6 leading-tight" data-v-b78221f0>${
        ssrInterpolate($props.promotion.title)
      }</h2><div class="prose prose-invert prose-red max-w-none flex-grow" data-v-b78221f0><p class="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap" data-v-b78221f0>${
        ssrInterpolate($props.promotion.description)
      }</p></div><div class="mt-12 pt-8 border-t border-gray-700/50 flex flex-col gap-4" data-v-b78221f0>`);
      {
        _push(`<!---->`);
      }
      if ($props.promotion.direct_url) {
        _push(`<a${ssrRenderAttr("href", $props.promotion.direct_url)} target="_blank" class="w-full py-4 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-2xl font-bold text-center transition-all border border-gray-700 flex items-center justify-center gap-2 group" data-v-b78221f0> ดูรายละเอียดเพิ่มเติม <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b78221f0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-b78221f0></path></svg></a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="w-full py-4 text-gray-500 hover:text-white transition-all text-sm font-medium" data-v-b78221f0> ปิดหน้าต่างนี้ </button></div><!--]-->`);
    }
    _push(`</div></div>`);
    if ($setup.lightboxImage) {
      _push(`<div class="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4" data-v-b78221f0><button class="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors" data-v-b78221f0><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b78221f0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-b78221f0></path></svg></button><img${ssrRenderAttr("src", $setup.lightboxImage)} class="max-w-full max-h-full object-contain rounded-lg shadow-2xl" data-v-b78221f0></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/PromotionModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};
const PromotionModal = /*#__PURE__*/_export_sfc(_sfc_main$1, [['ssrRender',_sfc_ssrRender$1],['__scopeId',"data-v-b78221f0"]]);

const itemsPerPage = 10;


const _sfc_main = {
  __name: 'PromotionPage',
  setup(__props, { expose: __expose }) {
  __expose();

const promotions = ref([]);
const loading = ref(true);
const selectedPromo = ref(null);

// Search and Pagination State
const searchQuery = ref('');
const currentPage = ref(1);
const fetchPromotions = async () => {
    loading.value = true;
    try {
        const { data, error } = await supabase
            .from('promotions')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false });
        
        if (!error) promotions.value = data;
    } finally {
        loading.value = false;
    }
};

onMounted(fetchPromotions);

// Filtering Logic
const filteredPromotions = computed(() => {
    if (!searchQuery.value) return promotions.value;
    const query = searchQuery.value.toLowerCase();
    return promotions.value.filter(promo => 
        promo.title.toLowerCase().includes(query) || 
        (promo.description && promo.description.toLowerCase().includes(query))
    );
});

// Pagination Logic
const totalPages = computed(() => Math.ceil(filteredPromotions.value.length / itemsPerPage));

const paginatedPromotions = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredPromotions.value.slice(start, start + itemsPerPage);
});

// Reset to first page on search
watch(searchQuery, () => {
    currentPage.value = 1;
});

// Smooth scroll to top when page changes
watch(currentPage, () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const __returned__ = { promotions, loading, selectedPromo, searchQuery, currentPage, itemsPerPage, fetchPromotions, filteredPromotions, totalPages, paginatedPromotions, ref, onMounted, computed, watch, get supabase() { return supabase }, PromotionCard, PromotionModal };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(mergeProps({ class: "space-y-12" }, _attrs))
  }><div class="flex flex-col md:flex-row gap-6 items-center justify-between bg-gray-800/30 p-6 rounded-3xl border border-gray-800 backdrop-blur-sm"><div class="relative w-full md:max-w-md"><input${
    ssrRenderAttr("value", $setup.searchQuery)
  } type="text" placeholder="ค้นหาโปรโมชั่น..." class="w-full bg-gray-900 border border-gray-700 rounded-2xl px-12 py-4 text-white placeholder-gray-500 focus:border-isuzu-red outline-none transition-all"><div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div>`);
  if ($setup.searchQuery) {
    _push(`<button class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="text-sm text-gray-400 font-bold uppercase tracking-widest"> ผลการค้นหา: <span class="text-isuzu-red">${ssrInterpolate($setup.filteredPromotions.length)}</span> รายการ </div></div>`);
  if ($setup.loading) {
    _push(`<div class="flex flex-col items-center justify-center py-32 space-y-4"><div class="animate-spin rounded-full h-16 w-16 border-4 border-isuzu-red/20 border-t-isuzu-red"></div><span class="text-gray-500 font-bold uppercase tracking-[0.3em] text-xs">กำลังโหลดโปรโมชั่น...</span></div>`);
  } else if ($setup.filteredPromotions.length === 0) {
    _push(`<div class="text-center py-32 bg-gray-800/20 rounded-[3rem] border border-gray-800 border-dashed"><div class="mb-6 opacity-20"><svg class="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><p class="text-gray-400 text-2xl font-light">ขออภัย ไม่พบโปรโมชั่นที่คุณต้องการ...</p><button class="mt-8 text-isuzu-red font-bold hover:underline">แสดงโปรโมชั่นทั้งหมด</button></div>`);
  } else {
    _push(`<div><div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8"><!--[-->`);
    ssrRenderList($setup.paginatedPromotions, (promo) => {
      _push(ssrRenderComponent($setup["PromotionCard"], {
        key: promo.id,
        promotion: promo,
        onSelect: $event => ($setup.selectedPromo = $event)
      }, null, _parent));
    });
    _push(`<!--]--></div>`);
    if ($setup.totalPages > 1) {
      _push(`<div class="mt-20 flex justify-center items-center gap-4"><button${(ssrIncludeBooleanAttr($setup.currentPage === 1)) ? " disabled" : ""} class="p-4 rounded-2xl bg-gray-800 border border-gray-700 disabled:opacity-20 hover:border-isuzu-red transition-all group"><svg class="w-5 h-5 text-white transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button><div class="flex gap-2"><!--[-->`);
      ssrRenderList($setup.totalPages, (page) => {
        _push(`<button class="${
          ssrRenderClass([$setup.currentPage === page 
                        ? 'bg-isuzu-red border-isuzu-red text-white shadow-lg shadow-isuzu-red/20' 
                        : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white', "w-12 h-12 rounded-xl text-sm font-black transition-all border"])
        }">${
          ssrInterpolate(page)
        }</button>`);
      });
      _push(`<!--]--></div><button${(ssrIncludeBooleanAttr($setup.currentPage === $setup.totalPages)) ? " disabled" : ""} class="p-4 rounded-2xl bg-gray-800 border border-gray-700 disabled:opacity-20 hover:border-isuzu-red transition-all group"><svg class="w-5 h-5 text-white transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div>`);
    } else {
      _push(`<!---->`);
    }
    if ($setup.selectedPromo) {
      _push(ssrRenderComponent($setup["PromotionModal"], {
        promotion: $setup.selectedPromo,
        onClose: $event => ($setup.selectedPromo = null)
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/PromotionPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const PromotionPage = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const $$Promotions = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "\u0E42\u0E1B\u0E23\u0E42\u0E21\u0E0A\u0E31\u0E48\u0E19\u0E1E\u0E34\u0E40\u0E28\u0E29 - ISUZU STC" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-gray-900 min-h-screen pt-24 pb-16 relative overflow-hidden"> <!-- Background Accents --> <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-isuzu-red/5 blur-[120px] rounded-full -mr-64 -mt-64"></div> <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-isuzu-red/5 blur-[120px] rounded-full -ml-64 -mb-64"></div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"> <div class="text-center mb-16"> <span class="text-isuzu-red font-bold tracking-widest uppercase text-sm mb-4 block">Exclusive Deals</span> <h1 class="text-4xl md:text-6xl font-black text-white mb-6 uppercase leading-tight">
โปรโมชั่น<span class="text-isuzu-red">พิเศษ</span> </h1> <p class="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
พบกับข้อเสนอที่คุ้มค่าที่สุดจากอีซูซุสงวนไทยเชียงราย
                    ทั้งรถใหม่ โปรโมชั่นศูนย์บริการ
                    และสิทธิพิเศษสำหรับลูกค้าคนสำคัญ
</p> </div> ${renderComponent($$result2, "PromotionPage", PromotionPage, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/Website/isuzu-stc/src/components/PromotionPage.vue", "client:component-export": "default" })} </div> </div> ` })}`;
}, "D:/Website/isuzu-stc/src/pages/promotions.astro", void 0);

const $$file = "D:/Website/isuzu-stc/src/pages/promotions.astro";
const $$url = "/promotions";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Promotions,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
