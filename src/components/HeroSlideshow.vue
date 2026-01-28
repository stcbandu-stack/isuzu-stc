<template>
  <div class="relative w-full overflow-hidden" :style="{ aspectRatio: '16/9' }">
    <!-- Slides -->
    <div
      v-for="(slide, index) in slides"
      :key="index"
      class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
      :class="currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'"
    >
      <img
        :src="slide.image_url"
        :alt="slide.title"
        class="w-full h-full object-cover"
      />
      <!-- Overlay Gradient -->
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
      
      <!-- Slide Content -->
      <div class="absolute inset-0 flex items-end justify-start p-8 md:p-16">
        <div class="max-w-2xl">
          <h2 
            class="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 transform transition-all duration-700"
            :class="currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
            style="transition-delay: 200ms;"
          >
            {{ slide.title }}
          </h2>
          <p 
            class="text-gray-300 text-sm md:text-lg mb-6 transform transition-all duration-700"
            :class="currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
            style="transition-delay: 400ms;"
          >
            {{ slide.description }}
          </p>
          <a
            v-if="slide.button_text"
            :href="slide.button_link"
            class="inline-block bg-isuzu-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 transform"
            :class="currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
            style="transition-delay: 600ms;"
          >
            {{ slide.button_text }}
          </a>
        </div>
      </div>
    </div>

    <!-- Navigation Dots -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        class="group relative w-3 h-3 rounded-full transition-all duration-300"
        :class="currentSlide === index ? 'bg-isuzu-red w-8' : 'bg-white/50 hover:bg-white/80'"
      >
        <span class="sr-only">Go to slide {{ index + 1 }}</span>
      </button>
    </div>

    <!-- Arrow Navigation -->
    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-isuzu-red text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-isuzu-red text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Progress Bar -->
    <div class="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
      <div 
        class="h-full bg-isuzu-red transition-all duration-100 ease-linear"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { supabase } from '../lib/supabase';

const props = defineProps({
  autoplay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 5000
  }
});

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
</script>
