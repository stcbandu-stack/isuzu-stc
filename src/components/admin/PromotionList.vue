<template>
  <div>
    <!-- Header Actions -->
    <div class="flex justify-between items-center mb-6">
        <div class="relative w-64">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="ค้นหาโปรโมชั่น..." 
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
          เพิ่มโปรโมชั่น
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
                    <th class="px-6 py-4">หัวข้อ</th>
                    <th class="px-6 py-4">สถานะ</th>
                    <th class="px-6 py-4 text-right">จัดการ</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
                <tr v-for="promo in filteredPromotions" :key="promo.id" class="hover:bg-gray-700/50 transition-colors">
                    <td class="px-6 py-4">
                        <div class="w-12 h-15 bg-gray-900 rounded border border-gray-600 overflow-hidden flex items-center justify-center">
                            <img v-if="promo.image_url" :src="promo.image_url" class="w-full h-full object-cover">
                            <span v-else class="text-xs text-gray-600">No Img</span>
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <p class="font-medium text-white truncate max-w-xs">{{ promo.title }}</p>
                    </td>
                    <td class="px-6 py-4">
                         <button 
                            @click="toggleStatus(promo)"
                            :class="promo.is_active ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-700 text-gray-400 border-gray-600'"
                            class="px-3 py-1 rounded-full text-xs font-medium border"
                         >
                            {{ promo.is_active ? 'แสดงผล' : 'ปิดการแสดง' }}
                         </button>
                    </td>
                    <td class="px-6 py-4 text-right space-x-2">
                        <button 
                            @click="openEditor(promo)"
                            class="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            แก้ไข
                        </button>
                        <button 
                            @click="initiateDelete(promo)"
                            class="text-red-400 hover:text-red-300 transition-colors"
                        >
                            ลบ
                        </button>
                    </td>
                </tr>
                <tr v-if="filteredPromotions.length === 0">
                    <td colspan="4" class="px-6 py-8 text-center text-gray-500">
                        ไม่พบข้อมูลโปรโมชั่น
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Promotion Editor Modal -->
    <PromotionEditor 
      v-if="showEditor" 
      :promotion="selectedPromotion" 
      @close="closeEditor"
      @saved="fetchPromotions"
    />

    <!-- Delete Modal -->
    <DeleteConfirmModal 
      :isOpen="showDeleteModal"
      :itemName="promotionToDelete?.title || ''"
      @close="closeDeleteModal"
      @confirmed="executeDelete"
    />

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { supabase } from '../../lib/supabase';
import { toast } from '../../lib/toast';
import PromotionEditor from './PromotionEditor.vue';
import DeleteConfirmModal from './DeleteConfirmModal.vue';

const promotions = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const showEditor = ref(false);
const selectedPromotion = ref(null);

// Delete State
const showDeleteModal = ref(false);
const promotionToDelete = ref(null);

const fetchPromotions = async () => {
  loading.value = true;
  try {
    const { data, error } = await supabase
        .from('promotions')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (error) throw error;
    promotions.value = data || [];
  } catch (err) {
    toast.error('ไม่สามารถโหลดข้อมูลโปรโมชั่นได้: ' + err.message);
  } finally {
    loading.value = false;
  }
};

const filteredPromotions = computed(() => {
    if (!searchQuery.value) return promotions.value;
    const query = searchQuery.value.toLowerCase();
    return promotions.value.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.description?.toLowerCase().includes(query)
    );
});

const toggleStatus = async (promo) => {
    try {
        const { error } = await supabase
            .from('promotions')
            .update({ is_active: !promo.is_active })
            .eq('id', promo.id);
        
        if (error) throw error;
        await fetchPromotions();
        toast.success('อัปเดตสถานะโปรโมชั่นเรียบร้อยแล้ว');
    } catch (error) {
        toast.error('อัปเดตสถานะไม่สำเร็จ: ' + error.message);
    }
};

const openEditor = (promo = null) => {
    selectedPromotion.value = promo;
    showEditor.value = true;
};

const closeEditor = () => {
    showEditor.value = false;
    selectedPromotion.value = null;
};

// Delete Logic
const initiateDelete = (promo) => {
    promotionToDelete.value = promo;
    showDeleteModal.value = true;
};

const closeDeleteModal = () => {
    showDeleteModal.value = false;
    promotionToDelete.value = null;
};

const executeDelete = async () => {
    if (!promotionToDelete.value) return;
    loading.value = true; 

    try {
        const { error } = await supabase.from('promotions').delete().eq('id', promotionToDelete.value.id);
        if (error) throw error;
        
        toast.success('ลบโปรโมชั่นเรียบร้อยแล้ว');
        await fetchPromotions(); 
    } catch (err) {
        toast.error('ลบไม่สำเร็จ: ' + err.message);
        loading.value = false;
    }
};

onMounted(() => {
    fetchPromotions();
});
</script>
