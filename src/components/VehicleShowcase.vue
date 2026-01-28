<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { supabase } from '../lib/supabase';

// Types
interface VehicleColor {
  id: string;
  color_name: string;
  color_hex: string;
  image_url: string | null;
  price_extra: number;
}

interface Vehicle {
  id: string;
  model_category: string;
  sub_model: string;
  engine: string;
  grade: string;
  price: number;
  image_url: string | null;
  direct_url: string | null;
  vehicle_colors: VehicleColor[];
}

// State
const vehicles = ref<Vehicle[]>([]);
const loading = ref(true);
const selectedCategory = ref('');
const selectedVehicleId = ref<string | null>(null);
const selectedColorIndex = ref(0);

// Magnifier State
const isZoomed = ref(false);
const zoomX = ref(0);
const zoomY = ref(0);
const zoomBgPos = ref('0% 0%');

const categoryOrder = ['V-Cross', 'Mu-X', 'Spark', '2 Drs', '4 Drs', 'X-Series'];

// Fetch Data
const fetchVehicles = async () => {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*, vehicle_colors(*)')
      .order('price', { ascending: true });

    if (error) throw error;
    vehicles.value = data || [];
  } catch (err) {
    console.error('Error fetching vehicles:', err);
  } finally {
    loading.value = false;
  }
};

// Computed
const categories = computed(() => {
  const cats = new Set(vehicles.value.map(v => v.model_category));
  return categoryOrder.filter(c => cats.has(c));
});

const currentCategoryVehicles = computed(() => {
  if (!selectedCategory.value) return [];
  return vehicles.value.filter(v => v.model_category === selectedCategory.value);
});

const currentVehicle = computed(() => {
  return vehicles.value.find(v => v.id === selectedVehicleId.value) || currentCategoryVehicles.value[0];
});

const currentColors = computed(() => {
  return currentVehicle.value?.vehicle_colors || [];
});

const currentColor = computed(() => {
  if (!currentColors.value.length) return null;
  return currentColors.value[selectedColorIndex.value];
});

const displayImage = computed(() => {
  // Prefer color specific image, fallback to vehicle default image
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

// Image Preloading Utility
const preloadedImages = new Set<string>();
const preloadImage = (url: string | null) => {
  if (!url || preloadedImages.has(url)) return;
  const img = new Image();
  img.src = url;
  preloadedImages.add(url);
};

// Preload all images for current category
const preloadCategoryImages = () => {
  currentCategoryVehicles.value.forEach(vehicle => {
    // Preload main vehicle image
    if (vehicle.image_url) preloadImage(vehicle.image_url);
    if (vehicle.direct_url) preloadImage(vehicle.direct_url);
    
    // Preload all color variants
    vehicle.vehicle_colors.forEach(color => {
      if (color.image_url) preloadImage(color.image_url);
    });
  });
};

// Actions
const selectCategory = (cat: string) => {
  selectedCategory.value = cat;
  selectedVehicleId.value = null; 
  selectedColorIndex.value = 0;
  // Trigger preloading for the new category
  preloadCategoryImages();
};

const selectVehicle = (id: string) => {
  selectedVehicleId.value = id;
  selectedColorIndex.value = 0;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(price);
};

const handleMouseMove = (e: MouseEvent) => {
  const container = e.currentTarget as HTMLElement;
  const { left, top, width, height } = container.getBoundingClientRect();
  
  // Calculate relative position (0 to 100)
  const x = ((e.clientX - left) / width) * 100;
  const y = ((e.clientY - top) / height) * 100;
  
  zoomX.value = e.clientX - left;
  zoomY.value = e.clientY - top;
  zoomBgPos.value = `${x}% ${y}%`;
};

// Watch for category change to auto-select first vehicle
watch(currentCategoryVehicles, (newVal) => {
  if (newVal.length > 0 && !selectedVehicleId.value) {
    // Auto select first is handled by currentVehicle computed, but explicit id helps consistency
    // selectVehicle(newVal[0].id); // Optional, computed property handles fallback
  }
});

// Start
onMounted(async () => {
  await fetchVehicles();
  if (categories.value.length > 0) {
    selectCategory(categories.value[0]);
  }
});
</script>

<template>
  <div class="w-full max-w-6xl mx-auto px-4 py-8" id="vehicles">
    <!-- Header -->
    <div class="text-center mb-8">
      <h2 class="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
        เลือกรถ <span class="text-isuzu-red">ISUZU</span> ของคุณ
      </h2>
      <p class="text-gray-500 text-base">นวัตกรรมยานยนต์ที่ตอบโจทย์ทุกไลฟ์สไตล์</p>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-isuzu-red"></div>
    </div>

    <div v-else>
      <!-- Category Tabs (Slider) -->
      <div class="flex overflow-x-auto snap-x space-x-3 pb-4 mb-6 scrollbar-hide justify-start md:justify-center">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="selectCategory(cat)"
          class="flex-shrink-0 snap-center px-6 py-2 rounded-full text-base font-semibold transition-all duration-300 transform hover:scale-105"
          :class="selectedCategory === cat 
            ? 'bg-isuzu-red text-white shadow-md shadow-isuzu-red/20' 
            : 'bg-white text-gray-600 border border-gray-200 hover:border-isuzu-red/50 hover:text-isuzu-red'"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Main Showcase Area -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 relative">
        <div class="grid grid-cols-1 lg:grid-cols-12 min-h-[450px]">
          
          <!-- Left: Variant List -->
          <div class="lg:col-span-4 border-r border-gray-100 bg-gray-50/50 flex flex-col max-h-[450px] lg:h-auto h-[300px]">
            <div class="p-4 bg-white border-b border-gray-100 sticky top-0 z-10">
              <h3 class="text-lg font-bold text-gray-800">เลือกรุ่นย่อย</h3>
              <p class="text-xs text-gray-500">{{ selectedCategory }} Models</p>
            </div>
            <div class="overflow-y-auto flex-1 p-3 space-y-2 custom-scrollbar">
              <div 
                v-for="vehicle in currentCategoryVehicles" 
                :key="vehicle.id"
                @click="selectVehicle(vehicle.id)"
                class="p-3 rounded-lg cursor-pointer transition-all duration-200 border group items-center flex justify-between"
                :class="currentVehicle?.id === vehicle.id 
                  ? 'bg-white border-isuzu-red shadow-sm ring-1 ring-isuzu-red/20' 
                  : 'bg-white border-transparent hover:border-gray-300 hover:shadow-sm'"
              >
                <div>
                  <div class="font-bold text-gray-900 text-sm group-hover:text-isuzu-red transition-colors">
                    {{ vehicle.sub_model }} {{ vehicle.grade }}
                  </div>
                  <div class="text-xs text-gray-500 mt-0.5">
                    เครื่องยนต์ {{ vehicle.engine }}
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-isuzu-red font-semibold text-sm">
                    {{ formatPrice(vehicle.price).replace('THB', '฿') }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Visual & Details -->
          <div class="lg:col-span-8 p-5 md:p-8 flex flex-col relative justify-between">
            
            <!-- Vehicle Display -->
            <div 
              class="flex-1 flex flex-col items-center justify-center relative mb-4 min-h-[250px] w-full"
              @mouseenter="isZoomed = true"
              @mouseleave="isZoomed = false"
              @mousemove="handleMouseMove"
            >
              <!-- Background Blob -->
              <div class="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent rounded-full opacity-50 blur-2xl transform scale-75"></div>
              
              <!-- Element-based Image (Prevents Save As) -->
              <div class="relative z-10 w-full flex items-center justify-center h-full min-h-[250px] cursor-none overflow-visible">
                <div 
                  v-if="displayImage"
                  class="w-full h-full min-h-[250px] bg-contain bg-center bg-no-repeat transition-all duration-500 hover:scale-105 pointer-events-none user-select-none"
                  :style="{ backgroundImage: `url(${displayImage})` }"
                  :aria-label="`${currentVehicle.sub_model} ${currentVehicle.grade}`"
                ></div>
                
                <!-- Magnifier Lens -->
                <div 
                  v-if="isZoomed && displayImage"
                  class="absolute z-50 pointer-events-none border-2 border-isuzu-red/50 rounded-lg shadow-2xl bg-white overflow-hidden"
                  :style="{
                    left: `${zoomX}px`,
                    top: `${zoomY}px`,
                    width: '180px',
                    height: '180px',
                    transform: 'translate(-50%, -50%)',
                    backgroundImage: `url(${displayImage})`,
                    backgroundPosition: zoomBgPos,
                    backgroundSize: '600% auto',
                    backgroundRepeat: 'no-repeat'
                  }"
                >
                </div>

                <div v-else-if="!displayImage" class="text-center p-8 bg-gray-50/50 rounded-xl border border-dashed border-gray-200 w-full max-w-sm mx-auto">
                  <div class="text-4xl mb-2">🚗</div>
                  <p class="text-gray-400 font-medium text-sm">Coming Soon</p>
                </div>
              </div>
            </div>

            <!-- Interaction Panel -->
            <div class="bg-gray-50/80 rounded-xl p-4 md:p-6 backdrop-blur-sm border border-gray-100">
              <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                
                <!-- Info -->
                <div class="space-y-3 flex-1">
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 leading-tight">
                      {{ currentVehicle?.sub_model }}  <span class="text-isuzu-red">{{ currentVehicle?.grade }}</span>
                    </h3>
                    <div class="flex items-baseline gap-2 mt-1">
                      <p class="text-xl font-semibold text-gray-700">
                        {{ formatPrice(displayPrice) }}
                      </p>
                      <p v-if="currentColor?.price_extra" class="text-xs text-isuzu-red font-medium">
                        (+{{ formatPrice(currentColor.price_extra).replace('THB', '') }} ค่าสีพิเศษ)
                      </p>
                    </div>
                  </div>
                  
                  <!-- Color Swatches -->
                  <div v-if="currentColors.length > 0">
                    <div class="flex flex-wrap gap-2 items-center">
                      <span class="text-xs font-medium text-gray-500 mr-2">สีภายนอก:</span>
                      <button 
                        v-for="(color, index) in currentColors" 
                        :key="color.id"
                        @click="selectedColorIndex = index"
                        class="w-6 h-6 rounded-full border border-gray-200 transition-all duration-200 focus:outline-none ring-2 ring-offset-1"
                        :class="selectedColorIndex === index ? 'ring-isuzu-red scale-110 border-white' : 'ring-transparent hover:scale-110'"
                        :style="{ backgroundColor: color.color_hex }"
                        :title="color.color_name"
                      >
                      </button>
                      <span class="text-xs text-gray-600 ml-2 font-medium">{{ currentColor?.color_name }}</span>
                    </div>
                  </div>
                  <div v-else class="text-xs text-gray-400 italic">
                    ยังไม่มีข้อมูลสีสำหรับรุ่นนี้
                  </div>
                </div>

                <!-- CTA Removed as requested -->

              </div>
            </div>

          </div>
        </div>
      </div>
     
      <!-- Disclaimer -->
      <p class="text-center text-gray-400 text-[10px] mt-6 max-w-4xl mx-auto opacity-75">
        *ราคาที่แสดงเป็นราคาแนะนำขายปลึกมาตรฐาน ราคานี้รวมภาษีมูลค่าเพิ่มแล้ว แต่ยังไม่รวมค่าประกันภัยเครื่องปรับอากาศและอุปกรณ์ตกแต่ง
        <br>ภาพรถยนต์ที่ปรากฏเป็นภาพจำลองเพื่อการโฆษณา สีของรถอาจแตกต่างจากของจริงขึ้นอยู่กับการตั้งค่าหน้าจอ
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar for category tabs */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #ddd; 
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #ccc; 
}
</style>
