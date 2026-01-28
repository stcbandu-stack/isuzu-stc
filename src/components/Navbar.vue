<template>
  <nav class="bg-gradient-to-r from-isuzu-dark to-slate-900 shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <a href="/" class="flex items-center group">
            <img src="/STC-LOGO-RGB.svg" alt="ISUZU STC" class="h-10 w-auto transition-transform group-hover:scale-105" />
          </a>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-center space-x-1">
            <template v-for="item in menuItems" :key="item.name">
              <!-- Dropdown Menu Item -->
              <div v-if="item.children" class="relative group">
                <button
                  class="text-gray-300 group-hover:bg-isuzu-red group-hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1"
                >
                  {{ item.name }}
                  <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <!-- Dropdown Content -->
                <div class="absolute left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div class="pt-2">
                    <div class="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl">
                      <a
                        v-for="subItem in item.children"
                        :key="subItem.name"
                        :href="subItem.href"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="block px-4 py-3 text-sm text-gray-300 hover:bg-isuzu-red hover:text-white transition-colors border-b border-slate-700 last:border-0"
                      >
                        {{ subItem.name }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Standard Menu Item -->
              <a
                v-else
                :href="item.href"
                class="text-gray-300 hover:bg-isuzu-red hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-isuzu-red/20"
              >
                {{ item.name }}
              </a>
            </template>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="hidden md:block">
          <button
            @click="showContactModal = true"
            class="bg-isuzu-red hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-isuzu-red/40 hover:scale-105"
          >
            ติดต่อเรา
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button
            @click="isOpen = !isOpen"
            class="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                v-if="!isOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isOpen" class="md:hidden bg-slate-800/95 backdrop-blur-lg border-t border-slate-700">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <template v-for="item in menuItems" :key="item.name">
            <!-- Mobile Dropdown -->
            <div v-if="item.children" class="space-y-1">
              <div class="px-4 py-3 text-isuzu-red font-bold text-sm uppercase tracking-wider">
                {{ item.name }}
              </div>
              <a
                v-for="subItem in item.children"
                :key="subItem.name"
                :href="subItem.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-300 hover:bg-slate-700 block px-8 py-3 rounded-lg text-base font-medium transition-all duration-300"
              >
                {{ subItem.name }}
              </a>
            </div>
            
            <!-- Standard Mobile Link -->
            <a
              v-else
              :href="item.href"
              class="text-gray-300 hover:bg-isuzu-red hover:text-white block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300"
            >
              {{ item.name }}
            </a>
          </template>
          
          <button
            @click="showContactModal = true"
            class="w-full bg-isuzu-red text-white block px-4 py-3 rounded-lg text-base font-medium text-center mt-4 hover:bg-red-700 transition-colors"
          >
            ติดต่อเรา
          </button>
        </div>
      </div>
    </transition>

    <!-- Global Contact Modal -->
    <ContactModal 
      :show="showContactModal" 
      @close="showContactModal = false" 
    />
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import ContactModal from './ContactModal.vue';

const isOpen = ref(false);
const showContactModal = ref(false);

const menuItems = [
  { name: 'หน้าแรก', href: '/' },
  { name: 'รถบรรทุก', href: '/trucks' },
  { name: 'โปรโมชั่น', href: '/promotions' },
  { 
    name: 'บริการ', 
    href: '#',
    children: [
      { name: 'คำนวณค่างวด', href: 'https://www.isuzu-tis.com/calculator' },
      { name: 'เปรียบเทียบรุ่น', href: 'https://www.isuzu-tis.com/compare/' }
    ]
  },
  { name: 'เกี่ยวกับเรา', href: '/about' },
];
</script>
