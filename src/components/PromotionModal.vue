<template>
  <div v-if="promotion" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
    <div class="bg-gray-800 rounded-3xl shadow-2xl w-full max-w-5xl border border-gray-700 overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
      
      <!-- Close Button Mobile -->
      <button @click="$emit('close')" class="absolute top-4 right-4 md:hidden text-white bg-black/50 p-2 rounded-full z-10">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>

      <!-- Left: Image Section with Gallery -->
      <div v-if="!showLeadForm && !isSuccess" class="md:w-1/2 bg-gray-900 border-r border-gray-700/50 overflow-y-auto">
        <div class="p-6 space-y-4">
          <!-- Main Image 4:5 -->
          <div class="aspect-[4/5] w-full relative shadow-2xl rounded-2xl overflow-hidden cursor-pointer" @click="openLightbox(promotion.image_url)">
              <img :src="promotion.image_url" class="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300">
              <div class="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
              </div>
          </div>
          
          <!-- Gallery Grid 5:4 -->
          <div v-if="galleryImages.length > 0" class="space-y-3">
            <h4 class="text-gray-400 text-sm font-medium flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              รูปภาพเพิ่มเติม ({{ galleryImages.length }})
            </h4>
            <div class="grid grid-cols-2 gap-2">
              <div 
                v-for="(img, idx) in visibleGallery" 
                :key="idx" 
                class="aspect-[5/4] rounded-xl overflow-hidden cursor-pointer border border-gray-700/50 hover:border-isuzu-red/50 transition-colors"
                @click="openLightbox(img)"
              >
                <img :src="img" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" @error="(e) => e.target.src = 'https://placehold.co/500x400/333/666?text=Error'">
              </div>
            </div>
            
            <!-- Load More Button (Infinite Scroll Trigger) -->
            <div v-if="hasMoreGallery" ref="loadMoreTrigger" class="flex justify-center py-4">
              <button 
                @click="loadMoreGallery" 
                class="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl text-sm transition-colors border border-gray-700"
              >
                โหลดเพิ่มเติม ({{ galleryImages.length - visibleCount }} รูป)
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Content Section / Form Section -->
      <div :class="[showLeadForm || isSuccess ? 'w-full' : 'md:w-1/2']" class="p-8 md:p-12 overflow-y-auto flex flex-col">
        <div class="flex justify-between items-start mb-6">
            <span class="px-3 py-1 bg-isuzu-red/20 text-isuzu-red text-xs font-bold rounded-full uppercase tracking-widest border border-isuzu-red/30">Promotion</span>
            <button @click="$emit('close')" class="hidden md:block text-gray-400 hover:text-white transition-colors">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
        </div>

        <!-- Success Message -->
        <div v-if="isSuccess" class="flex-grow flex flex-col items-center justify-center text-center space-y-6 py-12 animate-fade-in">
          <div class="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-4 scale-up">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-3xl font-black text-white">ส่งข้อมูลสำเร็จ</h3>
          <p class="text-gray-400 text-lg">รอที่ปรึกษาการขายติดต่อกลับขอบคุณครับ</p>
          <button 
            @click="$emit('close')"
            class="px-12 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-2xl font-bold transition-all mt-8"
          >
            กลับสู่หน้าหลัก
          </button>
        </div>

        <!-- Lead Form -->
        <PromotionLeadForm 
          v-else-if="showLeadForm" 
          :promotion="promotion"
          @back="showLeadForm = false"
          @success="handleSuccess"
          class="flex-grow"
        />

        <!-- Promotion Details -->
        <template v-else>
          <h2 class="text-3xl font-extrabold text-white mb-6 leading-tight">
              {{ promotion.title }}
          </h2>

          <div class="prose prose-invert prose-red max-w-none flex-grow">
              <p class="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                  {{ promotion.description }}
              </p>
          </div>

          <!-- Footer Actions -->
          <div class="mt-12 pt-8 border-t border-gray-700/50 flex flex-col gap-4">
              <!-- Interested Button (Hidden for now) -->
              <button 
                  v-if="false"
                  @click="showLeadForm = true"
                  class="w-full py-4 bg-isuzu-red hover:bg-red-700 text-white rounded-2xl font-bold text-center transition-all shadow-xl shadow-isuzu-red/20 flex items-center justify-center gap-2 group"
              >
                  สนใจโปรโมชั่น
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </button>

              <a 
                  v-if="promotion.direct_url"
                  :href="promotion.direct_url" 
                  target="_blank"
                  class="w-full py-4 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-2xl font-bold text-center transition-all border border-gray-700 flex items-center justify-center gap-2 group"
              >
                  ดูรายละเอียดเพิ่มเติม
                  <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              </a>

              <button 
                  @click="$emit('close')"
                  class="w-full py-4 text-gray-500 hover:text-white transition-all text-sm font-medium"
              >
                  ปิดหน้าต่างนี้
              </button>
          </div>
        </template>
      </div>
    </div>
    
    <!-- Lightbox -->
    <div 
      v-if="lightboxImage" 
      class="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4"
      @click="closeLightbox"
    >
      <button class="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
      <img :src="lightboxImage" class="max-w-full max-h-full object-contain rounded-lg shadow-2xl" @click.stop>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import PromotionLeadForm from './PromotionLeadForm.vue';

const props = defineProps({
  promotion: Object
});
defineEmits(['close']);

const showLeadForm = ref(false);
const isSuccess = ref(false);

// Gallery
const ITEMS_PER_PAGE = 4;
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
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.scale-up {
  animation: scaleUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes scaleUp {
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>

