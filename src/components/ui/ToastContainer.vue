<template>
  <div class="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] flex flex-col gap-2 w-full max-w-sm pointer-events-none p-4">
    <TransitionGroup name="toast">
        <div 
            v-for="toast in toasts" 
            :key="toast.id" 
            class="pointer-events-auto flex items-center p-4 rounded-lg shadow-lg text-white border min-w-[300px] backdrop-blur-md"
            :class="{
                'bg-green-600/90 border-green-500': toast.type === 'success',
                'bg-red-600/90 border-red-500': toast.type === 'error',
                'bg-blue-600/90 border-blue-500': toast.type === 'info'
            }"
        >
            <!-- Icon -->
            <div class="flex-shrink-0 mr-3">
                <svg v-if="toast.type === 'success'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <svg v-if="toast.type === 'error'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <svg v-if="toast.type === 'info'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            
            <!-- Message -->
            <div class="flex-1 text-sm font-medium">
                {{ toast.message }}
            </div>

            <!-- Close -->
            <button @click="removeToast(toast.id)" class="ml-3 text-white/70 hover:text-white">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface ToastItem {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
    duration: number;
}

const toasts = ref<ToastItem[]>([]);
let nextId = 0;

const addToast = (event: Event) => {
    const customEvent = event as CustomEvent;
    const { message, type, duration } = customEvent.detail;
    
    const id = nextId++;
    const item: ToastItem = { id, message, type, duration };
    
    toasts.value.push(item);
    
    if (duration > 0) {
        setTimeout(() => {
            removeToast(id);
        }, duration);
    }
};

const removeToast = (id: number) => {
    const index = toasts.value.findIndex(t => t.id === id);
    if (index !== -1) {
        toasts.value.splice(index, 1);
    }
};

onMounted(() => {
    window.addEventListener('toast-notification', addToast);
});

onUnmounted(() => {
    window.removeEventListener('toast-notification', addToast);
});
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
