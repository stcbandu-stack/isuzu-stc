<template>
  <Transition name="fade">
    <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/80 backdrop-blur-md" @click="$emit('close')"></div>
      
      <!-- Modal Content -->
      <div class="relative bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-scale-up">
        <!-- Close Button -->
        <button 
          @click="$emit('close')" 
          class="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10 p-2 hover:bg-white/10 rounded-full"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="p-8 md:p-10">
          <div class="text-center mb-10">
            <h2 class="text-3xl font-black text-white uppercase tracking-tight">
              ติดต่อ<span class="text-isuzu-red">เรา</span>
            </h2>
            <div class="w-20 h-1 bg-isuzu-red mx-auto mt-4 rounded-full"></div>
          </div>

          <!-- Social QR Codes -->
          <div class="grid grid-cols-2 gap-6 mb-12">
            <!-- Facebook -->
            <div class="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 flex flex-col items-center group hover:border-isuzu-red/30 transition-all">
              <div class="bg-white p-2 rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-300">
                <img src="/fb-qr.svg" alt="อีซูซุสงวนไทย Facebook" class="w-32 h-32 md:w-40 md:h-40" />
              </div>
              <p class="text-white font-bold text-sm">อีซูซุสงวนไทย</p>
              <p class="text-gray-400 text-xs mt-1">Facebook Page</p>
            </div>

            <!-- Line -->
            <div class="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 flex flex-col items-center group hover:border-isuzu-red/30 transition-all">
              <div class="bg-white p-2 rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-300">
                <img src="/line-oa.svg" alt="Line @STCCR" class="w-32 h-32 md:w-40 md:h-40" />
              </div>
              <p class="text-[#06C755] font-bold text-sm">@STCCR</p>
              <p class="text-gray-400 text-xs mt-1">Line Official Account</p>
            </div>
          </div>

          <!-- Branch Contacts -->
          <div class="space-y-4">
            <h3 class="text-gray-400 font-bold text-xs uppercase tracking-[0.2em] px-2">ช่องทางการติดต่อ</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div v-for="branch in branches" :key="branch.name" class="bg-slate-800/30 p-4 rounded-2xl border border-slate-700/30 flex flex-col justify-center">
                <p class="text-isuzu-red font-bold text-sm mb-2">{{ branch.name }}</p>
                <div class="flex flex-col gap-1">
                  <!-- Phone Numbers -->
                  <a 
                    v-for="phone in branch.phones" 
                    :key="phone" 
                    :href="'tel:' + phone.replace(/-/g, '')"
                    class="text-white hover:text-isuzu-red text-base font-medium transition-colors flex items-center gap-2 group"
                  >
                    <svg class="w-4 h-4 text-gray-500 group-hover:text-isuzu-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {{ phone }}
                  </a>

                  <!-- Branch Facebook -->
                  <a 
                    :href="branch.facebook" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="mt-1 text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 group"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  show: Boolean
});

defineEmits(['close']);

const branches = [
  {
    name: 'สำนักงานใหญ่ อ.เมือง (บ้านดู่)',
    phones: ['053-702-666', '086-429-5060'],
    facebook: 'https://www.facebook.com/stcbu'
  },
  {
    name: 'สาขาพาน',
    phones: ['053-722-999', '086-430-1787'],
    facebook: 'https://www.facebook.com/ISUZU.ONLINE.PHAN'
  },
  {
    name: 'สาขาแม่สาย',
    phones: ['053-667-669', '087-305-1222'],
    facebook: 'https://www.facebook.com/Isuzumaesai'
  },
  {
    name: 'สาขาแม่จัน',
    phones: ['053-160-999', '081-465-7555'],
    facebook: 'https://www.facebook.com/IsuzuMaechan'
  }
];
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes scaleUp {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
