<template>
  <Transition name="slide-up">
    <div
      v-if="showBanner"
      class="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
    >
      <div
        class="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-lg border border-slate-700/50 rounded-2xl shadow-2xl p-6 md:p-8"
      >
        <div class="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <!-- Cookie Icon & Text -->
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-3">
              <div class="p-2 bg-isuzu-red/10 rounded-xl">
                <svg
                  class="w-6 h-6 text-isuzu-red"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-white">
                การใช้คุกกี้ (Cookie Consent)
              </h3>
            </div>
            <p class="text-gray-300 text-sm leading-relaxed">
              เว็บไซต์ของเราใช้คุกกี้และ Google Analytics
              เพื่อวิเคราะห์การใช้งานเว็บไซต์ ปรับปรุงประสบการณ์การเยี่ยมชม
              และนำเสนอเนื้อหาที่ตรงกับความสนใจของท่าน
              <a
                href="/policy"
                class="text-isuzu-red hover:text-red-400 underline ml-1 transition-colors"
              >
                อ่านนโยบายความเป็นส่วนตัว
              </a>
            </p>
            <p class="text-gray-400 text-xs mt-2 italic">
              We use cookies and Google Analytics to analyze website usage, improve your
              experience, and deliver personalized content.
              <a
                href="/policy"
                class="text-isuzu-red hover:text-red-400 underline transition-colors"
              >
                Read Privacy Policy
              </a>
            </p>
          </div>

          <!-- Buttons -->
          <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              @click="rejectCookies"
              class="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-all duration-200 text-sm border border-slate-600 hover:border-slate-500"
            >
              ปฏิเสธ (Reject)
            </button>
            <button
              @click="acceptCookies"
              class="px-6 py-3 bg-isuzu-red hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-200 text-sm shadow-lg hover:shadow-red-500/25"
            >
              ยอมรับ (Accept)
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const CONSENT_KEY = 'cookie_consent';
const GA_MEASUREMENT_ID = 'G-QK22Y7CLLR';

const showBanner = ref(false);

// Check for existing consent on mount
onMounted(() => {
  const consent = localStorage.getItem(CONSENT_KEY);
  
  if (consent === null) {
    // No consent recorded yet, show banner
    showBanner.value = true;
  } else if (consent === 'accepted') {
    // User previously accepted, load GA
    loadGoogleAnalytics();
  }
  // If 'rejected', do nothing - don't show banner, don't load GA
});

// Accept cookies handler
function acceptCookies() {
  localStorage.setItem(CONSENT_KEY, 'accepted');
  showBanner.value = false;
  loadGoogleAnalytics();
}

// Reject cookies handler
function rejectCookies() {
  localStorage.setItem(CONSENT_KEY, 'rejected');
  showBanner.value = false;
  // Don't load GA - respect user's choice
}

// Function to dynamically load Google Analytics
function loadGoogleAnalytics() {
  // Check if GA is already loaded
  if (document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) {
    return;
  }

  // Create and append the GA script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag after script loads
  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true, // Enhanced privacy
      cookie_flags: 'SameSite=None;Secure'
    });

    // Make gtag globally available
    (window as any).gtag = gtag;
  };
}

// Declare global types for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
