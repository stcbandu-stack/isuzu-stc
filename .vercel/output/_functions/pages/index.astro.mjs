/* empty css                                 */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BorZG8IO.mjs';
import 'piccolore';
import { _ as _export_sfc, $ as $$MainLayout } from '../chunks/MainLayout_DqAf7Ggx.mjs';
import { useSSRContext, ref, onMounted, onUnmounted, mergeProps, nextTick, defineComponent, computed, watch } from 'vue';
import { s as supabase } from '../chunks/supabase_vsc3_iwe.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const _sfc_main$3 = {
  __name: 'HeroSlideshow',
  props: {
  autoplay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 5000
  }
},
  setup(__props, { expose: __expose }) {
  __expose();

const props = __props;

// Default Static Data (Fallback)
const defaultSlides = [
  {
    image_url: '/images/slide-1.png',
    alt: 'ISUZU D-MAX',
    title: 'ISUZU D-MAX',
    description: 'พิชิตทุกเส้นทาง ด้วยพลังที่เหนือกว่า',
    button_text: 'ดูรายละเอียด',
    button_link: '#dmax'
  },
  {
    image_url: '/images/slide-2.png',
    alt: 'ISUZU MU-X',
    title: 'ISUZU MU-X',
    description: 'SUV พรีเมียม สำหรับทุกไลฟ์สไตล์',
    button_text: 'ดูรายละเอียด',
    button_link: '#mux'
  },
  {
    image_url: '/images/slide-3.png',
    alt: 'ISUZU Fleet',
    title: 'บริการรถยนต์สำหรับองค์กร',
    description: 'โซลูชั่นครบวงจรสำหรับธุรกิจของคุณ',
    button_text: 'ติดต่อเรา',
    button_link: '#contact'
  }
];

const slides = ref(defaultSlides); // Start with default loaded
const currentSlide = ref(0);
const progress = ref(0);
let autoplayTimer = null;
let progressTimer = null;

// Fetch Slides from Supabase
const fetchSlides = async () => {
    try {
        const { data, error } = await supabase
            .from('slides')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });
        
        if (error) {
            console.error('Error fetching slides:', error);
            // Keep default slides on error
            return;
        }

        if (data && data.length > 0) {
            // Rename keys to match template if needed, or update template
            // Our Schema: image_url, title, description, button_text, button_link
            // Data is already compatible
            slides.value = data;
        } else {
             // If DB is empty, keep default slides (Optionally you could clear it)
             console.log('No active slides found in DB, using default.');
        }
    } catch (err) {
        console.error('Unexpected error:', err);
    }
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
  resetProgress();
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
  resetProgress();
};

const goToSlide = (index) => {
  currentSlide.value = index;
  resetProgress();
};

const resetProgress = () => {
  progress.value = 0;
};

const startAutoplay = () => {
  if (!props.autoplay) return;
  
  // Progress bar animation
  progressTimer = setInterval(() => {
    progress.value += (100 / (props.interval / 100));
    if (progress.value >= 100) {
      progress.value = 0;
    }
  }, 100);

  // Slide change
  autoplayTimer = setInterval(() => {
    nextSlide();
  }, props.interval);
};

const stopAutoplay = () => {
  if (autoplayTimer) clearInterval(autoplayTimer);
  if (progressTimer) clearInterval(progressTimer);
};

onMounted(() => {
  fetchSlides(); // Fetch new data
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});

const __returned__ = { props, defaultSlides, slides, currentSlide, progress, get autoplayTimer() { return autoplayTimer }, set autoplayTimer(v) { autoplayTimer = v; }, get progressTimer() { return progressTimer }, set progressTimer(v) { progressTimer = v; }, fetchSlides, nextSlide, prevSlide, goToSlide, resetProgress, startAutoplay, stopAutoplay, ref, onMounted, onUnmounted, get supabase() { return supabase } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "relative w-full overflow-hidden",
    style: { aspectRatio: '16/9' }
  }, _attrs))}><!--[-->`);
  ssrRenderList($setup.slides, (slide, index) => {
    _push(`<div class="${
      ssrRenderClass([$setup.currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0', "absolute inset-0 transition-opacity duration-1000 ease-in-out"])
    }"><img${
      ssrRenderAttr("src", slide.image_url)
    }${
      ssrRenderAttr("alt", slide.title)
    } class="w-full h-full object-cover" loading="lazy"><div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div><div class="absolute inset-0 flex items-end justify-start p-8 md:p-16"><div class="max-w-2xl"><h2 class="${
      ssrRenderClass([$setup.currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0', "text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 transform transition-all duration-700"])
    }" style="${
      ssrRenderStyle({"transition-delay":"200ms"})
    }">${
      ssrInterpolate(slide.title)
    }</h2><p class="${
      ssrRenderClass([$setup.currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0', "text-gray-300 text-sm md:text-lg mb-6 transform transition-all duration-700"])
    }" style="${
      ssrRenderStyle({"transition-delay":"400ms"})
    }">${
      ssrInterpolate(slide.description)
    }</p>`);
    if (slide.button_text) {
      _push(`<a${
        ssrRenderAttr("href", slide.button_link)
      } class="${
        ssrRenderClass([$setup.currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0', "inline-block bg-isuzu-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 transform"])
      }" style="${
        ssrRenderStyle({"transition-delay":"600ms"})
      }">${
        ssrInterpolate(slide.button_text)
      }</a>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div></div>`);
  });
  _push(`<!--]--><div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3"><!--[-->`);
  ssrRenderList($setup.slides, (slide, index) => {
    _push(`<button class="${
      ssrRenderClass([$setup.currentSlide === index ? 'bg-isuzu-red w-8' : 'bg-white/50 hover:bg-white/80', "group relative w-3 h-3 rounded-full transition-all duration-300"])
    }"><span class="sr-only">Go to slide ${
      ssrInterpolate(index + 1)
    }</span></button>`);
  });
  _push(`<!--]--></div><button class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-isuzu-red text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button><button class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-isuzu-red text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button><div class="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20"><div class="h-full bg-isuzu-red transition-all duration-100 ease-linear" style="${ssrRenderStyle({ width: `${$setup.progress}%` })}"></div></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/HeroSlideshow.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined
};
const HeroSlideshow = /*#__PURE__*/_export_sfc(_sfc_main$3, [['ssrRender',_sfc_ssrRender$3]]);

const _sfc_main$2 = {
  __name: 'VideoBackgroundSection',
  setup(__props, { expose: __expose }) {
  __expose();

const videos = [
  {
    logo: '/the-one-logo.svg',
    text: 'ใหม่! อีซูซุ ดีแมคซ์ หนึ่งเดียว... เท่านั้น!',
    url: 'https://res.cloudinary.com/dbsppor3j/video/upload/v1769565236/v-cross-bg-vid_dfk9pd.mp4',
    poster: '' // To be added later
  },
  {
    logo: '/x-series-logo.svg',
    text: 'ใหม่! อีซูซุ เอ็กซ์-ซีรี่ส์ ร้อนแรง...เป็นเรื่อง',
    url: 'https://res.cloudinary.com/dbsppor3j/video/upload/v1769565658/xseries-bg-vid_owa3rx.mp4',
    poster: '' // To be added later
  },
  {
    logo: '/mux-logo.png',
    text: 'MU-X "THE NEXT PEAK" สู่จุดพีคใหม่... ของชีวิต',
    url: 'https://res.cloudinary.com/dbsppor3j/video/upload/v1769565656/mux-bg-vid_xh8aqj.mp4',
    poster: '' // To be added later
  }
];

const currentVideoIndex = ref(0);
const videoRefs = ref([]);

const computeVideoSrc = (url) => {
  // Remove .mp4 and add cloudinary transformations
  return url.replace('.mp4', '') + '?q_auto:eco,f_auto';
};

const isNextVideo = (index) => {
  return index === (currentVideoIndex.value + 1) % videos.length;
};

const handleVideoEnded = () => {
  // Fade to next video
  const nextIndex = (currentVideoIndex.value + 1) % videos.length;
  currentVideoIndex.value = nextIndex;
  
  // Play the next video
  nextTick(() => {
    if (videoRefs.value[nextIndex]) {
      videoRefs.value[nextIndex].play().catch(err => {
        console.warn('Auto-play failed:', err);
      });
    }
  });
};

onMounted(() => {
  // Start the first video
  if (videoRefs.value[0]) {
    videoRefs.value[0].play().catch(err => {
      console.warn('Initial auto-play failed:', err);
    });
  }
});

const __returned__ = { videos, currentVideoIndex, videoRefs, computeVideoSrc, isNextVideo, handleVideoEnded, ref, onMounted, nextTick };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-black" }, _attrs))} data-v-c89ba997><!--[-->`);
  ssrRenderList($setup.videos, (video, index) => {
    _push(`<div class="${ssrRenderClass([$setup.currentVideoIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0', "absolute inset-0 transition-opacity duration-1000 ease-in-out"])}" data-v-c89ba997>`);
    if ($setup.currentVideoIndex === index || $setup.isNextVideo(index)) {
      _push(`<video class="h-full w-full object-cover"${
        (ssrIncludeBooleanAttr(true)) ? " muted" : ""
      }${
        ssrRenderAttr("playsinline", true)
      }${
        ssrRenderAttr("poster", video.poster)
      } preload="auto" data-v-c89ba997><source${
        ssrRenderAttr("src", $setup.computeVideoSrc(video.url))
      } type="video/webm" data-v-c89ba997><source${
        ssrRenderAttr("src", $setup.computeVideoSrc(video.url).replace('f_auto', 'f_mp4'))
      } type="video/mp4" data-v-c89ba997></video>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="absolute inset-0 bg-black/40 z-20" data-v-c89ba997></div><div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-30" data-v-c89ba997><div class="${
      ssrRenderClass([$setup.currentVideoIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0', "max-w-4xl mx-auto space-y-8 transform transition-all duration-1000"])
    }" data-v-c89ba997><img${
      ssrRenderAttr("src", video.logo)
    }${
      ssrRenderAttr("alt", video.text)
    } class="h-28 md:h-48 lg:h-64 mx-auto object-contain drop-shadow-2xl" loading="lazy" data-v-c89ba997><h2 class="text-lg md:text-xl lg:text-2xl font-medium text-white/90 tracking-wide leading-tight drop-shadow-lg" data-v-c89ba997>${
      ssrInterpolate(video.text)
    }</h2></div></div></div>`);
  });
  _push(`<!--]--></section>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/VideoBackgroundSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined
};
const VideoBackgroundSection = /*#__PURE__*/_export_sfc(_sfc_main$2, [['ssrRender',_sfc_ssrRender$2],['__scopeId',"data-v-c89ba997"]]);

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "VehicleShowcase",
  setup(__props, { expose: __expose }) {
    __expose();
    const vehicles = ref([]);
    const loading = ref(true);
    const selectedCategory = ref("");
    const selectedVehicleId = ref(null);
    const selectedColorIndex = ref(0);
    const isZoomed = ref(false);
    const zoomX = ref(0);
    const zoomY = ref(0);
    const zoomBgPos = ref("0% 0%");
    const categoryOrder = ["V-Cross", "Mu-X", "Spark", "2 Drs", "4 Drs", "X-Series"];
    const fetchVehicles = async () => {
      try {
        const { data, error } = await supabase.from("vehicles").select("*, vehicle_colors(*)").order("price", { ascending: true });
        if (error) throw error;
        vehicles.value = data || [];
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      } finally {
        loading.value = false;
      }
    };
    const categories = computed(() => {
      const cats = new Set(vehicles.value.map((v) => v.model_category));
      return categoryOrder.filter((c) => cats.has(c));
    });
    const currentCategoryVehicles = computed(() => {
      if (!selectedCategory.value) return [];
      return vehicles.value.filter((v) => v.model_category === selectedCategory.value);
    });
    const currentVehicle = computed(() => {
      return vehicles.value.find((v) => v.id === selectedVehicleId.value) || currentCategoryVehicles.value[0];
    });
    const currentColors = computed(() => {
      return currentVehicle.value?.vehicle_colors || [];
    });
    const currentColor = computed(() => {
      if (!currentColors.value.length) return null;
      return currentColors.value[selectedColorIndex.value];
    });
    const displayImage = computed(() => {
      return currentColor.value?.image_url || currentVehicle.value?.image_url;
    });
    const displayPrice = computed(() => {
      if (!currentVehicle.value) return 0;
      let price = currentVehicle.value.price;
      if (currentColor.value?.price_extra) {
        price += currentColor.value.price_extra;
      }
      return price;
    });
    const preloadedImages = /* @__PURE__ */ new Set();
    const preloadImage = (url) => {
      if (!url || preloadedImages.has(url)) return;
      const img = new Image();
      img.src = url;
      preloadedImages.add(url);
    };
    const preloadCategoryImages = () => {
      currentCategoryVehicles.value.forEach((vehicle) => {
        if (vehicle.image_url) preloadImage(vehicle.image_url);
        if (vehicle.direct_url) preloadImage(vehicle.direct_url);
        vehicle.vehicle_colors.forEach((color) => {
          if (color.image_url) preloadImage(color.image_url);
        });
      });
    };
    const selectCategory = (cat) => {
      selectedCategory.value = cat;
      selectedVehicleId.value = null;
      selectedColorIndex.value = 0;
      preloadCategoryImages();
    };
    const selectVehicle = (id) => {
      selectedVehicleId.value = id;
      selectedColorIndex.value = 0;
    };
    const formatPrice = (price) => {
      return new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB", minimumFractionDigits: 0 }).format(price);
    };
    const handleMouseMove = (e) => {
      const container = e.currentTarget;
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width * 100;
      const y = (e.clientY - top) / height * 100;
      zoomX.value = e.clientX - left;
      zoomY.value = e.clientY - top;
      zoomBgPos.value = `${x}% ${y}%`;
    };
    watch(currentCategoryVehicles, (newVal) => {
      if (newVal.length > 0 && !selectedVehicleId.value) ;
    });
    onMounted(async () => {
      await fetchVehicles();
      if (categories.value.length > 0) {
        selectCategory(categories.value[0]);
      }
    });
    const __returned__ = { vehicles, loading, selectedCategory, selectedVehicleId, selectedColorIndex, isZoomed, zoomX, zoomY, zoomBgPos, categoryOrder, fetchVehicles, categories, currentCategoryVehicles, currentVehicle, currentColors, currentColor, displayImage, displayPrice, preloadedImages, preloadImage, preloadCategoryImages, selectCategory, selectVehicle, formatPrice, handleMouseMove };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "w-full max-w-6xl mx-auto px-4 py-8",
    id: "vehicles"
  }, _attrs))} data-v-bb58e477><div class="text-center mb-8" data-v-bb58e477><h2 class="text-2xl md:text-4xl font-bold text-gray-900 mb-2" data-v-bb58e477> เลือกรถ <span class="text-isuzu-red" data-v-bb58e477>ISUZU</span> ของคุณ </h2><p class="text-gray-500 text-base" data-v-bb58e477>นวัตกรรมยานยนต์ที่ตอบโจทย์ทุกไลฟ์สไตล์</p></div>`);
  if ($setup.loading) {
    _push(`<div class="flex justify-center items-center py-20" data-v-bb58e477><div class="animate-spin rounded-full h-10 w-10 border-b-2 border-isuzu-red" data-v-bb58e477></div></div>`);
  } else {
    _push(`<div data-v-bb58e477><div class="flex overflow-x-auto snap-x space-x-3 pb-4 mb-6 scrollbar-hide justify-start md:justify-center" data-v-bb58e477><!--[-->`);
    ssrRenderList($setup.categories, (cat) => {
      _push(`<button class="${ssrRenderClass([$setup.selectedCategory === cat ? "bg-isuzu-red text-white shadow-md shadow-isuzu-red/20" : "bg-white text-gray-600 border border-gray-200 hover:border-isuzu-red/50 hover:text-isuzu-red", "flex-shrink-0 snap-center px-6 py-2 rounded-full text-base font-semibold transition-all duration-300 transform hover:scale-105"])}" data-v-bb58e477>${ssrInterpolate(cat)}</button>`);
    });
    _push(`<!--]--></div><div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 relative" data-v-bb58e477><div class="grid grid-cols-1 lg:grid-cols-12 min-h-[450px]" data-v-bb58e477><div class="lg:col-span-4 border-r border-gray-100 bg-gray-50/50 flex flex-col max-h-[450px] lg:h-auto h-[300px]" data-v-bb58e477><div class="p-4 bg-white border-b border-gray-100 sticky top-0 z-10" data-v-bb58e477><h3 class="text-lg font-bold text-gray-800" data-v-bb58e477>เลือกรุ่นย่อย</h3><p class="text-xs text-gray-500" data-v-bb58e477>${ssrInterpolate($setup.selectedCategory)} Models</p></div><div class="overflow-y-auto flex-1 p-3 space-y-2 custom-scrollbar" data-v-bb58e477><!--[-->`);
    ssrRenderList($setup.currentCategoryVehicles, (vehicle) => {
      _push(`<div class="${ssrRenderClass([$setup.currentVehicle?.id === vehicle.id ? "bg-white border-isuzu-red shadow-sm ring-1 ring-isuzu-red/20" : "bg-white border-transparent hover:border-gray-300 hover:shadow-sm", "p-3 rounded-lg cursor-pointer transition-all duration-200 border group items-center flex justify-between"])}" data-v-bb58e477><div data-v-bb58e477><div class="font-bold text-gray-900 text-sm group-hover:text-isuzu-red transition-colors" data-v-bb58e477>${ssrInterpolate(vehicle.sub_model)} ${ssrInterpolate(vehicle.grade)}</div><div class="text-xs text-gray-500 mt-0.5" data-v-bb58e477> เครื่องยนต์ ${ssrInterpolate(vehicle.engine)}</div></div><div class="text-right" data-v-bb58e477><div class="text-isuzu-red font-semibold text-sm" data-v-bb58e477>${ssrInterpolate($setup.formatPrice(vehicle.price).replace("THB", "฿"))}</div></div></div>`);
    });
    _push(`<!--]--></div></div><div class="lg:col-span-8 p-5 md:p-8 flex flex-col relative justify-between" data-v-bb58e477><div class="flex-1 flex flex-col items-center justify-center relative mb-4 min-h-[250px] w-full" data-v-bb58e477><div class="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent rounded-full opacity-50 blur-2xl transform scale-75" data-v-bb58e477></div><div class="relative z-10 w-full flex items-center justify-center h-full min-h-[250px] cursor-none overflow-visible" data-v-bb58e477>`);
    if ($setup.displayImage) {
      _push(`<div class="w-full h-full min-h-[250px] bg-contain bg-center bg-no-repeat transition-all duration-500 hover:scale-105 pointer-events-none user-select-none" style="${ssrRenderStyle({ backgroundImage: `url(${$setup.displayImage})` })}"${ssrRenderAttr("aria-label", `${$setup.currentVehicle.sub_model} ${$setup.currentVehicle.grade}`)} data-v-bb58e477></div>`);
    } else {
      _push(`<!---->`);
    }
    if ($setup.isZoomed && $setup.displayImage) {
      _push(`<div class="absolute z-50 pointer-events-none border-2 border-isuzu-red/50 rounded-lg shadow-2xl bg-white overflow-hidden" style="${ssrRenderStyle({
        left: `${$setup.zoomX}px`,
        top: `${$setup.zoomY}px`,
        width: "180px",
        height: "180px",
        transform: "translate(-50%, -50%)",
        backgroundImage: `url(${$setup.displayImage})`,
        backgroundPosition: $setup.zoomBgPos,
        backgroundSize: "600% auto",
        backgroundRepeat: "no-repeat"
      })}" data-v-bb58e477></div>`);
    } else if (!$setup.displayImage) {
      _push(`<div class="text-center p-8 bg-gray-50/50 rounded-xl border border-dashed border-gray-200 w-full max-w-sm mx-auto" data-v-bb58e477><div class="text-4xl mb-2" data-v-bb58e477>🚗</div><p class="text-gray-400 font-medium text-sm" data-v-bb58e477>Coming Soon</p></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div><div class="bg-gray-50/80 rounded-xl p-4 md:p-6 backdrop-blur-sm border border-gray-100" data-v-bb58e477><div class="flex flex-col md:flex-row md:items-end justify-between gap-6" data-v-bb58e477><div class="space-y-3 flex-1" data-v-bb58e477><div data-v-bb58e477><h3 class="text-2xl font-bold text-gray-900 leading-tight" data-v-bb58e477>${ssrInterpolate($setup.currentVehicle?.sub_model)} <span class="text-isuzu-red" data-v-bb58e477>${ssrInterpolate($setup.currentVehicle?.grade)}</span></h3><div class="flex items-baseline gap-2 mt-1" data-v-bb58e477><p class="text-xl font-semibold text-gray-700" data-v-bb58e477>${ssrInterpolate($setup.formatPrice($setup.displayPrice))}</p>`);
    if ($setup.currentColor?.price_extra) {
      _push(`<p class="text-xs text-isuzu-red font-medium" data-v-bb58e477> (+${ssrInterpolate($setup.formatPrice($setup.currentColor.price_extra).replace("THB", ""))} ค่าสีพิเศษ) </p>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div>`);
    if ($setup.currentColors.length > 0) {
      _push(`<div data-v-bb58e477><div class="flex flex-wrap gap-2 items-center" data-v-bb58e477><span class="text-xs font-medium text-gray-500 mr-2" data-v-bb58e477>สีภายนอก:</span><!--[-->`);
      ssrRenderList($setup.currentColors, (color, index) => {
        _push(`<button class="${ssrRenderClass([$setup.selectedColorIndex === index ? "ring-isuzu-red scale-110 border-white" : "ring-transparent hover:scale-110", "w-6 h-6 rounded-full border border-gray-200 transition-all duration-200 focus:outline-none ring-2 ring-offset-1"])}" style="${ssrRenderStyle({ backgroundColor: color.color_hex })}"${ssrRenderAttr("title", color.color_name)} data-v-bb58e477></button>`);
      });
      _push(`<!--]--><span class="text-xs text-gray-600 ml-2 font-medium" data-v-bb58e477>${ssrInterpolate($setup.currentColor?.color_name)}</span></div></div>`);
    } else {
      _push(`<div class="text-xs text-gray-400 italic" data-v-bb58e477> ยังไม่มีข้อมูลสีสำหรับรุ่นนี้ </div>`);
    }
    _push(`</div></div></div></div></div></div><p class="text-center text-gray-400 text-[10px] mt-6 max-w-4xl mx-auto opacity-75" data-v-bb58e477> *ราคานี้มีผลตั้งแต่ 22 ตุลาคม 2568 เป็นต้นไป | ราคารวมภาษีมูลค่าเพิ่มแล้ว แต่ยังไม่รวมค่าประกันและอุปกรณ์ตกแต่ง <br data-v-bb58e477>ภาพรถยนต์ที่ปรากฏเป็นภาพจำลองเพื่อการโฆษณา สีของรถอาจแตกต่างจากของจริงขึ้นอยู่กับการตั้งค่าหน้าจอ </p></div>`);
  }
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/VehicleShowcase.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const VehicleShowcase = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-bb58e477"]]);

const _sfc_main = {
  __name: 'QuickActions',
  setup(__props, { expose: __expose }) {
  __expose();

// No extra logic needed for now as requested (empty buttons)

const __returned__ = {  };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<section${
    ssrRenderAttrs(mergeProps({ class: "py-16 bg-white overflow-hidden" }, _attrs))
  } data-v-3a640e4e><div class="container mx-auto px-4 lg:px-8" data-v-3a640e4e><div class="mb-12 text-center md:text-left" data-v-3a640e4e><h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 uppercase tracking-wider" data-v-3a640e4e> บริการของเรา <span class="text-isuzu-red" data-v-3a640e4e>/ Our Services</span></h2><div class="w-24 h-1 bg-isuzu-red mx-auto md:mx-0" data-v-3a640e4e></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-v-3a640e4e><div class="group relative overflow-hidden rounded-2xl aspect-[4/5] shadow-xl transition-all duration-500 hover:-translate-y-2" data-v-3a640e4e><div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style="${
    ssrRenderStyle({"background-image":"url('https://cdn.jsdelivr.net/gh/stcbandu-stack/stcisuzu@main/4drs04.png')"})
  }" data-v-3a640e4e></div><div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" data-v-3a640e4e></div><div class="absolute inset-0 p-8 flex flex-col justify-end text-white" data-v-3a640e4e><div class="mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" data-v-3a640e4e><div class="w-12 h-12 bg-isuzu-red rounded-lg flex items-center justify-center mb-4 shadow-lg" data-v-3a640e4e><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" data-v-3a640e4e><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" data-v-3a640e4e></path></svg></div><h3 class="text-2xl font-bold mb-2" data-v-3a640e4e>ทดลองขับ</h3><p class="text-gray-200 text-sm mb-4 leading-relaxed" data-v-3a640e4e>สัมผัสประสบการณ์การขับขี่ที่เหนือชั้นกับอีซูซุรุ่นใหม่ล่าสุดด้วยตัวคุณเอง</p><a href="https://forms.office.com/r/UsNjBZesdj?origin=lprLink" target="_blank" rel="noopener noreferrer" class="block w-full text-center bg-white text-isuzu-red font-bold py-3 px-6 rounded-lg uppercase tracking-wide hover:bg-isuzu-red hover:text-white transition-colors duration-300" data-v-3a640e4e> นัดหมายทดลองขับ </a></div></div></div><div class="group relative overflow-hidden rounded-2xl aspect-[4/5] shadow-xl transition-all duration-500 hover:-translate-y-2" data-v-3a640e4e><div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style="${
    ssrRenderStyle({"background-image":"url('https://cdn.jsdelivr.net/gh/stcbandu-stack/stcisuzu@main/service.jpg')"})
  }" data-v-3a640e4e></div><div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" data-v-3a640e4e></div><div class="absolute inset-0 p-8 flex flex-col justify-end text-white" data-v-3a640e4e><div class="mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" data-v-3a640e4e><div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 shadow-lg" data-v-3a640e4e><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3a640e4e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" data-v-3a640e4e></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-3a640e4e></path></svg></div><h3 class="text-2xl font-bold mb-2" data-v-3a640e4e>นัดหมายศูนย์บริการ</h3><p class="text-gray-200 text-sm mb-4 leading-relaxed" data-v-3a640e4e>มั่นใจทุกการเดินทางด้วยบริการมาตรฐานศูนย์อีซูซุ จองคิวล่วงหน้าเพื่อความสะดวก</p><a href="https://line.me/R/ti/p/@STCCR" target="_blank" rel="noopener noreferrer" class="block w-full text-center bg-white text-blue-600 font-bold py-3 px-6 rounded-lg uppercase tracking-wide hover:bg-blue-600 hover:text-white transition-colors duration-300" data-v-3a640e4e> จองคิวรับบริการ </a></div></div></div><div class="group relative overflow-hidden rounded-2xl aspect-[4/5] shadow-xl transition-all duration-500 hover:-translate-y-2" data-v-3a640e4e><div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style="${
    ssrRenderStyle({"background-image":"url('https://cdn.jsdelivr.net/gh/stcbandu-stack/stcisuzu@main/carcon.jpg')"})
  }" data-v-3a640e4e></div><div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" data-v-3a640e4e></div><div class="absolute inset-0 p-8 flex flex-col justify-end text-white" data-v-3a640e4e><div class="mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" data-v-3a640e4e><div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4 shadow-lg" data-v-3a640e4e><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3a640e4e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" data-v-3a640e4e></path></svg></div><h3 class="text-2xl font-bold mb-2" data-v-3a640e4e>อู่สี Carcon</h3><p class="text-gray-200 text-sm mb-4 leading-relaxed" data-v-3a640e4e>บริการเคาะพ่นสีมาตรฐานระดับพรีเมียม ดูแลรถของคุณให้สวยงามเหมือนใหม่อยู่เสมอ</p><a href="/carcon" class="block w-full text-center bg-white text-orange-600 font-bold py-3 px-6 rounded-lg uppercase tracking-wide hover:bg-orange-500 hover:text-white transition-colors duration-300" data-v-3a640e4e> ดูรายละเอียด </a></div></div></div></div></div></section>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/QuickActions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const QuickActions = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender],['__scopeId',"data-v-3a640e4e"]]);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative"> ${renderComponent($$result2, "HeroSlideshow", HeroSlideshow, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "D:/Website/isuzu-stc/src/components/HeroSlideshow.vue", "client:component-export": "default" })} </section>  ${renderComponent($$result2, "VideoBackgroundSection", VideoBackgroundSection, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/Website/isuzu-stc/src/components/VideoBackgroundSection.vue", "client:component-export": "default" })}  <section id="vehicles" class="bg-gray-50 relative z-20"> ${renderComponent($$result2, "VehicleShowcase", VehicleShowcase, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/Website/isuzu-stc/src/components/VehicleShowcase.vue", "client:component-export": "default" })} </section>  ${renderComponent($$result2, "QuickActions", QuickActions, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/Website/isuzu-stc/src/components/QuickActions.vue", "client:component-export": "default" })}  <section class="relative py-20 overflow-hidden hidden"> <!-- Background --> <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-isuzu-dark"></div> <!-- Animated Background Elements --> <div class="absolute inset-0 overflow-hidden"> <div class="absolute -top-40 -right-40 w-80 h-80 bg-isuzu-red/10 rounded-full blur-3xl animate-pulse"></div> <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-isuzu-red/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div> </div> <!-- Content --> <div class="relative z-10 text-center px-4 max-w-5xl mx-auto"> <!-- Badge --> <div class="inline-flex items-center bg-isuzu-red/10 border border-isuzu-red/20 rounded-full px-4 py-2 mb-8"> <span class="w-2 h-2 bg-isuzu-red rounded-full mr-2 animate-pulse"></span> <span class="text-isuzu-red text-sm font-medium">ศูนย์จำหน่ายรถยนต์อีซูซุอย่างเป็นทางการ</span> </div> <!-- Heading --> <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
ยินดีต้อนรับสู่
<span class="block text-transparent bg-clip-text bg-gradient-to-r from-isuzu-red to-red-400">
ISUZU STC
</span> </h1> <!-- Subheading --> <p class="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
ศูนย์จำหน่ายรถยนต์อีซูซุครบวงจร พร้อมบริการหลังการขายมาตรฐาน
<br class="hidden md:block">
และโปรโมชั่นพิเศษสำหรับคุณ
</p> <!-- CTA Buttons --> <div class="flex flex-col sm:flex-row items-center justify-center gap-4"> <a href="#vehicles" class="group bg-isuzu-red hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-isuzu-red/30 hover:scale-105 flex items-center">
ดูรถยนต์ทั้งหมด
<svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> <a href="#promotions" class="group bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:border-isuzu-red/50 flex items-center"> <svg class="w-5 h-5 mr-2 text-isuzu-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path> </svg>
โปรโมชั่นพิเศษ
</a> </div> <!-- Stats --> <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"> <div class="text-center"> <div class="text-3xl md:text-4xl font-bold text-white mb-1">20+</div> <div class="text-gray-500 text-sm">ปีประสบการณ์</div> </div> <div class="text-center"> <div class="text-3xl md:text-4xl font-bold text-white mb-1">
5,000+
</div> <div class="text-gray-500 text-sm">ลูกค้าที่ไว้วางใจ</div> </div> <div class="text-center"> <div class="text-3xl md:text-4xl font-bold text-white mb-1">10+</div> <div class="text-gray-500 text-sm">รุ่นรถยนต์</div> </div> <div class="text-center"> <div class="text-3xl md:text-4xl font-bold text-white mb-1">24/7</div> <div class="text-gray-500 text-sm">บริการช่วยเหลือ</div> </div> </div> </div> </section> ` })}`;
}, "D:/Website/isuzu-stc/src/pages/index.astro", void 0);

const $$file = "D:/Website/isuzu-stc/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
