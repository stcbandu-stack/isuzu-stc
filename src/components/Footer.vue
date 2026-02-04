<template>
  <footer class="bg-gray-900 border-t border-gray-800 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
        <!-- Brand Column (3 cols) -->
        <div class="lg:col-span-3 space-y-6">
          <div class="flex items-center">
            <img 
              src="/STC-LOGO-RGB.svg" 
              alt="ISUZU STC" 
              class="h-10 w-auto cursor-pointer select-none" 
              @click="onLogoClick"
              @touchstart="onLogoTouchStart"
              @touchend="onLogoTouchEnd"
              @touchcancel="onLogoTouchEnd"
            />
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            อีซูซุสงวนไทยเชียงราย ตัวแทนจำหน่ายรถยนต์อีซูซุมาตรฐานครบวงจร พร้อมศูนย์บริการและอะไหล่แท้ มุ่งมั่นให้บริการด้วยใจเพื่อความพึงพอใจสูงสุดของคุณ
          </p>
          
          <!-- Line OA Section -->
          <div class="pt-4 border-t border-gray-800/50">
            <h4 class="text-white font-semibold text-sm mb-3">มาเป็นเพื่อนกับเรา</h4>
            <div class="flex items-center space-x-4 bg-gray-800/30 p-3 rounded-xl border border-gray-800">
              <img src="/line-oa.svg" alt="Line OA @STCCR" class="h-16 w-16 rounded-lg bg-white p-1" />
              <div>
                <p class="text-isuzu-red font-bold text-lg">@STCCR</p>
                <p class="text-gray-400 text-xs">สแกนเพื่อรับข่าวสารและโปรโมชั่น</p>
              </div>
            </div>
          </div>

          <div class="flex space-x-4">
            <a href="https://www.facebook.com/isuzustc/" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-[#1877F2] transition-colors">
              <span class="sr-only">Facebook</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"/></svg>
            </a>
            <a href="https://www.youtube.com/@STCCR" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-[#FF0000] transition-colors">
              <span class="sr-only">YouTube</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://line.me/R/ti/p/@STCCR" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-[#06C755] transition-colors">
              <span class="sr-only">Line</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.038 1.087l-.164 1.022c-.049.307-.238 1.201 1.027.655 1.265-.546 6.829-4.02 9.317-6.887 1.748-1.921 2.689-3.945 2.689-6.097zm-18.156 3.235c-.172 0-.312-.14-.312-.312v-3.792c0-.172.14-.312.312-.312h.156c.172 0 .312.14.312.312v3.324h1.844c.172 0 .312.14.312.312v.156c0 .172-.14.312-.312.312h-2.312zm3.375 0c-.172 0-.312-.14-.312-.312v-3.792c0-.172.14-.312.312-.312h.156c.172 0 .312.14.312.312v3.792c0 .172-.14.312-.312.312h-.156zm6.188 0c0 .15-.098.282-.244.312-.023.003-.047.006-.071.006-.118 0-.223-.067-.272-.171l-2.003-2.802v2.655c0 .172-.14.312-.312.312h-.156c-.172 0-.312-.14-.312-.312v-3.792c0-.15.098-.282.244-.312.023-.003.047-.006.071-.006.118 0 .223.067.272.171l2.003 2.802v-2.655c0-.172.14-.312.312-.312h.156c.172 0 .312.14.312.312v3.792zm4.148-2.094c0 .172-.14.312-.312.312h-1.844v.938h1.844c.172 0 .312.14.312.312v.156c0 .172-.14.312-.312.312h-2.312c-.172 0-.312-.14-.312-.312v-3.792c0-.172.14-.312.312-.312h2.312c.172 0 .312.14.312.312v.156c0 .172-.14.312-.312.312h-1.844v.938h1.844c.172 0 .312.14.312.312v.156z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links (2 cols) -->
        <div class="lg:col-span-2">
          <h3 class="text-white font-bold text-lg mb-6">เมนูลัด</h3>
          <ul class="space-y-4">
            <li><a href="/" class="text-gray-400 hover:text-white transition-colors">หน้าหลัก</a></li>
            <li><a href="/trucks" class="text-gray-400 hover:text-white transition-colors">รถบรรทุก</a></li>
            <li><a href="https://www.isuzu-tis.com/calculator" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">คำนวณค่างวด</a></li>
            <li><a href="https://www.isuzu-tis.com/compare/" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">เปรียบเทียบรุ่น</a></li>
            <li><a href="/about" class="text-gray-400 hover:text-white transition-colors">เกี่ยวกับเรา</a></li>
          </ul>
        </div>

        <!-- Branches (7 cols) -->
        <div class="lg:col-span-7">
          <h3 class="text-white font-bold text-lg mb-6">ติดต่อสาขาใกล้บ้านท่าน</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
            <!-- Branch 1: Head Office -->
            <div>
              <h4 class="text-isuzu-red font-semibold mb-2 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                สำนักงานใหญ่ อ.เมือง (บ้านดู่)
              </h4>
              <p class="text-gray-400 text-sm mb-2">222 หมู่ 2 ต.บ้านดู่ อ.เมือง จ.เชียงราย 57100</p>
              <div class="flex flex-col space-y-1 text-sm">
                <a href="tel:053-702-666" class="text-gray-400 hover:text-white transition-colors flex items-center"><svg class="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>053-702-666</a>
                <a href="tel:086-429-5060" class="text-gray-400 hover:text-white transition-colors flex items-center ml-5">086-429-5060</a>
              </div>
            </div>

            <!-- Branch 2: Phan -->
            <div>
              <h4 class="text-isuzu-red font-semibold mb-2 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                สาขาพาน
              </h4>
              <p class="text-gray-400 text-sm mb-2">227 หมู่ 17 ต.สันกลาง อ.พาน จ.เชียงราย 57120</p>
              <div class="flex flex-col space-y-1 text-sm">
                <a href="tel:053-722-999" class="text-gray-400 hover:text-white transition-colors flex items-center"><svg class="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>053-722-999</a>
                <a href="tel:086-430-1787" class="text-gray-400 hover:text-white transition-colors flex items-center ml-5">086-430-1787</a>
              </div>
            </div>

            <!-- Branch 3: Mae Sai -->
            <div>
              <h4 class="text-isuzu-red font-semibold mb-2 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                สาขาแม่สาย
              </h4>
              <p class="text-gray-400 text-sm mb-2">419 หมู่ 11 ต.ห้วยไคร้ อ.แม่สาย จ.เชียงราย 57220</p>
              <div class="flex flex-col space-y-1 text-sm">
                <a href="tel:053-667-669" class="text-gray-400 hover:text-white transition-colors flex items-center"><svg class="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>053-667-669</a>
                <a href="tel:087-305-1222" class="text-gray-400 hover:text-white transition-colors flex items-center ml-5">087-305-1222</a>
              </div>
            </div>

            <!-- Branch 4: Mae Chan -->
            <div>
              <h4 class="text-isuzu-red font-semibold mb-2 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                สาขาแม่จัน
              </h4>
              <p class="text-gray-400 text-sm mb-2">333 หมู่ 5 ต.จอมสวรรค์ อ.แม่จัน จ.เชียงราย 57110</p>
              <div class="flex flex-col space-y-1 text-sm">
                <a href="tel:053-160-999" class="text-gray-400 hover:text-white transition-colors flex items-center"><svg class="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>053-160-999</a>
                <a href="tel:081-465-7555" class="text-gray-400 hover:text-white transition-colors flex items-center ml-5">081-465-7555</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>&copy; {{ new Date().getFullYear() }} อีซูซุสงวนไทย. All rights reserved.</p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="/policy" class="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/policy" class="hover:text-white transition-colors">Terms of Service</a>
          
          <!-- Dev Links (only visible for allowed IP or manual trigger) -->
          <template v-if="isAllowedIP || showDevLinks">
            <span class="text-gray-700">|</span>
            <a href="/admin/dashboard" class="text-amber-500/70 hover:text-amber-400 transition-colors flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Admin
            </a>
            <a href="/team/dashboard" class="text-emerald-500/70 hover:text-emerald-400 transition-colors flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              Team
            </a>
          </template>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isAllowedIP = ref(false);
const showDevLinks = ref(false); // Manual trigger
const ALLOWED_IPS = ['183.89.209.66'];

// Secret trigger state
let clickCount = 0;
let clickTimer = null;
let touchTimer = null;
const CLICK_THRESHOLD = 5;
const CLICK_TIMEOUT = 2000; // 2 seconds to complete 5 clicks
const TOUCH_DURATION = 5000; // 5 seconds hold

// Logo click handler (5 clicks to reveal)
function onLogoClick() {
  clickCount++;
  
  // Reset timer on each click
  if (clickTimer) clearTimeout(clickTimer);
  
  clickTimer = setTimeout(() => {
    clickCount = 0;
  }, CLICK_TIMEOUT);
  
  // Check if threshold reached
  if (clickCount >= CLICK_THRESHOLD) {
    showDevLinks.value = true;
    clickCount = 0;
    if (clickTimer) clearTimeout(clickTimer);
  }
}

// Touch start handler (5 second hold to reveal)
function onLogoTouchStart() {
  touchTimer = setTimeout(() => {
    showDevLinks.value = true;
  }, TOUCH_DURATION);
}

// Touch end/cancel handler
function onLogoTouchEnd() {
  if (touchTimer) {
    clearTimeout(touchTimer);
    touchTimer = null;
  }
}

onMounted(async () => {
  try {
    // Check user's IP via external service
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    
    if (ALLOWED_IPS.includes(data.ip)) {
      isAllowedIP.value = true;
    }
  } catch (error) {
    console.log('IP check failed:', error);
  }
});

onUnmounted(() => {
  if (clickTimer) clearTimeout(clickTimer);
  if (touchTimer) clearTimeout(touchTimer);
});
</script>
