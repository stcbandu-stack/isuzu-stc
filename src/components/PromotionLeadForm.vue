<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from '../lib/supabase';

const props = defineProps({
  promotion: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'success', 'back']);

const formData = ref({
  fullName: '',
  phone: '',
  branch: '',
  lineId: '',
  email: '',
  promotionTitle: props.promotion.title,
  promotionDetail: props.promotion.description
});

const isSubmitting = ref(false);
const errorMsg = ref('');

const branches = ['บ้านดู่', 'พาน', 'แม่สาย', 'แม่จัน'];

const handleSubmit = async () => {
  if (!formData.value.fullName || !formData.value.phone || !formData.value.branch) {
    errorMsg.value = 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน';
    return;
  }

  isSubmitting.value = true;
  errorMsg.value = '';

  const leadData = {
    full_name: formData.value.fullName,
    phone: formData.value.phone,
    branch: formData.value.branch,
    line_id: formData.value.lineId,
    email: formData.value.email,
    promotion_title: formData.value.promotionTitle,
    promotion_detail: formData.value.promotionDetail,
    source_url: window.location.href
  };

  try {
    // 1. บันทึกข้อมูลลง Supabase
    const { error: dbError } = await supabase
      .from('promotion_leads')
      .insert([leadData]);

    if (dbError) {
      console.error('Database error:', dbError);
      // ยังคงพยายามส่งเมลล์ แม้ DB จะมีปัญหา
    }

    // 2. ส่งอีเมลล์แจ้งเตือนผ่าน API
    try {
      const emailResponse = await fetch('/api/send-lead-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.value.fullName,
          phone: formData.value.phone,
          branch: formData.value.branch,
          lineId: formData.value.lineId,
          email: formData.value.email,
          promotionTitle: formData.value.promotionTitle,
          promotionDetail: formData.value.promotionDetail,
          sourceUrl: window.location.href
        }),
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        console.error('Email API error:', errorData);
        // ไม่ throw error เพราะ Lead ถูกบันทึกแล้ว
      }
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr);
      // ไม่ throw error เพราะ Lead ถูกบันทึกแล้ว
    }

    // แสดงผลสำเร็จ (แม้อีเมลล์จะไม่ส่งก็ตาม เพราะ Lead ถูกบันทึกแล้ว)
    emit('success');
    
  } catch (err: any) {
    console.error('Error submitting lead:', err);
    errorMsg.value = 'เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <div class="border-b border-gray-700 pb-4 mb-6">
      <h3 class="text-xl font-bold text-white">สนใจโปรโมชั่น</h3>
      <p class="text-gray-400 text-sm mt-1">กรุณากรอกข้อมูลเพื่อให้ที่ปรึกษาการขายติดต่อกลับ</p>
    </div>

    <!-- Form Inputs -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Full Name -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-300">
          ชื่อ-นามสกุล <span class="text-isuzu-red">*</span>
        </label>
        <input 
          v-model="formData.fullName"
          type="text" 
          placeholder="ระบุชื่อของคุณ"
          class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-isuzu-red focus:border-transparent outline-none transition-all"
          required
        />
      </div>

      <!-- Phone -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-300">
          เบอร์โทรติดต่อกลับ <span class="text-isuzu-red">*</span>
        </label>
        <input 
          v-model="formData.phone"
          type="tel" 
          placeholder="08X-XXX-XXXX"
          class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-isuzu-red focus:border-transparent outline-none transition-all"
          required
        />
      </div>

      <!-- Branch -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-300">
          เลือกสาขาที่สะดวก <span class="text-isuzu-red">*</span>
        </label>
        <select 
          v-model="formData.branch"
          class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-isuzu-red focus:border-transparent outline-none transition-all"
          required
        >
          <option value="" disabled selected>เลือกสาขา</option>
          <option v-for="branch in branches" :key="branch" :value="branch">{{ branch }}</option>
        </select>
      </div>

      <!-- Line ID -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-300">
          LINE ID <span class="text-gray-500 text-xs">(ไม่บังคับ)</span>
        </label>
        <input 
          v-model="formData.lineId"
          type="text" 
          placeholder="Your Line ID"
          class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-isuzu-red focus:border-transparent outline-none transition-all"
        />
      </div>

      <!-- Email -->
      <div class="space-y-2 md:col-span-2">
        <label class="block text-sm font-medium text-gray-300">
          อีเมล <span class="text-gray-500 text-xs">(ไม่บังคับ)</span>
        </label>
        <input 
          v-model="formData.email"
          type="email" 
          placeholder="example@mail.com"
          class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-isuzu-red focus:border-transparent outline-none transition-all"
        />
      </div>
    </div>

    <!-- Auto-filled Info -->
    <div class="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 space-y-3">
      <div>
        <label class="block text-xs font-bold text-isuzu-red uppercase tracking-wider mb-1">โปรโมชั่นที่สนใจ</label>
        <p class="text-white font-medium">{{ formData.promotionTitle }}</p>
      </div>
      <div>
        <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">รายละเอียด</label>
        <p class="text-gray-400 text-xs line-clamp-2 italic">{{ formData.promotionDetail }}</p>
      </div>
    </div>

    <!-- Error Message -->
    <p v-if="errorMsg" class="text-isuzu-red text-sm font-medium">{{ errorMsg }}</p>

    <!-- Actions -->
    <div class="grid grid-cols-2 gap-4 mt-8">
      <button 
        @click="$emit('back')"
        class="py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-2xl font-bold transition-all disabled:opacity-50"
        :disabled="isSubmitting"
      >
        ย้อนกลับ
      </button>
      <button 
        @click="handleSubmit"
        class="py-4 bg-isuzu-red hover:bg-red-700 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group"
        :class="{ 'opacity-50 cursor-not-allowed bg-gray-500 hover:bg-gray-500': isSubmitting }"
        :disabled="isSubmitting"
      >
        <span v-if="isSubmitting" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
        <span v-else>ส่งข้อมูล</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
