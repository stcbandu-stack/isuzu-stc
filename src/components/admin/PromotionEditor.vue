<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
    <div class="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-700 overflow-hidden flex flex-col max-h-[90vh]">
      
      <!-- Header -->
      <div class="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-800/50 sticky top-0 z-10">
        <h2 class="text-2xl font-bold text-white flex items-center gap-3">
            <span class="p-2 bg-isuzu-red/10 rounded-lg text-isuzu-red">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
            </span>
            {{ isEditing ? 'แก้ไขโปรโมชั่น' : 'เพิ่มโปรโมชั่นใหม่' }}
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-white transition-colors">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6 overflow-y-auto">
        <form @submit.prevent="savePromotion" class="space-y-6">
            <!-- Title -->
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">หัวข้อโปรโมชั่น</label>
              <input 
                v-model="form.title" 
                type="text" 
                required
                class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-isuzu-red focus:ring-1 focus:ring-isuzu-red outline-none transition-all"
                placeholder="เช่น โปรแรงประจำเดือน..."
              >
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">รายละเอียดแบบเต็ม</label>
              <textarea 
                v-model="form.description" 
                rows="6"
                required
                class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-isuzu-red focus:ring-1 focus:ring-isuzu-red outline-none transition-all resize-none"
                placeholder="กรอกรายละเอียดโปรโมชั่นของคุณที่นี่..."
              ></textarea>
            </div>

            <!-- URLs Row -->
            <div class="grid grid-cols-1 gap-6">
                <!-- Image URL & Upload -->
                <div>
                    <label class="block text-sm font-medium text-gray-400 mb-2">รูปภาพโปรโมชั่น (สัดส่วนที่แนะนำ 4:5)</label>
                    <div class="flex gap-4">
                        <div class="flex-1 relative">
                            <input 
                                v-model="form.image_url" 
                                type="text" 
                                class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:border-isuzu-red outline-none"
                                placeholder="ใส่ URL ของรูปภาพ..."
                            >
                        </div>
                        <label class="flex-shrink-0 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg cursor-pointer transition-colors flex items-center gap-2 border border-gray-600">
                            <span v-if="uploading" class="animate-spin h-4 w-4 border-b-2 border-white rounded-full"></span>
                            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            {{ uploading ? 'กำลังอัปโหลด...' : 'อัปโหลด' }}
                            <input type="file" class="hidden" accept="image/*" @change="handleFileUpload">
                        </label>
                    </div>
                </div>

                <!-- Direct Link -->
                <div>
                   <label class="block text-sm font-medium text-gray-400 mb-2">ปุ่มลัดไปยังเว็บไซต์อื่น (Optional)</label>
                   <input 
                      v-model="form.direct_url" 
                      type="url" 
                      class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:border-isuzu-red outline-none"
                      placeholder="เช่น https://www.isuzu-tis.com/promotions"
                   >
                </div>

                <!-- Gallery Images JSONB -->
                <div>
                   <label class="block text-sm font-medium text-gray-400 mb-2">
                     รูปภาพเพิ่มเติม (Gallery) - JSONB Array
                   </label>
                   <textarea 
                      v-model="galleryInput" 
                      rows="4"
                      class="w-full bg-gray-900 border rounded-lg px-4 py-3 text-white text-sm font-mono focus:border-isuzu-red outline-none resize-none"
                      :class="galleryError ? 'border-red-500' : 'border-gray-700'"
                      placeholder='["https://example.com/image1.jpg", "https://example.com/image2.jpg"]'
                      @input="validateGalleryInput"
                   ></textarea>
                   <div v-if="galleryError" class="mt-2 text-red-400 text-xs flex items-center gap-1">
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                     {{ galleryError }}
                   </div>
                   <div v-else-if="galleryInput && parsedGalleryCount > 0" class="mt-2 text-green-400 text-xs flex items-center gap-1">
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                     รูปแบบถูกต้อง ({{ parsedGalleryCount }} รูป)
                   </div>
                   
                   <!-- Example Format -->
                   <div class="mt-3 p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
                     <p class="text-xs text-gray-500 mb-2">📝 ตัวอย่างรูปแบบที่ถูกต้อง:</p>
                     <code class="text-xs text-gray-400 block whitespace-pre-wrap break-all">["https://example.com/img1.jpg", "https://example.com/img2.jpg"]</code>
                     <p class="text-xs text-gray-500 mt-2">💡 หมายเหตุ: ใส่ URL รูปภาพในรูปแบบ JSON Array สัดส่วนที่แนะนำ 5:4 (แนวนอน)</p>
                   </div>
                   
                   <!-- Gallery Preview -->
                   <div v-if="parsedGallery.length > 0" class="mt-4">
                     <label class="block text-sm font-medium text-gray-400 mb-2">ตัวอย่าง Gallery ({{ parsedGallery.length }} รูป)</label>
                     <div class="grid grid-cols-4 gap-2">
                       <div v-for="(url, idx) in parsedGallery.slice(0, 8)" :key="idx" class="aspect-[5/4] rounded-lg overflow-hidden border border-gray-700 bg-gray-900">
                         <img :src="url" class="w-full h-full object-cover" @error="(e) => e.target.src = 'https://placehold.co/500x400/333/666?text=Error'">
                       </div>
                       <div v-if="parsedGallery.length > 8" class="aspect-[5/4] rounded-lg overflow-hidden border border-gray-700 bg-gray-900 flex items-center justify-center">
                         <span class="text-gray-500 text-sm">+{{ parsedGallery.length - 8 }} รูป</span>
                       </div>
                     </div>
                   </div>
                </div>
            </div>

            <!-- Preview 4:5 -->
            <div v-if="form.image_url" class="mt-4">
                <label class="block text-sm font-medium text-gray-400 mb-2">ตัวอย่างรูปภาพ (สัดส่วน 4:5)</label>
                <div class="w-32 aspect-[4/5] rounded-lg overflow-hidden border border-gray-700 bg-gray-900">
                    <img :src="form.image_url" class="w-full h-full object-cover">
                </div>
            </div>
        </form>
      </div>

      <!-- Footer -->
      <div class="p-6 border-t border-gray-700 flex justify-end gap-4 bg-gray-800/50 sticky bottom-0">
        <button 
            @click="$emit('close')" 
            class="px-6 py-2.5 bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white rounded-lg transition-colors font-medium border border-gray-600"
            :disabled="saving"
        >
            ยกเลิก
        </button>
        <button 
            @click="savePromotion"
            class="px-8 py-2.5 bg-isuzu-red hover:bg-red-700 text-white rounded-lg transition-all font-medium flex items-center justify-center gap-2 shadow-lg shadow-isuzu-red/20 disabled:opacity-50"
            :disabled="saving"
        >
            <span v-if="saving" class="animate-spin h-4 w-4 border-b-2 border-white rounded-full"></span>
            {{ saving ? 'กำลังบันทึก...' : 'บันทึกข้อมูล' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { supabase } from '../../lib/supabase';
import { toast } from '../../lib/toast';

const props = defineProps({
  promotion: Object
});

const emit = defineEmits(['close', 'saved']);

const isEditing = computed(() => !!props.promotion);
const saving = ref(false);
const uploading = ref(false);

// Gallery JSONB
const galleryInput = ref('');
const galleryError = ref('');
const parsedGallery = ref([]);
const parsedGalleryCount = computed(() => parsedGallery.value.length);

const validateGalleryInput = () => {
  galleryError.value = '';
  parsedGallery.value = [];
  
  if (!galleryInput.value.trim()) {
    return true;
  }
  
  try {
    const parsed = JSON.parse(galleryInput.value);
    
    if (!Array.isArray(parsed)) {
      galleryError.value = 'ข้อมูลต้องอยู่ในรูปแบบ Array เท่านั้น เช่น ["url1", "url2"]';
      return false;
    }
    
    for (let i = 0; i < parsed.length; i++) {
      if (typeof parsed[i] !== 'string') {
        galleryError.value = `รายการที่ ${i + 1} ต้องเป็น string (URL)`;
        return false;
      }
      
      // Basic URL validation
      if (!parsed[i].startsWith('http://') && !parsed[i].startsWith('https://')) {
        galleryError.value = `รายการที่ ${i + 1} ต้องเป็น URL ที่ขึ้นต้นด้วย http:// หรือ https://`;
        return false;
      }
    }
    
    parsedGallery.value = parsed;
    return true;
  } catch (e) {
    galleryError.value = 'รูปแบบ JSON ไม่ถูกต้อง: ' + e.message;
    return false;
  }
};

const form = ref({
    title: '',
    description: '',
    image_url: '',
    direct_url: '',
    gallery_images: [],
    is_active: true
});

// Initialize
watch(() => props.promotion, (newVal) => {
    if (newVal) {
        form.value = { ...newVal };
        // Initialize gallery input from existing data
        if (newVal.gallery_images && Array.isArray(newVal.gallery_images)) {
          galleryInput.value = JSON.stringify(newVal.gallery_images, null, 2);
          parsedGallery.value = newVal.gallery_images;
        } else {
          galleryInput.value = '';
          parsedGallery.value = [];
        }
    } else {
        form.value = {
            title: '',
            description: '',
            image_url: '',
            direct_url: '',
            gallery_images: [],
            is_active: true
        };
        galleryInput.value = '';
        parsedGallery.value = [];
    }
    galleryError.value = '';
}, { immediate: true });

const savePromotion = async () => {
    if (saving.value) return;
    
    // Validate gallery input before saving
    if (galleryInput.value.trim() && !validateGalleryInput()) {
      toast.error('กรุณาแก้ไขรูปแบบ Gallery Images ให้ถูกต้อง');
      return;
    }
    
    saving.value = true;
    
    try {
        // Prepare form data with parsed gallery
        const submitData = {
          ...form.value,
          gallery_images: parsedGallery.value
        };
        
        if (isEditing.value) {
            const { error } = await supabase.from('promotions').update(submitData).eq('id', props.promotion.id);
            if (error) throw error;
        } else {
            const { error } = await supabase.from('promotions').insert([submitData]);
            if (error) throw error;
        }
        
        toast.success('บันทึกโปรโมชั่นเรียบร้อยแล้ว');
        emit('saved');
        emit('close'); 
    } catch (err) {
        toast.error('เกิดข้อผิดพลาดในการบันทึก: ' + err.message);
    } finally {
        saving.value = false;
    }
};

const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    uploading.value = true;
    try {
        const fileName = `promo_${Date.now()}_${file.name}`;
        const { data, error } = await supabase.storage.from('slides').upload(fileName, file); 
        
        if (error) throw error;
        
        const { data: { publicUrl } } = supabase.storage.from('slides').getPublicUrl(fileName);
        form.value.image_url = publicUrl;
        toast.success('อัปโหลดรูปภาพเสร็จสิ้น');
    } catch (err) {
        toast.error('การอัปโหลดล้มเหลว: ' + err.message);
    } finally {
        uploading.value = false;
    }
};
</script>
