<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 overflow-y-auto backdrop-blur-sm">
    <div class="bg-gray-800 rounded-xl shadow-2xl w-full max-w-5xl border border-gray-700 flex flex-col max-h-[90vh]">
      
      <!-- Modal Header -->
      <div class="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-800 rounded-t-xl sticky top-0 z-10">
        <h3 class="text-xl font-bold text-white">
            {{ isEditing ? 'แก้ไขข้อมูลรถยนต์' : 'เพิ่มรถยนต์ใหม่' }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 overflow-y-auto flex-1 space-y-8">
        
        <!-- Section 1: Basic Info -->
        <form @submit.prevent="saveVehicle" class="space-y-6">
            <h4 class="text-lg font-semibold text-isuzu-red border-b border-gray-700 pb-2">1. ข้อมูลทั่วไป</h4>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                     <label class="block text-sm font-medium text-gray-300 mb-1">Model Category</label>
                     <select v-model="form.model_category" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-isuzu-red focus:outline-none">
                        <option value="V-Cross">V-Cross</option>
                        <option value="Mu-X">Mu-X</option>
                        <option value="Spark">Spark</option>
                        <option value="2 Drs">2 Drs (Spacab/Hi-Lander)</option>
                        <option value="4 Drs">4 Drs (Cab4/Hi-Lander)</option>
                        <option value="X-Series">X-Series</option>
                     </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Sub Model</label>
                    <input v-model="form.sub_model" type="text" placeholder="e.g. Hi-Lander 4 Doors" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-isuzu-red focus:outline-none" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Grade</label>
                    <input v-model="form.grade" type="text" placeholder="e.g. Z or M AT" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-isuzu-red focus:outline-none">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Engine</label>
                    <input v-model="form.engine" type="text" placeholder="e.g. 1.9 Ddi" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-isuzu-red focus:outline-none">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Price (THB)</label>
                    <input v-model.number="form.price" type="number" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-isuzu-red focus:outline-none" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Direct URL</label>
                    <input v-model="form.direct_url" type="text" placeholder="Optional" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-isuzu-red focus:outline-none">
                </div>
            </div>

            <!-- Main Image Input -->
             <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">รูปภาพหลัก (Default Image)</label>
                <div class="flex gap-4 items-start">
                    <div class="w-48 h-28 bg-gray-900 border border-gray-600 rounded overflow-hidden flex-shrink-0">
                        <img v-if="form.image_url" :src="form.image_url" class="w-full h-full object-cover">
                        <div v-else class="w-full h-full flex items-center justify-center text-gray-600 text-xs">No Image</div>
                    </div>
                    <div class="flex-1 space-y-2">
                        <input v-model="form.image_url" type="text" placeholder="Image URL (or upload below)" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-isuzu-red focus:outline-none text-sm">
                        <!-- Simple File Upload for now -->
                         <label class="inline-flex items-center px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-600 text-sm text-gray-300 transition-colors">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                            <span>อัปโหลดรูป</span>
                            <input type="file" class="hidden" accept="image/*" @change="(e) => handleFileUpload(e, 'main')">
                        </label>
                        <p v-if="uploading" class="text-xs text-yellow-400">Uploading...</p>
                    </div>
                </div>
            </div>
            
            <div class="flex justify-end pt-4">
                 <button type="submit" class="bg-isuzu-red hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors" :disabled="saving">
                    {{ isEditing ? 'บันทึกการแก้ไข' : 'สร้างข้อมูลรถยนต์' }}
                 </button>
            </div>
        </form>

        <!-- Section 2: Colors Management (Only show if editing) -->
        <div v-if="isEditing" class="space-y-6 pt-6 border-t border-gray-700">
             <div class="flex justify-between items-center">
                <h4 class="text-lg font-semibold text-isuzu-red">2. จัดการสี (Colors)</h4>
                <div class="flex items-center gap-4">
                    <div v-if="loadingColors" class="flex items-center text-xs text-gray-500 gap-2">
                        <span class="animate-spin h-3 w-3 border-b-2 border-isuzu-red rounded-full"></span>
                        กำลังโหลดสี...
                    </div>
                    <button @click="openColorModal()" class="text-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                        เพิ่มสี
                    </button>
                </div>
             </div>

             <!-- Colors List -->
             <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="color in colors" :key="color.id" class="bg-gray-700/50 border border-gray-600 rounded-lg p-3 flex gap-3 group relative">
                    <!-- Color Swatch & Img -->
                    <div class="space-y-2">
                        <div class="w-12 h-12 rounded-lg shadow-sm ring-1 ring-white/10" :style="{ backgroundColor: color.color_hex }"></div>
                        <div class="w-12 h-8 bg-black rounded overflow-hidden">
                             <img v-if="color.image_url" :src="color.image_url" class="w-full h-full object-cover">
                        </div>
                    </div>
                    
                    <div class="flex-1 min-w-0">
                        <p class="font-medium text-white truncate text-sm" :title="color.color_name">{{ color.color_name }}</p>
                        <p class="text-xs text-gray-400 font-mono">{{ color.color_hex }}</p>
                        <p v-if="color.price_extra > 0" class="text-xs text-green-400 mt-1">+{{ formatPrice(color.price_extra) }}</p>
                    </div>

                    <!-- Actions -->
                    <div class="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button @click="openColorModal(color)" class="p-1 text-gray-400 hover:text-white bg-gray-800 rounded">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                         <button @click="initiateDeleteColor(color)" class="p-1 text-red-400 hover:text-red-300 bg-gray-800 rounded">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                </div>
                
                <div v-if="!loadingColors && colors.length === 0" class="col-span-full text-center py-6 text-gray-500 bg-gray-700/20 rounded-lg border border-dashed border-gray-700">
                    ยังไม่มีข้อมูลสีสำหรับรุ่นนี้
                </div>
             </div>
        </div>

        <div v-else class="text-center py-8 text-gray-500 bg-gray-700/20 rounded-lg border border-dashed border-gray-700">
            บันทึกข้อมูลรถยนต์เพื่อจัดการสี
        </div>

      </div>
    </div>

    <!-- Nested Color Modal -->
    <div v-if="showColorModal" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
         <div class="bg-gray-800 rounded-xl shadow-xl w-full max-w-md border border-gray-600">
            <div class="p-4 border-b border-gray-700 flex justify-between items-center">
                 <h4 class="text-lg font-bold text-white">{{ editingColor ? 'แก้ไขสี' : 'เพิ่มสีใหม่' }}</h4>
                 <button @click="closeColorModal" class="text-gray-400 hover:text-white">✕</button>
            </div>
            <form @submit.prevent="saveColor" class="p-4 space-y-4">
                 <div>
                    <label class="block text-xs text-gray-400 mb-1">ชื่อสี</label>
                    <input v-model="colorForm.color_name" type="text" class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-isuzu-red" required>
                 </div>
                 <div class="flex gap-4">
                    <div class="flex-1">
                        <label class="block text-xs text-gray-400 mb-1">รหัสสี (Hex)</label>
                        <div class="flex gap-2">
                             <input v-model="colorForm.color_hex" type="color" class="h-9 w-9 bg-transparent border-0 p-0 cursor-pointer">
                             <input v-model="colorForm.color_hex" type="text" class="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm" required>
                        </div>
                    </div>
                    <div class="w-1/3">
                        <label class="block text-xs text-gray-400 mb-1">เพิ่มเงิน (+)</label>
                        <input v-model.number="colorForm.price_extra" type="number" class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm">
                    </div>
                 </div>
                 <div>
                    <label class="block text-xs text-gray-400 mb-1">รูปประจำสี (Optional)</label>
                    <div class="flex gap-2">
                         <input v-model="colorForm.image_url" type="text" placeholder="URL" class="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm">
                         <label class="px-3 py-2 bg-gray-600 hover:bg-gray-500 rounded cursor-pointer text-white text-sm">
                             UP
                             <input type="file" class="hidden" accept="image/*" @change="(e) => handleFileUpload(e, 'color')">
                         </label>
                    </div>
                 </div>
                 <div class="flex justify-end pt-2">
                     <button type="submit" class="bg-isuzu-red hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium disabled:opacity-50 flex items-center gap-2" :disabled="savingColor">
                         <span v-if="savingColor" class="animate-spin h-3 w-3 border-b-2 border-white rounded-full"></span>
                         {{ editingColor ? 'อัปเดต' : 'เพิ่ม' }}
                     </button>
                 </div>
            </form>
         </div>
    </div>

    <!-- Delete Confirmation Modal for Colors -->
    <DeleteConfirmModal 
      :isOpen="showDeleteColorModal"
      :itemName="colorToDelete ? colorToDelete.color_name : ''"
      @close="closeDeleteColorModal"
      @confirmed="executeDeleteColor"
    />

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { supabase } from '../../lib/supabase';
import { toast } from '../../lib/toast';
import DeleteConfirmModal from './DeleteConfirmModal.vue';

const props = defineProps({
  vehicle: Object
});

const emit = defineEmits(['close', 'saved']);

const isEditing = computed(() => !!props.vehicle);
const saving = ref(false);
const savingColor = ref(false);
const uploading = ref(false);
const loadingColors = ref(false);
const colors = ref([]);
const showColorModal = ref(false);
const editingColor = ref(null);

// Delete State
const showDeleteColorModal = ref(false);
const colorToDelete = ref(null);

// Main Form
const form = ref({
    model_category: 'V-Cross',
    sub_model: '',
    engine: '',
    grade: '',
    price: 0,
    image_url: '',
    direct_url: ''
});

// Color Form
const colorForm = ref({
    color_name: '',
    color_hex: '#ffffff',
    image_url: '',
    price_extra: 0,
    direct_url: ''
});

// Data Fetching
const fetchColors = async (vehicleId) => {
    if (!vehicleId) return;
    loadingColors.value = true;
    try {
        console.log('Fetching colors for vehicleId:', vehicleId);
        const { data, error } = await supabase.from('vehicle_colors').select('*').eq('vehicle_id', vehicleId);
        if (error) throw error;
        colors.value = data || [];
        console.log('Fetched colors result:', colors.value);
    } catch (err) {
        console.error('Error fetching colors:', err);
        toast.error('ไม่สามารถโหลดข้อมูลสีได้: ' + err.message);
    } finally {
        loadingColors.value = false;
    }
};

// Initialize
watch(() => props.vehicle, async (newVal) => {
    if (newVal) {
        form.value = { ...newVal };
        await fetchColors(newVal.id);
    } else {
        // Reset
        form.value = {
            model_category: 'V-Cross',
            sub_model: '',
            engine: '',
            grade: '',
            price: 0,
            image_url: '',
            direct_url: ''
        };
        colors.value = [];
    }
}, { immediate: true });

// Main Save
const saveVehicle = async () => {
    if (saving.value) return; // Double submit guard
    saving.value = true;
    try {
        let result;
        if (isEditing.value) {
            // Update
            const { data, error } = await supabase.from('vehicles').update(form.value).eq('id', props.vehicle.id).select().single();
            if (error) throw error;
            result = data;
        } else {
            // Insert
            const { data, error } = await supabase.from('vehicles').insert([form.value]).select().single();
            if (error) throw error;
            result = data;
        }
        
        toast.success('บันทึกข้อมูลเรียบร้อยแล้ว');
        emit('saved');
        emit('close'); 
    } catch (err) {
        toast.error('เกิดข้อผิดพลาดในการบันทึก: ' + err.message);
    } finally {
        saving.value = false;
    }
};

// Color Actions
const openColorModal = (color = null) => {
    editingColor.value = color;
    if (color) {
        colorForm.value = { ...color };
    } else {
        colorForm.value = {
            color_name: '',
            color_hex: '#ffffff',
            image_url: '',
            price_extra: 0,
            direct_url: ''
        };
    }
    showColorModal.value = true;
};

const closeColorModal = () => {
    showColorModal.value = false;
    editingColor.value = null;
};

const saveColor = async () => {
    if (savingColor.value) return; // Guard
    savingColor.value = true;
    try {
        const payload = { ...colorForm.value, vehicle_id: props.vehicle.id };
        if (editingColor.value) {
             await supabase.from('vehicle_colors').update(payload).eq('id', editingColor.value.id);
        } else {
             await supabase.from('vehicle_colors').insert([payload]);
        }
        toast.success('บันทึกสีเรียบร้อยแล้ว');
        await fetchColors(props.vehicle.id);
        closeColorModal();
    } catch (err) {
        toast.error('เกิดข้อผิดพลาดในการบันทึกสี: ' + err.message);
    } finally {
        savingColor.value = false;
    }
};

// Delete Logic
const initiateDeleteColor = (color) => {
    colorToDelete.value = color;
    showDeleteColorModal.value = true;
};

const closeDeleteColorModal = () => {
    showDeleteColorModal.value = false;
    colorToDelete.value = null;
};

const executeDeleteColor = async () => {
    if (!colorToDelete.value) return;
    try {
        await supabase.from('vehicle_colors').delete().eq('id', colorToDelete.value.id);
        toast.success('ลบสีเรียบร้อยแล้ว');
        await fetchColors(props.vehicle.id);
    } catch (err) {
        toast.error('เกิดข้อผิดพลาดในการลบสี: ' + err.message);
    }
};

// File Upload Utility
const handleFileUpload = async (e, type = 'main') => {
    const file = e.target.files[0];
    if (!file) return;
    
    uploading.value = true;
    try {
        const fileName = `${Date.now()}_${file.name}`;
        const { data, error } = await supabase.storage.from('slides').upload(fileName, file); 
        
        if (error) throw error;
        
        const { data: { publicUrl } } = supabase.storage.from('slides').getPublicUrl(fileName);
        
        if (type === 'main') {
            form.value.image_url = publicUrl;
        } else {
            colorForm.value.image_url = publicUrl;
        }
        toast.success('อัปโหลดรูปภาพเสร็จสิ้น');
    } catch (err) {
        toast.error('การอัปโหลดล้มเหลว: ' + err.message);
    } finally {
        uploading.value = false;
    }
};

const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(price);
};
</script>
