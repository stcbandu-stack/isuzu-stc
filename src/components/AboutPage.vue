<template>
  <div class="bg-gray-900 min-h-screen text-white overflow-hidden pb-12">
    <!-- Hero Section: The Grand Entrance -->
    <section class="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <!-- Background Image/Gradient -->
        <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-gray-900 z-10"></div>
            <img src="https://images.unsplash.com/photo-1562141989-c5c79ac8f576?q=80&w=2070&auto=format&fit=crop" class="w-full h-full object-cover scale-110 animate-slow-zoom" />
        </div>

        <!-- Hero Content -->
        <div class="relative z-20 text-center px-4 max-w-5xl mx-auto">
            <div class="inline-block px-4 py-1.5 bg-isuzu-red/20 border border-isuzu-red/30 rounded-full text-isuzu-red text-xs font-black uppercase tracking-[0.3em] mb-8 animate-fade-in-up">
                30+ Years of Excellence
            </div>
            <h1 class="text-5xl md:text-8xl font-black mb-6 tracking-tighter animate-fade-in-up delay-100 uppercase">
                อีซูซุสงวนไทย<span class="text-isuzu-red">เชียงราย</span>
            </h1>
            <p class="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                ตำนานแห่งความเชื่อมั่นและบริการที่เหนือระดับ เคียงคู่ทุกความสำเร็จของชาวเชียงรายมาอย่างยาวนาน
            </p>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </div>
    </section>

    <!-- Content Sections Wrapper -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30">
        
        <!-- Story Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-center">
            <div class="space-y-8">
                <div class="space-y-4">
                    <h2 class="text-isuzu-red font-bold tracking-widest uppercase text-sm">Our Legacy</h2>
                    <h3 class="text-4xl md:text-5xl font-black leading-tight">บริษัทในเครือกลุ่ม<br/>อีซูซุสงวนไทย</h3>
                </div>
                <p class="text-gray-400 text-lg leading-relaxed">
                    กลุ่มอีซูซุสงวนไทยเปิดดำเนินธุรกิจขึ้นเมื่อปี พ.ศ. 2535 (ค.ศ. 1992) โดยดำเนินธุรกิจในด้านการจำหน่าย รถยนต์อีซูซุ ศูนย์บริการมาตรฐานอีซูซุและอะไหล่ อย่างครบวงจร เปิดให้บริการใน 9 จังหวัด 23 สาขาทั่วประเทศ 4 สาขาในเชียงราย
                </p>
                <div class="grid grid-cols-2 gap-8 pt-4">
                    <div class="border-l-2 border-isuzu-red pl-6 py-2">
                        <div class="text-3xl font-black text-white mb-1">30+</div>
                        <div class="text-gray-500 text-sm uppercase font-bold">Years Experience</div>
                    </div>
                    <div class="border-l-2 border-isuzu-red pl-6 py-2">
                        <div class="text-3xl font-black text-white mb-1">23</div>
                        <div class="text-gray-500 text-sm uppercase font-bold">Showrooms</div>
                    </div>
                </div>
            </div>
            <div class="relative group">
                <div class="absolute -inset-4 bg-isuzu-red/10 rounded-3xl blur-2xl group-hover:bg-isuzu-red/20 transition-all duration-500"></div>
                <img src="/images/network-map.png" alt="STM Network Map" class="relative rounded-2xl border border-gray-700 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" />
            </div>
        </div>

        <!-- Mission & Values -->
        <div class="bg-gray-800/50 rounded-3xl border border-gray-700 p-8 md:p-16 mb-32 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-64 h-64 bg-isuzu-red/10 blur-[100px] rounded-full -mr-32 -mt-32 transition-colors group-hover:bg-isuzu-red/20"></div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                <div class="space-y-6">
                    <div class="p-3 bg-isuzu-red/20 rounded-2xl w-fit">
                        <svg class="w-8 h-8 text-isuzu-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h4 class="text-3xl font-bold">เป้าหมายและพันธกิจ</h4>
                    <p class="text-gray-400 text-lg leading-relaxed">
                        มุ่งสู่ความเป็นเลิศในด้านการขาย และการบริการหลังการขาย เพื่อให้ลูกค้าได้รับความพึงพอใจสูงสุดอย่างยั่งยืน
                    </p>
                </div>
                <div class="space-y-6">
                    <div class="p-3 bg-isuzu-red/20 rounded-2xl w-fit">
                        <svg class="w-8 h-8 text-isuzu-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                    <h4 class="text-3xl font-bold">ความรับผิดชอบต่อสังคม</h4>
                    <p class="text-gray-400 text-lg leading-relaxed">
                        ถือมั่นในความรับผิดชอบต่อสังคม ดำเนินธุรกิจโดยคำนึงถึงหน้าที่และความรับผิดชอบที่พึงมีต่อสังคมส่วนรวมและสิ่งแวดล้อม
                    </p>
                </div>
            </div>
        </div>

        <!-- Branch Link CTA -->
        <div class="text-center mb-16 px-4">
            <h2 class="text-4xl md:text-5xl font-black mb-4 uppercase">สาขาใน<span class="text-isuzu-red">เชียงราย</span></h2>
            <div class="w-24 h-1 bg-isuzu-red mx-auto rounded-full mb-6"></div>
            <p class="text-gray-400 text-lg mb-8">ค้นหาโชว์รูมและศูนย์บริการมาตรฐานครบวงจรใกล้บ้านคุณ</p>
            <a 
                href="/branch" 
                class="inline-flex items-center gap-3 px-8 py-4 bg-isuzu-red hover:bg-red-700 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-isuzu-red/20 group"
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                ดูสาขาทั้งหมด
                <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
</script>

<style scoped>
@keyframes slow-zoom {
    from { transform: scale(1); }
    to { transform: scale(1.1); }
}
.animate-slow-zoom {
    animation: slow-zoom 20s ease-in-out infinite alternate;
}
@keyframes fade-in-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
    animation: fade-in-up 1s ease-out forwards;
}
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
</style>
