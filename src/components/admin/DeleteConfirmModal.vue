<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
    <div class="bg-gray-800 rounded-xl shadow-2xl w-full max-w-md border border-red-500/30 overflow-hidden">
      
      <!-- Header -->
      <div class="bg-red-900/20 p-4 border-b border-red-900/30 flex items-center gap-3">
        <div class="p-2 bg-red-500/20 rounded-full text-red-400">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        </div>
        <h3 class="text-xl font-bold text-white">ยืนยันการลบข้อมูล</h3>
      </div>

      <!-- Body -->
      <form @submit.prevent="confirm" class="p-6 space-y-4">
        <div>
            <p class="text-gray-300 text-sm mb-4">
                คุณกำลังจะลบ: <span class="font-bold text-white">"{{ itemName }}"</span><br>
                การกระทำนี้ไม่สามารถกู้คืนได้ เพื่อความปลอดภัยกรุณากรอกรหัสผ่านของคุณเพื่อยืนยัน
            </p>
        </div>

        <div>
            <label class="block text-xs font-medium text-gray-400 mb-1">รหัสผ่านของคุณ (Admin Password)</label>
            <input 
                v-model="password" 
                type="password" 
                ref="passwordInput"
                class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none placeholder-gray-600"
                placeholder="กรอกรหัสผ่าน..."
                required
            >
            <p v-if="errorMsg" class="text-red-400 text-xs mt-1 flex items-center">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {{ errorMsg }}
            </p>
        </div>

        <div class="flex gap-3 pt-2">
            <button 
                type="button" 
                @click="close" 
                class="flex-1 px-4 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white rounded-lg transition-colors font-medium border border-gray-600 disabled:opacity-50"
                :disabled="verifying"
            >
                ยกเลิก
            </button>
            <button 
                type="submit" 
                class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium flex justify-center items-center shadow-lg shadow-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="verifying || !password"
            >
                <svg v-if="verifying" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                {{ verifying ? 'กำลังตรวจสอบ...' : 'ยืนยันการลบ' }}
            </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue';
import { supabase } from '../../lib/supabase';

const props = defineProps({
  isOpen: Boolean,
  itemName: String
});

const emit = defineEmits(['close', 'confirmed']);

const password = ref('');
const verifying = ref(false);
const errorMsg = ref('');
const passwordInput = ref(null);

watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        password.value = '';
        errorMsg.value = '';
        nextTick(() => {
            if (passwordInput.value) passwordInput.value.focus();
        });
    }
});

const close = () => {
    emit('close');
};

const confirm = async () => {
    if (!password.value) return;
    
    verifying.value = true;
    errorMsg.value = '';

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || !user.email) {
            throw new Error('ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่');
        }

        // Verify password by attempting to sign in (not perfect but standard for password re-entry flow without mfa)
        const { error } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: password.value
        });

        if (error) {
            throw new Error('รหัสผ่านไม่ถูกต้อง');
        }

        emit('confirmed');
        close();
    } catch (err) {
        errorMsg.value = err.message || 'Verification failed';
    } finally {
        verifying.value = false;
    }
};
</script>
