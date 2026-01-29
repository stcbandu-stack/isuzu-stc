<template>
  <div class="relative w-full bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
    style="height: 600px;"
    @mousedown="startDrag"
    @touchstart="startDrag"
    @mousemove="onDrag"
    @touchmove="onDrag"
    @mouseup="endDrag"
    @touchend="endDrag"
    @mouseleave="endDrag"
  >
    <!-- Cards Stack -->
    <div class="relative w-full h-full flex items-center justify-center">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="absolute rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-300 ease-out"
        :style="{
          aspectRatio: '4 / 5',
          width: 'clamp(200px, 50vw, 500px)',
          ...getCardStyle(index)
        }"
        @click="selectSlide(index)"
      >
        <img
          :src="image"
          :alt="`Truck ${index + 1}`"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
      </div>
    </div>

    <!-- Navigation Arrows -->
    <button
      @click="prevSlide"
      class="absolute left-4 p-3 bg-isuzu-red/80 hover:bg-isuzu-red text-white rounded-lg transition-colors z-10"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      @click="nextSlide"
      class="absolute right-4 p-3 bg-isuzu-red/80 hover:bg-isuzu-red text-white rounded-lg transition-colors z-10"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Slide Counter -->
    <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-lg text-sm">
      {{ currentIndex + 1 }} / {{ images.length }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

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
const dragThreshold = 30;

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
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
