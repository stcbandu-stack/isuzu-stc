<template>
  <section class="py-16 bg-white overflow-hidden">
    <div class="container mx-auto px-4 lg:px-8">
      <!-- Section Title -->
      <div class="mb-12 text-center md:text-left">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 uppercase tracking-wider">
          บริการของเรา <span class="text-isuzu-red">/ Our Services</span>
        </h2>
        <div class="w-24 h-1 bg-isuzu-red mx-auto md:mx-0"></div>
      </div>

      <!-- Quick Actions Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Item 1: Test Drive -->
        <div class="group relative overflow-hidden rounded-2xl aspect-[4/5] shadow-xl transition-all duration-500 hover:-translate-y-2">
          <!-- Background Image -->
          <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style="background-image: url('https://cdn.jsdelivr.net/gh/stcbandu-stack/stcisuzu@main/4drs04.png')"
          ></div>
          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          
          <!-- Content -->
          <div class="absolute inset-0 p-8 flex flex-col justify-end text-white">
            <div class="mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
               <div class="w-12 h-12 bg-isuzu-red rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
               </div>
               <h3 class="text-2xl font-bold mb-2">ทดลองขับ</h3>
               <p class="text-gray-200 text-sm mb-4 leading-relaxed">สัมผัสประสบการณ์การขับขี่ที่เหนือชั้นกับอีซูซุรุ่นใหม่ล่าสุดด้วยตัวคุณเอง</p>
                <a 
                  href="https://forms.office.com/r/UsNjBZesdj?origin=lprLink" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="block w-full text-center bg-white text-isuzu-red font-bold py-3 px-6 rounded-lg uppercase tracking-wide hover:bg-isuzu-red hover:text-white transition-colors duration-300"
                >
                  นัดหมายทดลองขับ
                </a>
            </div>
          </div>
        </div>

        <!-- Item 2: Service Center -->
        <div class="group relative overflow-hidden rounded-2xl aspect-[4/5] shadow-xl transition-all duration-500 hover:-translate-y-2">
          <!-- Background Image -->
          <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style="background-image: url('https://cdn.jsdelivr.net/gh/stcbandu-stack/stcisuzu@main/service.jpg')"
          ></div>
          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          
          <!-- Content -->
          <div class="absolute inset-0 p-8 flex flex-col justify-end text-white">
            <div class="mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
               <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
               </div>
               <h3 class="text-2xl font-bold mb-2">นัดหมายศูนย์บริการ</h3>
               <p class="text-gray-200 text-sm mb-4 leading-relaxed">มั่นใจทุกการเดินทางด้วยบริการมาตรฐานศูนย์อีซูซุ จองคิวล่วงหน้าเพื่อความสะดวก</p>
                <a 
                  href="https://line.me/R/ti/p/@STCCR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="block w-full text-center bg-white text-blue-600 font-bold py-3 px-6 rounded-lg uppercase tracking-wide hover:bg-blue-600 hover:text-white transition-colors duration-300"
                >
                  จองคิวรับบริการ
                </a>
            </div>
          </div>
        </div>

        <!-- Item 3: Carcon Body & Paint -->
        <div class="group relative overflow-hidden rounded-2xl aspect-[4/5] shadow-xl transition-all duration-500 hover:-translate-y-2">
          <!-- Background Image -->
          <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style="background-image: url('https://cdn.jsdelivr.net/gh/stcbandu-stack/stcisuzu@main/carcon.jpg')"
          ></div>
          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          
          <!-- Content -->
          <div class="absolute inset-0 p-8 flex flex-col justify-end text-white">
            <div class="mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
               <div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
               </div>
               <h3 class="text-2xl font-bold mb-2">อู่สี Carcon</h3>
               <p class="text-gray-200 text-sm mb-4 leading-relaxed">บริการเคาะพ่นสีมาตรฐานระดับพรีเมียม ดูแลรถของคุณให้สวยงามเหมือนใหม่อยู่เสมอ</p>
                <a 
                  href="/carcon" 
                  class="block w-full text-center bg-white text-orange-600 font-bold py-3 px-6 rounded-lg uppercase tracking-wide hover:bg-orange-500 hover:text-white transition-colors duration-300"
                >
                  ดูรายละเอียด
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No extra logic needed for now as requested (empty buttons)
</script>

<style scoped>
.container {
  max-width: 1280px;
}
</style>
