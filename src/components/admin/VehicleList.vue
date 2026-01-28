<template>
  <div>
    <!-- Header Actions -->
    <div class="flex justify-between items-center mb-6">
       <!-- Search -->
       <div class="relative w-64">
           <input 
             v-model="searchQuery" 
             type="text" 
             placeholder="ค้นหาชื่อรุ่น..." 
             class="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-isuzu-red focus:outline-none"
           >
           <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
           </svg>
       </div>

       <button 
         @click="openEditor()"
         class="bg-isuzu-red hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors shadow-lg shadow-isuzu-red/20"
       >
         <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
         </svg>
         เพิ่มรถยนต์
       </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-isuzu-red mx-auto"></div>
        <p class="text-gray-400 mt-4">กำลังโหลดข้อมูล...</p>
    </div>

    <!-- Table -->
    <div v-else class="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl">
        <table class="w-full text-left text-gray-300">
            <thead class="bg-gray-900 text-gray-400 uppercase text-xs">
                <tr>
                    <th class="px-6 py-4">รูปภาพ</th>
                    <th class="px-6 py-4">รุ่น (Category)</th>
                    <th class="px-6 py-4">รุ่นย่อย (Sub-Model)</th>
                    <th class="px-6 py-4">เกรด (Grade)</th>
                    <th class="px-6 py-4">ราคา</th>
                    <th class="px-6 py-4 text-right">จัดการ</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
                <tr v-for="vehicle in filteredVehicles" :key="vehicle.id" class="hover:bg-gray-700/50 transition-colors">
                    <td class="px-6 py-4">
                        <div class="w-16 h-10 bg-gray-900 rounded border border-gray-600 overflow-hidden flex items-center justify-center">
                            <img v-if="vehicle.image_url" :src="vehicle.image_url" class="w-full h-full object-cover">
                            <span v-else class="text-xs text-gray-600">No Img</span>
                        </div>
                    </td>
                    <td class="px-6 py-4 font-medium text-white">{{ vehicle.model_category }}</td>
                    <td class="px-6 py-4">{{ vehicle.sub_model }}</td>
                    <td class="px-6 py-4">
                         <span class="px-2 py-1 bg-gray-700 rounded text-xs">{{ vehicle.grade }}</span>
                    </td>
                    <td class="px-6 py-4 text-isuzu-red font-bold">
                        {{ formatPrice(vehicle.price) }}
                    </td>
                    <td class="px-6 py-4 text-right space-x-2">
                        <button 
                            @click="openEditor(vehicle)"
                            class="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            แก้ไข
                        </button>
                        <button 
                            @click="initiateDelete(vehicle)"
                            class="text-red-400 hover:text-red-300 transition-colors"
                        >
                            ลบ
                        </button>
                    </td>
                </tr>
                <tr v-if="filteredVehicles.length === 0">
                    <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                        ไม่พบข้อมูลรถยนต์
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Editor Modal -->
    <VehicleEditor 
      v-if="showEditor" 
      :vehicle="selectedVehicle" 
      @close="closeEditor"
      @saved="fetchVehicles"
    />

    <!-- Delete Modal -->
    <DeleteConfirmModal 
      :isOpen="showDeleteModal"
      :itemName="vehicleToDelete ? `${vehicleToDelete.model_category} ${vehicleToDelete.sub_model}` : ''"
      @close="closeDeleteModal"
      @confirmed="executeDelete"
    />

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { supabase } from '../../lib/supabase';
import { toast } from '../../lib/toast';
import VehicleEditor from './VehicleEditor.vue';
import DeleteConfirmModal from './DeleteConfirmModal.vue';

const vehicles = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const showEditor = ref(false);
const selectedVehicle = ref(null);

// Delete State
const showDeleteModal = ref(false);
const vehicleToDelete = ref(null);

const fetchVehicles = async () => {
  loading.value = true;
  try {
    const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('model_category', { ascending: true })
        .order('price', { ascending: true });
    
    if (error) throw error;
    vehicles.value = data || [];
  } catch (err) {
    toast.error('ไม่สามารถโหลดข้อมูลรถได้: ' + err.message);
  } finally {
    loading.value = false;
  }
};

const filteredVehicles = computed(() => {
    if (!searchQuery.value) return vehicles.value;
    const query = searchQuery.value.toLowerCase();
    return vehicles.value.filter(v => 
        v.sub_model.toLowerCase().includes(query) || 
        v.model_category.toLowerCase().includes(query) ||
        v.grade.toLowerCase().includes(query)
    );
});

const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(price);
};

const openEditor = (vehicle = null) => {
    selectedVehicle.value = vehicle;
    showEditor.value = true;
};

const closeEditor = () => {
    showEditor.value = false;
    selectedVehicle.value = null;
};

// Delete Logic
const initiateDelete = (vehicle) => {
    vehicleToDelete.value = vehicle;
    showDeleteModal.value = true;
};

const closeDeleteModal = () => {
    showDeleteModal.value = false;
    vehicleToDelete.value = null;
};

const executeDelete = async () => {
    if (!vehicleToDelete.value) return;
    
    // Optimistic UI update or Show Global Spinner?
    // Let's show Global Spinner using the same 'loading' state or similar?
    // User asked for spinner. 
    loading.value = true; // Block UI

    try {
        const { error } = await supabase.from('vehicles').delete().eq('id', vehicleToDelete.value.id);
        if (error) throw error;
        
        // Success Popup
        toast.success('ลบข้อมูลเรียบร้อยแล้ว');
        await fetchVehicles(); // Reload
    } catch (err) {
        toast.error('ลบข้อมูลไม่สำเร็จ: ' + err.message);
        loading.value = false; // Stop loading if error
    }
    // Note: fetchVehicles sets loading=false at end, so it handles spinner stop
};

onMounted(() => {
    fetchVehicles();
});
</script>
