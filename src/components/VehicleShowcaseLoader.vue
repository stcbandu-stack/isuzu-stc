<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue';

// Lazy load the heavy component
const VehicleShowcase = defineAsyncComponent(() => 
  import('./VehicleShowcase.vue')
);

const isMobile = ref(false);
const shouldLoad = ref(false);

const checkDevice = () => {
    // Check if mobile (let's say < 768px)
    isMobile.value = window.innerWidth < 768;
    
    // If not mobile, load immediately
    if (!isMobile.value) {
        shouldLoad.value = true;
    }
};

const activate = () => {
    shouldLoad.value = true;
}

onMounted(() => {
    checkDevice();
    // Auto-load if resized to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && !shouldLoad.value) {
             shouldLoad.value = true;
        }
    });
});
</script>

<template>
  <div class="vehicle-showcase-loader w-full"> 
    <template v-if="shouldLoad">
         <VehicleShowcase />
    </template>

    <!-- Mobile Placeholder / Trigger -->
    <div v-else class="w-full max-w-lg mx-auto px-4 py-8">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
             <h3 class="text-lg font-bold text-gray-900 mb-2">เลือกรุ่นรถ ISUZU ที่คุณสนใจ</h3>
             <p class="text-gray-500 text-sm mb-6">ดูรูปรถ รุ่นรถ และเช็กราคา</p>
             
             <button 
                @click="activate"
                class="w-full bg-isuzu-red text-white py-3 px-6 rounded-xl font-bold active:scale-95 transition-all shadow-md shadow-isuzu-red/20 flex items-center justify-center gap-2"
             >
                <span>🔍</span> ดูรุ่นรถ / เช็คราคา
             </button>
        </div>
        
        <p class="text-center text-gray-400 text-[10px] mt-4 opacity-75">
            กดปุ่มเพื่อโหลดข้อมูลรุ่นรถ
        </p>
    </div>
  </div>
</template>