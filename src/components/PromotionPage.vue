<template>
  <div class="space-y-12">
    <!-- Search and Controls -->
    <div class="flex flex-col md:flex-row gap-6 items-center justify-between bg-gray-800/30 p-6 rounded-3xl border border-gray-800 backdrop-blur-sm">
        <div class="relative w-full md:max-w-md">
            <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="ค้นหาโปรโมชั่น..." 
                class="w-full bg-gray-900 border border-gray-700 rounded-2xl px-12 py-4 text-white placeholder-gray-500 focus:border-isuzu-red outline-none transition-all"
            />
            <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
        
        <div class="text-sm text-gray-400 font-bold uppercase tracking-widest">
            ผลการค้นหา: <span class="text-isuzu-red">{{ filteredPromotions.length }}</span> รายการ
        </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-32 space-y-4">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-isuzu-red/20 border-t-isuzu-red"></div>
        <span class="text-gray-500 font-bold uppercase tracking-[0.3em] text-xs">กำลังโหลดโปรโมชั่น...</span>
    </div>

    <!-- No Content State -->
    <div v-else-if="filteredPromotions.length === 0" class="text-center py-32 bg-gray-800/20 rounded-[3rem] border border-gray-800 border-dashed">
        <div class="mb-6 opacity-20">
            <svg class="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <p class="text-gray-400 text-2xl font-light">ขออภัย ไม่พบโปรโมชั่นที่คุณต้องการ...</p>
        <button @click="searchQuery = ''" class="mt-8 text-isuzu-red font-bold hover:underline">แสดงโปรโมชั่นทั้งหมด</button>
    </div>

    <!-- Content Grid -->
    <div v-else>
        <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
            <PromotionCard 
                v-for="promo in paginatedPromotions" 
                :key="promo.id" 
                :promotion="promo"
                @select="selectedPromo = $event"
            />
        </div>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="mt-20 flex justify-center items-center gap-4">
            <button 
                @click="currentPage--" 
                :disabled="currentPage === 1"
                class="p-4 rounded-2xl bg-gray-800 border border-gray-700 disabled:opacity-20 hover:border-isuzu-red transition-all group"
            >
                <svg class="w-5 h-5 text-white transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            
            <div class="flex gap-2">
                <button 
                    v-for="page in totalPages" 
                    :key="page"
                    @click="currentPage = page"
                    class="w-12 h-12 rounded-xl text-sm font-black transition-all border"
                    :class="currentPage === page 
                        ? 'bg-isuzu-red border-isuzu-red text-white shadow-lg shadow-isuzu-red/20' 
                        : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'"
                >
                    {{ page }}
                </button>
            </div>

            <button 
                @click="currentPage++" 
                :disabled="currentPage === totalPages"
                class="p-4 rounded-2xl bg-gray-800 border border-gray-700 disabled:opacity-20 hover:border-isuzu-red transition-all group"
            >
                <svg class="w-5 h-5 text-white transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>

        <PromotionModal 
            v-if="selectedPromo"
            :promotion="selectedPromo"
            @close="selectedPromo = null"
        />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { supabase } from '../lib/supabase';
import PromotionCard from './PromotionCard.vue';
import PromotionModal from './PromotionModal.vue';

const promotions = ref([]);
const loading = ref(true);
const selectedPromo = ref(null);

// Search and Pagination State
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

const fetchPromotions = async () => {
    loading.value = true;
    try {
        const { data, error } = await supabase
            .from('promotions')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false });
        
        if (!error) promotions.value = data;
    } finally {
        loading.value = false;
    }
};

onMounted(fetchPromotions);

// Filtering Logic
const filteredPromotions = computed(() => {
    if (!searchQuery.value) return promotions.value;
    const query = searchQuery.value.toLowerCase();
    return promotions.value.filter(promo => 
        promo.title.toLowerCase().includes(query) || 
        (promo.description && promo.description.toLowerCase().includes(query))
    );
});

// Pagination Logic
const totalPages = computed(() => Math.ceil(filteredPromotions.value.length / itemsPerPage));

const paginatedPromotions = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredPromotions.value.slice(start, start + itemsPerPage);
});

// Reset to first page on search
watch(searchQuery, () => {
    currentPage.value = 1;
});

// Smooth scroll to top when page changes
watch(currentPage, () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
</script>
