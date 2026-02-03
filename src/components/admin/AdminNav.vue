<template>
  <div class="bg-gray-800/50 rounded-2xl p-4 border border-gray-700 sticky top-24">
    <div class="mb-6 px-4">
      <h2 class="text-isuzu-red font-black text-xl tracking-tighter">ADMIN PANEL</h2>
      <p class="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1">Management System</p>
    </div>

    <nav class="space-y-2">
      <a 
        v-for="item in navItems" 
        :key="item.href"
        :href="item.href"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium group"
        :class="currentPath === item.href ? 'bg-isuzu-red text-white shadow-lg shadow-isuzu-red/20' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'"
      >
        <span class="p-2 rounded-lg" :class="currentPath === item.href ? 'bg-white/10' : 'bg-gray-900 group-hover:bg-gray-800'">
            <component :is="item.icon" class="w-5 h-5" />
        </span>
        {{ item.name }}
      </a>
    </nav>

    <div class="mt-8 pt-6 border-t border-gray-700/50">
        <button 
            @click="logout"
            class="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-medium border border-transparent hover:border-red-500/20"
        >
            <span class="p-2 bg-red-500/10 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </span>
            ลงชื่อออก
        </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue';
import { supabase, signOutAndClearStorage } from '../../lib/supabase';

const currentPath = ref('');

const SlidesIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' })]);
const CarsIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z' }), h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0' })]);
const PromoIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7' })]);

const navItems = [
    { name: 'จัดการสไลด์', href: '/admin/dashboard', icon: SlidesIcon },
    { name: 'จัดการรถยนต์', href: '/admin/vehicles', icon: CarsIcon },
    { name: 'จัดการโปรโมชั่น', href: '/admin/promotions', icon: PromoIcon },
];

onMounted(() => {
  currentPath.value = window.location.pathname;
});

const logout = async () => {
  await signOutAndClearStorage();
  window.location.href = '/admin/login';
};
</script>
