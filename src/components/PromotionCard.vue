<template>
  <div class="group bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-isuzu-red transition-all duration-300 hover:shadow-2xl hover:shadow-isuzu-red/10 flex flex-col h-full">
    <!-- Image 4:5 Aspect Ratio -->
    <div class="relative aspect-[4/5] overflow-hidden">
        <img 
            :src="promotion.image_url" 
            :alt="promotion.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
    </div>

    <!-- Content -->
    <div class="p-6 flex flex-col flex-grow">
        <h3 class="text-xl font-bold text-white mb-3 group-hover:text-isuzu-red transition-colors line-clamp-2 min-h-[3.5rem]">
            {{ promotion.title }}
        </h3>
        <p class="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
            {{ promotion.description }}
        </p>
        <button 
            @click="$emit('select', promotion)"
            class="w-full py-3 bg-gray-700 hover:bg-isuzu-red text-white rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
        >
            ดูรายละเอียดเพิ่มเติม
            <svg class="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  promotion: {
    type: Object,
    required: true
  }
});
defineEmits(['select']);
</script>
