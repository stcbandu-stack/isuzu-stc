<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
      <h2 class="text-2xl font-bold text-white">จัดการ Slideshow</h2>
      <button 
        @click="openModal()"
        class="bg-isuzu-red hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors shadow-lg shadow-isuzu-red/20"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        เพิ่ม Slide ใหม่
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-isuzu-red mx-auto"></div>
      <p class="text-gray-400 mt-4">กำลังโหลดข้อมูล...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="slides.length === 0" class="text-center py-12 bg-gray-800 rounded-xl border border-gray-700 border-dashed">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p class="mt-2 text-gray-400">ยังไม่มีข้อมูล Slide</p>
    </div>

    <!-- Slides List -->
    <div v-else class="grid gap-6">
      <div 
        v-for="slide in slides" 
        :key="slide.id" 
        class="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg flex flex-col md:flex-row group hover:border-gray-600 transition-colors"
      >
        <!-- Image Preview -->
        <div class="w-full md:w-80 h-48 md:h-auto relative bg-gray-900 border-r border-gray-700">
            <img 
              :src="slide.image_url" 
              :alt="slide.title" 
              class="w-full h-full object-cover"
              @error="(e) => e.target.src = 'https://via.placeholder.com/640x360?text=Image+Error'"
            />
            <div class="absolute top-2 right-2">
                <span 
                    class="px-2 py-1 text-xs rounded-full font-medium"
                    :class="slide.is_active ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'"
                >
                    {{ slide.is_active ? 'แสดงผล' : 'ซ่อน' }}
                </span>
            </div>
            <!-- Type Badge -->
            <div class="absolute bottom-2 left-2">
                 <span v-if="slide.direct_url" class="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/50">Direct URL</span>
                 <span v-else class="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/50">Upload</span>
            </div>
        </div>

        <!-- Content -->
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-bold text-white">{{ slide.title }}</h3>
                <span class="text-gray-500 text-sm font-mono bg-gray-900 px-2 py-1 rounded">Order: {{ slide.display_order }}</span>
            </div>
            <p class="text-gray-400 text-sm mb-4 line-clamp-2">{{ slide.description }}</p>
            <div class="flex flex-wrap gap-2 text-xs text-gray-500 mb-4">
                <span v-if="slide.button_text" class="border border-gray-600 px-2 py-1 rounded">Button: {{ slide.button_text }}</span>
                <span v-if="slide.button_link" class="border border-gray-600 px-2 py-1 rounded truncate max-w-[200px]">Link: {{ slide.button_link }}</span>
            </div>
          </div>
          
          <div class="flex gap-3 justify-end mt-4 pt-4 border-t border-gray-700">
            <button 
              @click="toggleStatus(slide)"
              class="text-sm px-3 py-1.5 rounded transition-colors font-medium"
              :class="slide.is_active ? 'text-yellow-400 hover:bg-yellow-400/10' : 'text-green-400 hover:bg-green-400/10'"
            >
              {{ slide.is_active ? 'ซ่อน' : 'แสดง' }}
            </button>
            <button 
              @click="openModal(slide)"
              class="text-sm text-blue-400 hover:bg-blue-400/10 px-3 py-1.5 rounded transition-colors font-medium flex items-center"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              แก้ไข
            </button>
            <button 
              @click="confirmDelete(slide)"
              class="text-sm text-red-400 hover:bg-red-400/10 px-3 py-1.5 rounded transition-colors font-medium flex items-center"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              ลบ
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Form -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 overflow-y-auto backdrop-blur-sm">
      <div class="bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl border border-gray-700">
        <div class="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-800/50">
            <h3 class="text-xl font-bold text-white">
                {{ editingSlide ? 'แก้ไข Slide' : 'เพิ่ม Slide ใหม่' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        
        <form @submit.prevent="saveSlide" class="p-6 space-y-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Left Column: Image Management -->
                <div class="space-y-4">
                    <label class="block text-sm font-medium text-gray-300 mb-1">รูปภาพ (Image)</label>
                    
                    <!-- Tabs -->
                    <div class="flex border-b border-gray-700 mb-4">
                        <button 
                            type="button" 
                            @click="uploadMode = 'upload'"
                            class="px-4 py-2 text-sm font-medium border-b-2 transition-colors focus:outline-none"
                            :class="uploadMode === 'upload' ? 'border-isuzu-red text-isuzu-red' : 'border-transparent text-gray-400 hover:text-white'"
                        >
                            อัปโหลดรูป
                        </button>
                        <button 
                            type="button" 
                            @click="uploadMode = 'direct'"
                            class="px-4 py-2 text-sm font-medium border-b-2 transition-colors focus:outline-none"
                            :class="uploadMode === 'direct' ? 'border-isuzu-red text-isuzu-red' : 'border-transparent text-gray-400 hover:text-white'"
                        >
                            Direct Link
                        </button>
                    </div>

                    <!-- Upload Input -->
                    <div v-if="uploadMode === 'upload'" class="space-y-4">
                         <div 
                            class="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-isuzu-red hover:bg-gray-700/50 transition-colors cursor-pointer relative"
                            @dragover.prevent
                            @drop.prevent="handleDrop"
                         >
                            <input 
                                type="file" 
                                ref="fileInput" 
                                @change="onFileChange" 
                                accept="image/*" 
                                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            >
                            <div v-if="!imagePreview && !cropperImage" class="space-y-2 pointer-events-none">
                                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <div class="flex text-sm text-gray-400 justify-center">
                                    <span class="relative cursor-pointer rounded-md font-medium text-isuzu-red hover:text-red-400">อัปโหลดไฟล์</span>
                                    <p class="pl-1">หรือลากวางที่นี่</p>
                                </div>
                                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                            </div>
                            <div v-else class="relative pointer-events-none">
                                <p class="text-sm text-green-400">เลือกไฟล์แล้ว คลิกเพื่อเปลี่ยน</p>
                            </div>
                         </div>
                    </div>

                    <!-- Direct URL Input -->
                    <div v-else class="space-y-2">
                         <input v-model="form.direct_url" type="text" placeholder="https://example.com/image.jpg" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-isuzu-red focus:outline-none placeholder-gray-500">
                         <p class="text-xs text-gray-500">ใส่ URL ของรูปภาพโดยตรง (เหมาะสำหรับลดการใช้ Storage)</p>
                    </div>

                    <!-- Cropper / Preview Area -->
                    <div v-if="cropperImage && uploadMode === 'upload'" class="mt-4">
                        <div class="h-64 bg-black rounded-lg overflow-hidden border border-gray-700 relative">
                             <img ref="cropperImg" :src="cropperImage" class="max-w-full h-auto block" />
                        </div>
                        <div class="flex justify-between items-center mt-2 text-xs text-gray-400">
                            <span>* ลากกรอบเพื่อจัดองค์ประกอบภาพ (อัตราส่วน 16:9 องคับ)</span>
                        </div>
                    </div>
                    
                    <!-- Final Preview -->
                    <div v-if="(form.image_url || form.direct_url) && !cropperImage" class="mt-4">
                        <p class="text-sm text-gray-300 mb-2">ตัวอย่างรูปภาพที่แสดงผล:</p>
                        <div class="aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-600 relative">
                             <img :src="finalImagePreview" class="w-full h-full object-cover" />
                        </div>
                    </div>

                </div>

                <!-- Right Column: Details -->
                <div class="space-y-4">
                     <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1">หัวข้อ (Title)</label>
                        <input v-model="form.title" type="text" required class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-isuzu-red focus:outline-none">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1">คำอธิบาย (Description)</label>
                        <textarea v-model="form.description" rows="3" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-isuzu-red focus:outline-none"></textarea>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-1">ข้อความปุ่ม</label>
                            <input v-model="form.button_text" type="text" placeholder="ดูรายละเอียด" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-isuzu-red focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-1">ลิงก์ปุ่ม</label>
                            <input v-model="form.button_link" type="text" placeholder="#link" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-isuzu-red focus:outline-none">
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1">ลำดับแสดงผล</label>
                        <input v-model.number="form.display_order" type="number" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-isuzu-red focus:outline-none">
                    </div>

                    <div class="flex items-center pt-2">
                        <label class="flex items-center cursor-pointer">
                            <input v-model="form.is_active" type="checkbox" class="w-5 h-5 text-isuzu-red rounded bg-gray-700 border-gray-600 focus:ring-isuzu-red">
                            <span class="ml-2 text-gray-300">แสดงผลทันที</span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="pt-6 flex justify-end gap-3 border-t border-gray-700">
                <button type="button" @click="closeModal" class="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">ยกเลิก</button>
                <button type="submit" class="bg-isuzu-red hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center shadow-lg shadow-isuzu-red/20" :disabled="saving">
                    <svg v-if="saving" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ saving ? 'กำลังบันทึก...' : 'บันทึกข้อมูล' }}
                </button>
            </div>
        </form>
      </div>
    </div>
    <!-- Delete Confirmation Modal -->
    <DeleteConfirmModal 
      :isOpen="showDeleteModal"
      :itemName="slideToDelete ? slideToDelete.title : ''"
      @close="closeDeleteModal"
      @confirmed="executeDelete"
    />

  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';
import { supabase } from '../../lib/supabase';
import { toast } from '../../lib/toast';
import Cropper from 'cropperjs';
import DeleteConfirmModal from './DeleteConfirmModal.vue';

// State
const slides = ref([]);
const loading = ref(true);
const showModal = ref(false);
const saving = ref(false);
const editingSlide = ref(null);
const uploadMode = ref('upload'); // 'upload' or 'direct'
const cropperImage = ref(null);
const cropper = ref(null);
const cropperImg = ref(null);
const fileInput = ref(null);

// Delete State
const showDeleteModal = ref(false);
const slideToDelete = ref(null);

const form = ref({
  title: '',
  description: '',
  image_url: '',
  direct_url: '',
  storage_path: '',
  button_text: '',
  button_link: '',
  display_order: 0,
  is_active: true
});

const finalImagePreview = computed(() => {
    return uploadMode.value === 'direct' ? form.value.direct_url : form.value.image_url;
});

// Fetch Data
const fetchSlides = async () => {
    loading.value = true;
    try {
        const { data, error } = await supabase
            .from('slides')
            .select('*')
            .order('display_order', { ascending: true });
            
        if (error) throw error;
        // Logic to prefer direct_url if exists, else image_url
        slides.value = (data || []).map(s => ({
            ...s,
            image_url: s.direct_url || s.image_url // Display Direct URL if set, otherwise Storage URL
        }));
    } catch (error) {
        toast.error('ไม่สามารถโหลดข้อมูลสไลด์ได้: ' + error.message);
    } finally {
        loading.value = false;
    }
};

// Actions
const openModal = (slide = null) => {
    cropperImage.value = null;
    if (cropper.value) {
        cropper.value.destroy();
        cropper.value = null;
    }
    
    if (slide) {
        editingSlide.value = slide;
        form.value = { ...slide };
        uploadMode.value = slide.direct_url ? 'direct' : 'upload';
    } else {
        editingSlide.value = null;
        uploadMode.value = 'upload';
        form.value = {
            title: '',
            description: '',
            image_url: '',
            direct_url: '',
            storage_path: '',
            button_text: 'ดูรายละเอียด',
            button_link: '#',
            display_order: slides.value.length + 1,
            is_active: true
        };
    }
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    editingSlide.value = null;
    cropperImage.value = null;
    if (cropper.value) {
        cropper.value.destroy();
        cropper.value = null;
    }
    saving.value = false; // Reset saving state just in case
};

// File & Cropper Handlers
const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        startCropper(file);
    }
};

const handleDrop = (e) => {
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        startCropper(file);
    }
};

const startCropper = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        cropperImage.value = e.target.result;
        nextTick(() => {
            if (cropper.value) cropper.value.destroy();
            cropper.value = new Cropper(cropperImg.value, {
                aspectRatio: 16 / 9,
                viewMode: 2,
                autoCropArea: 1,
            });
        });
    };
    reader.readAsDataURL(file);
};

const uploadCroppedImage = async () => {
    if (!cropper.value) return null;

    return new Promise((resolve, reject) => {
        cropper.value.getCroppedCanvas({
            width: 1280, // Reasonable max width for web
            height: 720,
        }).toBlob(async (blob) => {
            if (!blob) {
                reject(new Error('Canvas is empty'));
                return;
            }

            try {
                const fileName = `slide_${Date.now()}.jpg`;
                const { data, error } = await supabase.storage
                    .from('slides')
                    .upload(`${fileName}`, blob, {
                        contentType: 'image/jpeg',
                        upsert: true
                    });

                if (error) throw error;

                // Get Public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('slides')
                    .getPublicUrl(fileName);

                resolve({ publicUrl, path: fileName });
            } catch (err) {
                reject(err);
            }
        }, 'image/jpeg', 0.85); // Quality 0.85
    });
};

const saveSlide = async () => {
    if (saving.value) return; // Prevent double submit
    saving.value = true;
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        let finalImageUrl = form.value.image_url;
        let storagePath = form.value.storage_path;
        let directUrl = form.value.direct_url;

        // Handle Image Upload if active
        if (uploadMode.value === 'upload' && cropperImage.value) {
             const result = await uploadCroppedImage();
             finalImageUrl = result.publicUrl;
             storagePath = result.path;
             directUrl = null; // Clear direct_url if uploading
        } else if (uploadMode.value === 'direct') {
             // Use direct URL provided
             finalImageUrl = directUrl; // Fallback display
             storagePath = null;
        }

        const payload = {
            title: form.value.title,
            description: form.value.description,
            button_text: form.value.button_text,
            button_link: form.value.button_link,
            display_order: form.value.display_order,
            is_active: form.value.is_active,
            direct_url: directUrl, // Save Direct URL
            image_url: finalImageUrl, // Save Standard URL (or direct url as fallback)
            storage_path: storagePath
        };

        if (editingSlide.value) {
            // Update
            const { error } = await supabase
                .from('slides')
                .update(payload)
                .eq('id', editingSlide.value.id);
            if (error) throw error;
        } else {
            // Insert
            const { error } = await supabase
                .from('slides')
                .insert([payload]);
            if (error) throw error;
        }
        
        toast.success('บันทึก Slide เรียบร้อยแล้ว');
        await fetchSlides();
        closeModal();
    } catch (error) {
        toast.error('เกิดข้อผิดพลาดในการบันทึก: ' + error.message);
    } finally {
        saving.value = false;
    }
};

const toggleStatus = async (slide) => {
    // Note: Toggle often doesn't need confirmation but maybe spinner? 
    // For now simple alert on error. Double submit check might be overkill for toggle unless user spams.
    try {
        const { error } = await supabase
            .from('slides')
            .update({ is_active: !slide.is_active })
            .eq('id', slide.id);
        
        if (error) throw error;
        await fetchSlides();
        toast.success('อัปเดตสถานะเรียบร้อยแล้ว');
    } catch (error) {
        toast.error('อัปเดตสถานะไม่สำเร็จ: ' + error.message);
    }
};

const confirmDelete = (slide) => {
    slideToDelete.value = slide;
    showDeleteModal.value = true;
};

const closeDeleteModal = () => {
    showDeleteModal.value = false;
    slideToDelete.value = null;
};

const executeDelete = async () => {
    if (!slideToDelete.value) return;
    
    // We can show a loading state on the button or global.
    // The Modal handles verification loading. Here we do the delete.
    try {
        const slide = slideToDelete.value;
        // Option: Delete image from storage if exists
        if (slide.storage_path) {
             await supabase.storage.from('slides').remove([slide.storage_path]);
        }

        const { error } = await supabase
            .from('slides')
            .delete()
            .eq('id', slide.id);
            
        if (error) throw error;
        toast.success('ลบ Slide เรียบร้อยแล้ว');
        await fetchSlides();
    } catch (error) {
        toast.error('ลบไม่สำเร็จ: ' + error.message);
    }
};

onMounted(() => {
    fetchSlides();
});
</script>


