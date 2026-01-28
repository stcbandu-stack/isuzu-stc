<template>
  <section class="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-black">
    <!-- Video Background Loop -->
    <div v-for="(video, index) in videos" :key="index" 
         class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
         :class="currentVideoIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'">
      <video
        v-if="currentVideoIndex === index || isNextVideo(index)"
        :ref="el => { if (el) videoRefs[index] = el }"
        class="h-full w-full object-cover"
        :muted="true"
        :playsinline="true"
        :poster="video.poster"
        preload="auto"
        @ended="handleVideoEnded"
      >
        <source :src="computeVideoSrc(video.url)" type="video/webm" />
        <source :src="computeVideoSrc(video.url).replace('f_auto', 'f_mp4')" type="video/mp4" />
      </video>
      
      <!-- Black Overlay -->
      <div class="absolute inset-0 bg-black/40 z-20"></div>
      
      <!-- Content Overlay -->
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-30">
        <div class="max-w-4xl mx-auto space-y-8 transform transition-all duration-1000"
             :class="currentVideoIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
          <img :src="video.logo" :alt="video.text" class="h-28 md:h-48 lg:h-64 mx-auto object-contain drop-shadow-2xl" />
          <h2 class="text-lg md:text-xl lg:text-2xl font-medium text-white/90 tracking-wide leading-tight drop-shadow-lg">
            {{ video.text }}
          </h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

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
</script>

<style scoped>
.drop-shadow-lg {
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5));
}
.drop-shadow-2xl {
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.8));
}
</style>
