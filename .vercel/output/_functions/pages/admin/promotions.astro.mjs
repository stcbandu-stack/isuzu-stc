/* empty css                                    */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BorZG8IO.mjs';
import 'piccolore';
import { _ as _export_sfc, $ as $$MainLayout } from '../../chunks/MainLayout_DqAf7Ggx.mjs';
import { A as AdminNav } from '../../chunks/AdminNav_CMNxDHy1.mjs';
import { useSSRContext, computed, ref, watch, mergeProps, nextTick, onMounted } from 'vue';
import { s as supabase } from '../../chunks/supabase_vsc3_iwe.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
export { renderers } from '../../renderers.mjs';

const dispatchToast = (message, type, duration = 3e3) => {
  if (typeof window !== "undefined") {
    const event = new CustomEvent("toast-notification", {
      detail: { message, type, duration }
    });
    window.dispatchEvent(event);
  }
};
const toast = {
  success: (message, duration = 3e3) => dispatchToast(message, "success", duration),
  error: (message, duration = 4e3) => dispatchToast(message, "error", duration),
  info: (message, duration = 3e3) => dispatchToast(message, "info", duration)
};

const _sfc_main$2 = {
  __name: 'PromotionEditor',
  props: {
  promotion: Object
},
  emits: ['close', 'saved'],
  setup(__props, { expose: __expose, emit: __emit }) {
  __expose();

const props = __props;

const emit = __emit;

const isEditing = computed(() => !!props.promotion);
const saving = ref(false);
const uploading = ref(false);

// Gallery JSONB
const galleryInput = ref('');
const galleryError = ref('');
const parsedGallery = ref([]);
const parsedGalleryCount = computed(() => parsedGallery.value.length);

const validateGalleryInput = () => {
  galleryError.value = '';
  parsedGallery.value = [];
  
  if (!galleryInput.value.trim()) {
    return true;
  }
  
  try {
    const parsed = JSON.parse(galleryInput.value);
    
    if (!Array.isArray(parsed)) {
      galleryError.value = 'ข้อมูลต้องอยู่ในรูปแบบ Array เท่านั้น เช่น ["url1", "url2"]';
      return false;
    }
    
    for (let i = 0; i < parsed.length; i++) {
      if (typeof parsed[i] !== 'string') {
        galleryError.value = `รายการที่ ${i + 1} ต้องเป็น string (URL)`;
        return false;
      }
      
      // Basic URL validation
      if (!parsed[i].startsWith('http://') && !parsed[i].startsWith('https://')) {
        galleryError.value = `รายการที่ ${i + 1} ต้องเป็น URL ที่ขึ้นต้นด้วย http:// หรือ https://`;
        return false;
      }
    }
    
    parsedGallery.value = parsed;
    return true;
  } catch (e) {
    galleryError.value = 'รูปแบบ JSON ไม่ถูกต้อง: ' + e.message;
    return false;
  }
};

const form = ref({
    title: '',
    description: '',
    image_url: '',
    direct_url: '',
    gallery_images: [],
    is_active: true
});

// Initialize
watch(() => props.promotion, (newVal) => {
    if (newVal) {
        form.value = { ...newVal };
        // Initialize gallery input from existing data
        if (newVal.gallery_images && Array.isArray(newVal.gallery_images)) {
          galleryInput.value = JSON.stringify(newVal.gallery_images, null, 2);
          parsedGallery.value = newVal.gallery_images;
        } else {
          galleryInput.value = '';
          parsedGallery.value = [];
        }
    } else {
        form.value = {
            title: '',
            description: '',
            image_url: '',
            direct_url: '',
            gallery_images: [],
            is_active: true
        };
        galleryInput.value = '';
        parsedGallery.value = [];
    }
    galleryError.value = '';
}, { immediate: true });

const savePromotion = async () => {
    if (saving.value) return;
    
    // Validate gallery input before saving
    if (galleryInput.value.trim() && !validateGalleryInput()) {
      toast.error('กรุณาแก้ไขรูปแบบ Gallery Images ให้ถูกต้อง');
      return;
    }
    
    saving.value = true;
    
    try {
        // Prepare form data with parsed gallery
        const submitData = {
          ...form.value,
          gallery_images: parsedGallery.value
        };
        
        if (isEditing.value) {
            const { error } = await supabase.from('promotions').update(submitData).eq('id', props.promotion.id);
            if (error) throw error;
        } else {
            const { error } = await supabase.from('promotions').insert([submitData]);
            if (error) throw error;
        }
        
        toast.success('บันทึกโปรโมชั่นเรียบร้อยแล้ว');
        emit('saved');
        emit('close'); 
    } catch (err) {
        toast.error('เกิดข้อผิดพลาดในการบันทึก: ' + err.message);
    } finally {
        saving.value = false;
    }
};

const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    uploading.value = true;
    try {
        const fileName = `promo_${Date.now()}_${file.name}`;
        const { data, error } = await supabase.storage.from('slides').upload(fileName, file); 
        
        if (error) throw error;
        
        const { data: { publicUrl } } = supabase.storage.from('slides').getPublicUrl(fileName);
        form.value.image_url = publicUrl;
        toast.success('อัปโหลดรูปภาพเสร็จสิ้น');
    } catch (err) {
        toast.error('การอัปโหลดล้มเหลว: ' + err.message);
    } finally {
        uploading.value = false;
    }
};

const __returned__ = { props, emit, isEditing, saving, uploading, galleryInput, galleryError, parsedGallery, parsedGalleryCount, validateGalleryInput, form, savePromotion, handleFileUpload, ref, computed, watch, get supabase() { return supabase }, get toast() { return toast } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" }, _attrs))
  }><div class="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-700 overflow-hidden flex flex-col max-h-[90vh]"><div class="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-800/50 sticky top-0 z-10"><h2 class="text-2xl font-bold text-white flex items-center gap-3"><span class="p-2 bg-isuzu-red/10 rounded-lg text-isuzu-red"><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg></span> ${
    ssrInterpolate($setup.isEditing ? 'แก้ไขโปรโมชั่น' : 'เพิ่มโปรโมชั่นใหม่')
  }</h2><button class="text-gray-400 hover:text-white transition-colors"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="p-6 overflow-y-auto"><form class="space-y-6"><div><label class="block text-sm font-medium text-gray-400 mb-2">หัวข้อโปรโมชั่น</label><input${
    ssrRenderAttr("value", $setup.form.title)
  } type="text" required class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-isuzu-red focus:ring-1 focus:ring-isuzu-red outline-none transition-all" placeholder="เช่น โปรแรงประจำเดือน..."></div><div><label class="block text-sm font-medium text-gray-400 mb-2">รายละเอียดแบบเต็ม</label><textarea rows="6" required class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-isuzu-red focus:ring-1 focus:ring-isuzu-red outline-none transition-all resize-none" placeholder="กรอกรายละเอียดโปรโมชั่นของคุณที่นี่...">${
    ssrInterpolate($setup.form.description)
  }</textarea></div><div class="grid grid-cols-1 gap-6"><div><label class="block text-sm font-medium text-gray-400 mb-2">รูปภาพโปรโมชั่น (สัดส่วนที่แนะนำ 4:5)</label><div class="flex gap-4"><div class="flex-1 relative"><input${
    ssrRenderAttr("value", $setup.form.image_url)
  } type="text" class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:border-isuzu-red outline-none" placeholder="ใส่ URL ของรูปภาพ..."></div><label class="flex-shrink-0 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg cursor-pointer transition-colors flex items-center gap-2 border border-gray-600">`);
  if ($setup.uploading) {
    _push(`<span class="animate-spin h-4 w-4 border-b-2 border-white rounded-full"></span>`);
  } else {
    _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>`);
  }
  _push(` ${
    ssrInterpolate($setup.uploading ? 'กำลังอัปโหลด...' : 'อัปโหลด')
  } <input type="file" class="hidden" accept="image/*"></label></div></div><div><label class="block text-sm font-medium text-gray-400 mb-2">ปุ่มลัดไปยังเว็บไซต์อื่น (Optional)</label><input${
    ssrRenderAttr("value", $setup.form.direct_url)
  } type="url" class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:border-isuzu-red outline-none" placeholder="เช่น https://www.isuzu-tis.com/promotions"></div><div><label class="block text-sm font-medium text-gray-400 mb-2"> รูปภาพเพิ่มเติม (Gallery) - JSONB Array </label><textarea rows="4" class="${
    ssrRenderClass([$setup.galleryError ? 'border-red-500' : 'border-gray-700', "w-full bg-gray-900 border rounded-lg px-4 py-3 text-white text-sm font-mono focus:border-isuzu-red outline-none resize-none"])
  }" placeholder="[&quot;https://example.com/image1.jpg&quot;, &quot;https://example.com/image2.jpg&quot;]">${
    ssrInterpolate($setup.galleryInput)
  }</textarea>`);
  if ($setup.galleryError) {
    _push(`<div class="mt-2 text-red-400 text-xs flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${ssrInterpolate($setup.galleryError)}</div>`);
  } else if ($setup.galleryInput && $setup.parsedGalleryCount > 0) {
    _push(`<div class="mt-2 text-green-400 text-xs flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> รูปแบบถูกต้อง (${ssrInterpolate($setup.parsedGalleryCount)} รูป) </div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="mt-3 p-3 bg-gray-900/50 rounded-lg border border-gray-700/50"><p class="text-xs text-gray-500 mb-2">📝 ตัวอย่างรูปแบบที่ถูกต้อง:</p><code class="text-xs text-gray-400 block whitespace-pre-wrap break-all">[&quot;https://example.com/img1.jpg&quot;, &quot;https://example.com/img2.jpg&quot;]</code><p class="text-xs text-gray-500 mt-2">💡 หมายเหตุ: ใส่ URL รูปภาพในรูปแบบ JSON Array สัดส่วนที่แนะนำ 5:4 (แนวนอน)</p></div>`);
  if ($setup.parsedGallery.length > 0) {
    _push(`<div class="mt-4"><label class="block text-sm font-medium text-gray-400 mb-2">ตัวอย่าง Gallery (${ssrInterpolate($setup.parsedGallery.length)} รูป)</label><div class="grid grid-cols-4 gap-2"><!--[-->`);
    ssrRenderList($setup.parsedGallery.slice(0, 8), (url, idx) => {
      _push(`<div class="aspect-[5/4] rounded-lg overflow-hidden border border-gray-700 bg-gray-900"><img${ssrRenderAttr("src", url)} class="w-full h-full object-cover"></div>`);
    });
    _push(`<!--]-->`);
    if ($setup.parsedGallery.length > 8) {
      _push(`<div class="aspect-[5/4] rounded-lg overflow-hidden border border-gray-700 bg-gray-900 flex items-center justify-center"><span class="text-gray-500 text-sm">+${ssrInterpolate($setup.parsedGallery.length - 8)} รูป</span></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
  if ($setup.form.image_url) {
    _push(`<div class="mt-4"><label class="block text-sm font-medium text-gray-400 mb-2">ตัวอย่างรูปภาพ (สัดส่วน 4:5)</label><div class="w-32 aspect-[4/5] rounded-lg overflow-hidden border border-gray-700 bg-gray-900"><img${ssrRenderAttr("src", $setup.form.image_url)} class="w-full h-full object-cover"></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</form></div><div class="p-6 border-t border-gray-700 flex justify-end gap-4 bg-gray-800/50 sticky bottom-0"><button class="px-6 py-2.5 bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white rounded-lg transition-colors font-medium border border-gray-600"${
    (ssrIncludeBooleanAttr($setup.saving)) ? " disabled" : ""
  }> ยกเลิก </button><button class="px-8 py-2.5 bg-isuzu-red hover:bg-red-700 text-white rounded-lg transition-all font-medium flex items-center justify-center gap-2 shadow-lg shadow-isuzu-red/20 disabled:opacity-50"${
    (ssrIncludeBooleanAttr($setup.saving)) ? " disabled" : ""
  }>`);
  if ($setup.saving) {
    _push(`<span class="animate-spin h-4 w-4 border-b-2 border-white rounded-full"></span>`);
  } else {
    _push(`<!---->`);
  }
  _push(` ${ssrInterpolate($setup.saving ? 'กำลังบันทึก...' : 'บันทึกข้อมูล')}</button></div></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/admin/PromotionEditor.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined
};
const PromotionEditor = /*#__PURE__*/_export_sfc(_sfc_main$2, [['ssrRender',_sfc_ssrRender$2]]);

const _sfc_main$1 = {
  __name: 'DeleteConfirmModal',
  props: {
  isOpen: Boolean,
  itemName: String
},
  emits: ['close', 'confirmed'],
  setup(__props, { expose: __expose, emit: __emit }) {
  __expose();

const props = __props;

const emit = __emit;

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

const __returned__ = { props, emit, password, verifying, errorMsg, passwordInput, close, confirm, ref, nextTick, watch, get supabase() { return supabase } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($props.isOpen) {
    _push(`<div${
      ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm" }, _attrs))
    }><div class="bg-gray-800 rounded-xl shadow-2xl w-full max-w-md border border-red-500/30 overflow-hidden"><div class="bg-red-900/20 p-4 border-b border-red-900/30 flex items-center gap-3"><div class="p-2 bg-red-500/20 rounded-full text-red-400"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></div><h3 class="text-xl font-bold text-white">ยืนยันการลบข้อมูล</h3></div><form class="p-6 space-y-4"><div><p class="text-gray-300 text-sm mb-4"> คุณกำลังจะลบ: <span class="font-bold text-white">&quot;${
      ssrInterpolate($props.itemName)
    }&quot;</span><br> การกระทำนี้ไม่สามารถกู้คืนได้ เพื่อความปลอดภัยกรุณากรอกรหัสผ่านของคุณเพื่อยืนยัน </p></div><div><label class="block text-xs font-medium text-gray-400 mb-1">รหัสผ่านของคุณ (Admin Password)</label><input${
      ssrRenderAttr("value", $setup.password)
    } type="password" class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none placeholder-gray-600" placeholder="กรอกรหัสผ่าน..." required>`);
    if ($setup.errorMsg) {
      _push(`<p class="text-red-400 text-xs mt-1 flex items-center"><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${ssrInterpolate($setup.errorMsg)}</p>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div><div class="flex gap-3 pt-2"><button type="button" class="flex-1 px-4 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white rounded-lg transition-colors font-medium border border-gray-600 disabled:opacity-50"${
      (ssrIncludeBooleanAttr($setup.verifying)) ? " disabled" : ""
    }> ยกเลิก </button><button type="submit" class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium flex justify-center items-center shadow-lg shadow-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed"${
      (ssrIncludeBooleanAttr($setup.verifying || !$setup.password)) ? " disabled" : ""
    }>`);
    if ($setup.verifying) {
      _push(`<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
    } else {
      _push(`<!---->`);
    }
    _push(` ${ssrInterpolate($setup.verifying ? 'กำลังตรวจสอบ...' : 'ยืนยันการลบ')}</button></div></form></div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/admin/DeleteConfirmModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};
const DeleteConfirmModal = /*#__PURE__*/_export_sfc(_sfc_main$1, [['ssrRender',_sfc_ssrRender$1]]);

const _sfc_main = {
  __name: 'PromotionList',
  setup(__props, { expose: __expose }) {
  __expose();

const promotions = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const showEditor = ref(false);
const selectedPromotion = ref(null);

// Delete State
const showDeleteModal = ref(false);
const promotionToDelete = ref(null);

const fetchPromotions = async () => {
  loading.value = true;
  try {
    const { data, error } = await supabase
        .from('promotions')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (error) throw error;
    promotions.value = data || [];
  } catch (err) {
    toast.error('ไม่สามารถโหลดข้อมูลโปรโมชั่นได้: ' + err.message);
  } finally {
    loading.value = false;
  }
};

const filteredPromotions = computed(() => {
    if (!searchQuery.value) return promotions.value;
    const query = searchQuery.value.toLowerCase();
    return promotions.value.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.description?.toLowerCase().includes(query)
    );
});

const toggleStatus = async (promo) => {
    try {
        const { error } = await supabase
            .from('promotions')
            .update({ is_active: !promo.is_active })
            .eq('id', promo.id);
        
        if (error) throw error;
        await fetchPromotions();
        toast.success('อัปเดตสถานะโปรโมชั่นเรียบร้อยแล้ว');
    } catch (error) {
        toast.error('อัปเดตสถานะไม่สำเร็จ: ' + error.message);
    }
};

const openEditor = (promo = null) => {
    selectedPromotion.value = promo;
    showEditor.value = true;
};

const closeEditor = () => {
    showEditor.value = false;
    selectedPromotion.value = null;
};

// Delete Logic
const initiateDelete = (promo) => {
    promotionToDelete.value = promo;
    showDeleteModal.value = true;
};

const closeDeleteModal = () => {
    showDeleteModal.value = false;
    promotionToDelete.value = null;
};

const executeDelete = async () => {
    if (!promotionToDelete.value) return;
    loading.value = true; 

    try {
        const { error } = await supabase.from('promotions').delete().eq('id', promotionToDelete.value.id);
        if (error) throw error;
        
        toast.success('ลบโปรโมชั่นเรียบร้อยแล้ว');
        await fetchPromotions(); 
    } catch (err) {
        toast.error('ลบไม่สำเร็จ: ' + err.message);
        loading.value = false;
    }
};

onMounted(() => {
    fetchPromotions();
});

const __returned__ = { promotions, loading, searchQuery, showEditor, selectedPromotion, showDeleteModal, promotionToDelete, fetchPromotions, filteredPromotions, toggleStatus, openEditor, closeEditor, initiateDelete, closeDeleteModal, executeDelete, ref, computed, onMounted, get supabase() { return supabase }, get toast() { return toast }, PromotionEditor, DeleteConfirmModal };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(_attrs)
  }><div class="flex justify-between items-center mb-6"><div class="relative w-64"><input${
    ssrRenderAttr("value", $setup.searchQuery)
  } type="text" placeholder="ค้นหาโปรโมชั่น..." class="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-isuzu-red focus:outline-none"><svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div><button class="bg-isuzu-red hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors shadow-lg shadow-isuzu-red/20"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> เพิ่มโปรโมชั่น </button></div>`);
  if ($setup.loading) {
    _push(`<div class="text-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-isuzu-red mx-auto"></div><p class="text-gray-400 mt-4">กำลังโหลดข้อมูล...</p></div>`);
  } else {
    _push(`<div class="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl"><table class="w-full text-left text-gray-300"><thead class="bg-gray-900 text-gray-400 uppercase text-xs"><tr><th class="px-6 py-4">รูปภาพ</th><th class="px-6 py-4">หัวข้อ</th><th class="px-6 py-4">สถานะ</th><th class="px-6 py-4 text-right">จัดการ</th></tr></thead><tbody class="divide-y divide-gray-700"><!--[-->`);
    ssrRenderList($setup.filteredPromotions, (promo) => {
      _push(`<tr class="hover:bg-gray-700/50 transition-colors"><td class="px-6 py-4"><div class="w-12 h-15 bg-gray-900 rounded border border-gray-600 overflow-hidden flex items-center justify-center">`);
      if (promo.image_url) {
        _push(`<img${ssrRenderAttr("src", promo.image_url)} class="w-full h-full object-cover">`);
      } else {
        _push(`<span class="text-xs text-gray-600">No Img</span>`);
      }
      _push(`</div></td><td class="px-6 py-4"><p class="font-medium text-white truncate max-w-xs">${
        ssrInterpolate(promo.title)
      }</p></td><td class="px-6 py-4"><button class="${
        ssrRenderClass([promo.is_active ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-700 text-gray-400 border-gray-600', "px-3 py-1 rounded-full text-xs font-medium border"])
      }">${
        ssrInterpolate(promo.is_active ? 'แสดงผล' : 'ปิดการแสดง')
      }</button></td><td class="px-6 py-4 text-right space-x-2"><button class="text-blue-400 hover:text-blue-300 transition-colors"> แก้ไข </button><button class="text-red-400 hover:text-red-300 transition-colors"> ลบ </button></td></tr>`);
    });
    _push(`<!--]-->`);
    if ($setup.filteredPromotions.length === 0) {
      _push(`<tr><td colspan="4" class="px-6 py-8 text-center text-gray-500"> ไม่พบข้อมูลโปรโมชั่น </td></tr>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</tbody></table></div>`);
  }
  if ($setup.showEditor) {
    _push(ssrRenderComponent($setup["PromotionEditor"], {
      promotion: $setup.selectedPromotion,
      onClose: $setup.closeEditor,
      onSaved: $setup.fetchPromotions
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(ssrRenderComponent($setup["DeleteConfirmModal"], {
    isOpen: $setup.showDeleteModal,
    itemName: $setup.promotionToDelete?.title || '',
    onClose: $setup.closeDeleteModal,
    onConfirmed: $setup.executeDelete
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/admin/PromotionList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const PromotionList = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const $$Promotions = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E42\u0E1B\u0E23\u0E42\u0E21\u0E0A\u0E31\u0E48\u0E19 - Admin Dashboard" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-900 pt-20 pb-12"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <!-- Static Admin Header --> <div class="mb-8"> <h1 class="text-3xl font-bold text-white mb-2">
ระบบหลังบ้าน (Admin Dashboard)
</h1> <p class="text-gray-400">
จัดการข้อมูลโปรโมชั่นและแคมเปญพิเศษของอีซูซุ
</p> </div> <div class="grid grid-cols-1 lg:grid-cols-4 gap-8"> <!-- Sidebar Navigation --> <div class="lg:col-span-1"> ${renderComponent($$result2, "AdminNav", AdminNav, { "activePage": "promotions", "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/Website/isuzu-stc/src/components/admin/AdminNav.vue", "client:component-export": "default" })} </div> <!-- Main Content --> <div class="lg:col-span-3"> <div class="bg-gray-800/50 rounded-2xl p-6 border border-gray-700"> ${renderComponent($$result2, "PromotionList", PromotionList, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/Website/isuzu-stc/src/components/admin/PromotionList.vue", "client:component-export": "default" })} </div> </div> </div> </div> </div> ` })}`;
}, "D:/Website/isuzu-stc/src/pages/admin/promotions.astro", void 0);

const $$file = "D:/Website/isuzu-stc/src/pages/admin/promotions.astro";
const $$url = "/admin/promotions";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Promotions,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
