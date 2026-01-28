<template>
  <div v-if="promotion" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
    <div class="bg-gray-800 rounded-3xl shadow-2xl w-full max-w-4xl border border-gray-700 overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
      
      <!-- Close Button Mobile -->
      <button @click="$emit('close')" class="absolute top-4 right-4 md:hidden text-white bg-black/50 p-2 rounded-full z-10">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>

      <!-- Left: Image Section -->
      <div v-if="!showLeadForm && !isSuccess" class="md:w-1/2 bg-gray-900 border-r border-gray-700/50">
        <div class="aspect-[4/5] w-full h-full relative">
            <img :src="promotion.image_url" class="absolute inset-0 w-full h-full object-cover">
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
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PromotionLeadForm from './PromotionLeadForm.vue';

defineProps({
  promotion: Object
});
defineEmits(['close']);

const showLeadForm = ref(false);
const isSuccess = ref(false);

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

