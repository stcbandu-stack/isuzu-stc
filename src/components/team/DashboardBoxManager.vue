<template>
  <div class="space-y-6">
    <!-- Header with Add Button -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-semibold text-white">จัดการกล่อง Dashboard</h3>
        <p class="text-sm text-gray-400">ลากเพื่อจัดลำดับกล่องและเมนู หรือใช้ปุ่มลูกศร</p>
      </div>
      <button
        @click="showAddBoxModal = true"
        class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        เพิ่มกล่องใหม่
      </button>
    </div>

    <!-- Boxes List (Sortable) -->
    <div 
      class="space-y-4"
      @dragover.prevent
      @drop="onDropBox($event)"
    >
      <div
        v-for="(box, boxIndex) in boxes"
        :key="`box-${box.id}-${boxIndex}`"
        :draggable="true"
        @dragstart="onDragStartBox($event, boxIndex)"
        @dragend="onDragEnd"
        @dragover.prevent="onDragOverBox($event, boxIndex)"
        :class="[
          'bg-gray-700/50 rounded-xl border overflow-hidden transition-all duration-300',
          draggedBoxIndex === boxIndex ? 'opacity-50 scale-[0.98] border-blue-500' : 'border-gray-600/50',
          dragOverBoxIndex === boxIndex && draggedBoxIndex !== boxIndex ? 'border-blue-400 ring-2 ring-blue-400/50' : '',
          lastMovedBoxId === box.id ? 'ring-2 ring-green-400 border-green-400 animate-pulse' : ''
        ]"
      >
        <!-- Box Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-600/50 bg-gray-800/30">
          <div class="flex items-center gap-3">
            <!-- Drag Handle -->
            <div class="cursor-grab active:cursor-grabbing p-1 text-gray-500 hover:text-gray-300" title="ลากเพื่อจัดลำดับ">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
              </svg>
            </div>
            <div
              :class="`w-10 h-10 bg-gradient-to-br ${getColorClasses(box.color).bg} rounded-lg flex items-center justify-center`"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="box.icon || defaultIcon"></path>
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-white">{{ box.title }}</h4>
              <p class="text-sm text-gray-400">{{ box.description || 'ไม่มีคำอธิบาย' }} • ลำดับ: {{ boxIndex + 1 }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <!-- Move Up -->
            <button
              @click="moveBoxUp(boxIndex)"
              :disabled="boxIndex === 0 || savingOrder"
              class="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="เลื่อนขึ้น"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
              </svg>
            </button>
            <!-- Move Down -->
            <button
              @click="moveBoxDown(boxIndex)"
              :disabled="boxIndex === boxes.length - 1 || savingOrder"
              class="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="เลื่อนลง"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div class="w-px h-6 bg-gray-600"></div>
            <button
              @click="editBox(box)"
              class="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors"
              title="แก้ไข"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button
              @click="confirmDelete(box)"
              class="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
              title="ลบ"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Menu Items (Sortable) -->
        <div class="p-4">
          <div class="flex justify-between items-center mb-3">
            <span class="text-sm text-gray-400">เมนูในกล่องนี้ ({{ box.dashboard_menu_items?.length || 0 }})</span>
            <button
              @click="addMenuItem(box)"
              class="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              เพิ่มเมนู
            </button>
          </div>
          
          <div 
            v-if="box.dashboard_menu_items?.length" 
            class="space-y-2"
            @dragover.prevent
            @drop="onDropMenuItem($event, box.id)"
          >
            <div
              v-for="(item, itemIndex) in sortedMenuItems(box)"
              :key="`menu-${item.id}-${itemIndex}`"
              :draggable="true"
              @dragstart="onDragStartMenuItem($event, item, box.id, itemIndex)"
              @dragend="onDragEnd"
              @dragover.prevent="onDragOverMenuItem($event, box.id, itemIndex)"
              :class="[
                'flex items-center justify-between p-3 rounded-lg transition-all duration-300',
                `bg-gradient-to-r ${getColorClasses(item.color).bg}`,
                draggedMenuItem?.id === item.id ? 'opacity-50 scale-[0.98]' : '',
                dragOverMenuItem?.boxId === box.id && dragOverMenuItem?.index === itemIndex && draggedMenuItem?.id !== item.id ? 'ring-2 ring-white/50' : '',
                lastMovedMenuItemId === item.id ? 'ring-2 ring-yellow-300 animate-pulse' : ''
              ]"
            >
              <div class="flex items-center gap-3 min-w-0 flex-1">
                <!-- Drag Handle for Menu Item -->
                <div class="cursor-grab active:cursor-grabbing p-1 text-white/50 hover:text-white flex-shrink-0" title="ลากเพื่อจัดลำดับ">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
                  </svg>
                </div>
                <svg class="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon || 'M13 7l5 5m0 0l-5 5m5-5H6'"></path>
                </svg>
                <div class="min-w-0 flex-1">
                  <p class="font-medium text-white">{{ item.title }} <span class="text-white/50 text-xs">#{{ itemIndex + 1 }}</span></p>
                  <p class="text-xs text-white/70 truncate" :title="item.url">{{ item.url || 'ยังไม่ได้กำหนด URL' }}</p>
                </div>
              </div>
              <div class="flex items-center gap-1 flex-shrink-0">
                <!-- Move Menu Up -->
                <button
                  @click.stop="moveMenuItemUp(box, itemIndex)"
                  :disabled="itemIndex === 0 || savingOrder"
                  class="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="เลื่อนขึ้น"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                  </svg>
                </button>
                <!-- Move Menu Down -->
                <button
                  @click.stop="moveMenuItemDown(box, itemIndex)"
                  :disabled="itemIndex === (sortedMenuItems(box).length) - 1 || savingOrder"
                  class="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="เลื่อนลง"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div class="w-px h-4 bg-white/20 mx-1"></div>
                <button
                  @click.stop="editMenuItem(item, box)"
                  class="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="แก้ไข"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button
                  @click.stop="deleteMenuItem(item)"
                  class="p-1.5 text-white/70 hover:text-red-300 hover:bg-red-500/20 rounded transition-colors"
                  title="ลบ"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-4 text-gray-500 text-sm">
            ยังไม่มีเมนูในกล่องนี้
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!boxes.length && !loading" class="text-center py-12 bg-gray-700/30 rounded-xl border border-gray-600/50">
        <svg class="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
        <p class="text-gray-400">ยังไม่มีกล่อง Dashboard</p>
        <p class="text-sm text-gray-500 mt-1">คลิกปุ่ม "เพิ่มกล่องใหม่" เพื่อเริ่มสร้าง</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>

    <!-- Saving Order Indicator -->
    <div 
      v-if="savingOrder" 
      class="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50"
    >
      <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      กำลังบันทึกลำดับ...
    </div>

    <!-- Success Toast -->
    <Transition name="toast">
      <div 
        v-if="showSuccessToast" 
        class="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        บันทึกลำดับเรียบร้อย!
      </div>
    </Transition>

    <!-- Add/Edit Box Modal -->
    <div v-if="showAddBoxModal || editingBox" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="closeBoxModal"></div>
      <div class="relative bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl">
        <h3 class="text-xl font-semibold text-white mb-4">
          {{ editingBox ? 'แก้ไขกล่อง' : 'เพิ่มกล่องใหม่' }}
        </h3>
        
        <form @submit.prevent="saveBox" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">ชื่อกล่อง *</label>
            <input
              v-model="boxForm.title"
              type="text"
              required
              class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="เช่น รายงานยอดขาย"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">คำอธิบาย</label>
            <input
              v-model="boxForm.description"
              type="text"
              class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="คำอธิบายสั้นๆ"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">สี</label>
            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="(value, key) in colorOptions"
                :key="key"
                type="button"
                @click="boxForm.color = key"
                :class="[
                  'w-10 h-10 rounded-lg border-2 transition-all',
                  boxForm.color === key ? 'border-white scale-110' : 'border-transparent',
                  `bg-gradient-to-br ${value.bg}`
                ]"
              ></button>
            </div>
          </div>
          
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="closeBoxModal"
              class="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {{ saving ? 'กำลังบันทึก...' : 'บันทึก' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Add/Edit Menu Item Modal -->
    <div v-if="showMenuItemModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="closeMenuItemModal"></div>
      <div class="relative bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl">
        <h3 class="text-xl font-semibold text-white mb-4">
          {{ editingMenuItem ? 'แก้ไขเมนู' : 'เพิ่มเมนูใหม่' }}
        </h3>
        
        <form @submit.prevent="saveMenuItem" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">ชื่อเมนู *</label>
            <input
              v-model="menuItemForm.title"
              type="text"
              required
              class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="เช่น ดูรายงานประจำวัน"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">URL / ลิงก์ *</label>
            <input
              v-model="menuItemForm.url"
              type="text"
              required
              class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://... หรือ /team/page"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">คำอธิบาย</label>
            <input
              v-model="menuItemForm.description"
              type="text"
              class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="คำอธิบายสั้นๆ"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">สีปุ่ม</label>
            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="(value, key) in colorOptions"
                :key="key"
                type="button"
                @click="menuItemForm.color = key"
                :class="[
                  'w-10 h-10 rounded-lg border-2 transition-all',
                  menuItemForm.color === key ? 'border-white scale-110' : 'border-transparent',
                  `bg-gradient-to-br ${value.bg}`
                ]"
              ></button>
            </div>
          </div>
          
          <div class="flex items-center gap-3">
            <input
              v-model="menuItemForm.open_in_new_tab"
              type="checkbox"
              id="newTab"
              class="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
            >
            <label for="newTab" class="text-sm text-gray-300">เปิดในแท็บใหม่</label>
          </div>
          
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="closeMenuItemModal"
              class="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {{ saving ? 'กำลังบันทึก...' : 'บันทึก' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="deleteTarget" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="deleteTarget = null"></div>
      <div class="relative bg-gray-800 rounded-2xl p-6 w-full max-w-sm border border-gray-700 shadow-2xl">
        <div class="text-center">
          <div class="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">ยืนยันการลบ</h3>
          <p class="text-gray-400 mb-6">คุณต้องการลบ "{{ deleteTarget.title }}" ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้</p>
          <div class="flex gap-3">
            <button
              @click="deleteTarget = null"
              class="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              ยกเลิก
            </button>
            <button
              @click="executeDelete"
              :disabled="saving"
              class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {{ saving ? 'กำลังลบ...' : 'ลบ' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { supabase } from '../../lib/supabase';

// Types
interface MenuItem {
  id: string;
  box_id: string;
  title: string;
  description?: string;
  url?: string;
  icon?: string;
  color: string;
  open_in_new_tab: boolean;
  position: number;
  is_active: boolean;
}

interface Box {
  id: string;
  title: string;
  description?: string;
  color: string;
  icon?: string;
  position: number;
  is_active: boolean;
  dashboard_menu_items?: MenuItem[];
}

// Color Options
const colorOptions = {
  red: { bg: 'from-red-600 to-red-700' },
  orange: { bg: 'from-orange-600 to-orange-700' },
  yellow: { bg: 'from-yellow-500 to-yellow-600' },
  green: { bg: 'from-green-600 to-green-700' },
  teal: { bg: 'from-teal-600 to-teal-700' },
  blue: { bg: 'from-blue-600 to-blue-700' },
  indigo: { bg: 'from-indigo-600 to-indigo-700' },
  purple: { bg: 'from-purple-600 to-purple-700' },
  pink: { bg: 'from-pink-600 to-pink-700' },
  gray: { bg: 'from-gray-600 to-gray-700' },
};

const defaultIcon = 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z';

// State
const boxes = ref<Box[]>([]);
const loading = ref(true);
const saving = ref(false);
const savingOrder = ref(false);

// Drag & Drop State for Boxes
const draggedBoxIndex = ref<number | null>(null);
const dragOverBoxIndex = ref<number | null>(null);

// Drag & Drop State for Menu Items
const draggedMenuItem = ref<{ id: string; boxId: string; index: number } | null>(null);
const dragOverMenuItem = ref<{ boxId: string; index: number } | null>(null);

// Visual Feedback
const showSuccessToast = ref(false);
const lastMovedBoxId = ref<string | null>(null);
const lastMovedMenuItemId = ref<string | null>(null);

// Box Modal
const showAddBoxModal = ref(false);
const editingBox = ref<Box | null>(null);
const boxForm = ref({
  title: '',
  description: '',
  color: 'blue',
  icon: '',
});

// Menu Item Modal
const showMenuItemModal = ref(false);
const editingMenuItem = ref<MenuItem | null>(null);
const currentBoxId = ref<string | null>(null);
const menuItemForm = ref({
  title: '',
  description: '',
  url: '',
  color: 'blue',
  open_in_new_tab: false,
});

// Delete
const deleteTarget = ref<Box | null>(null);

// Functions
function getColorClasses(color: string) {
  return colorOptions[color as keyof typeof colorOptions] || colorOptions.gray;
}

function sortedMenuItems(box: Box): MenuItem[] {
  return [...(box.dashboard_menu_items || [])].sort((a, b) => a.position - b.position);
}

async function loadBoxes() {
  loading.value = true;
  
  const { data, error } = await supabase
    .from('dashboard_boxes')
    .select(`
      *,
      dashboard_menu_items (*)
    `)
    .order('position');

  if (error) {
    console.error('Error loading boxes:', error);
  } else {
    boxes.value = data || [];
  }
  
  loading.value = false;
}

// ========== DRAG & DROP FOR BOXES ==========

function onDragStartBox(event: DragEvent, index: number) {
  draggedBoxIndex.value = index;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('type', 'box');
  }
}

function onDragOverBox(event: DragEvent, index: number) {
  if (draggedBoxIndex.value !== null && draggedBoxIndex.value !== index) {
    dragOverBoxIndex.value = index;
  }
}

async function onDropBox(event: DragEvent) {
  if (draggedBoxIndex.value === null || dragOverBoxIndex.value === null) return;
  if (draggedBoxIndex.value === dragOverBoxIndex.value) return;

  const fromIndex = draggedBoxIndex.value;
  const toIndex = dragOverBoxIndex.value;

  // Reorder locally
  const movedBox = boxes.value.splice(fromIndex, 1)[0];
  boxes.value.splice(toIndex, 0, movedBox);

  // Highlight moved box
  lastMovedBoxId.value = movedBox.id;
  setTimeout(() => { lastMovedBoxId.value = null; }, 1500);

  // Update positions in database
  await saveBoxOrder();
  showSuccess();
  
  onDragEnd();
}

// ========== DRAG & DROP FOR MENU ITEMS ==========

function onDragStartMenuItem(event: DragEvent, item: MenuItem, boxId: string, index: number) {
  draggedMenuItem.value = { id: item.id, boxId, index };
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('type', 'menuItem');
  }
}

function onDragOverMenuItem(event: DragEvent, boxId: string, index: number) {
  if (draggedMenuItem.value && (draggedMenuItem.value.boxId !== boxId || draggedMenuItem.value.index !== index)) {
    dragOverMenuItem.value = { boxId, index };
  }
}

async function onDropMenuItem(event: DragEvent, targetBoxId: string) {
  if (!draggedMenuItem.value || !dragOverMenuItem.value) return;

  const sourceBoxId = draggedMenuItem.value.boxId;
  const sourceIndex = draggedMenuItem.value.index;
  const targetIndex = dragOverMenuItem.value.index;

  if (sourceBoxId === targetBoxId && sourceIndex === targetIndex) {
    onDragEnd();
    return;
  }

  // Find boxes
  const sourceBox = boxes.value.find(b => b.id === sourceBoxId);
  const targetBox = boxes.value.find(b => b.id === targetBoxId);
  
  if (!sourceBox || !targetBox) return;

  const sortedSource = sortedMenuItems(sourceBox);
  const movedItem = sortedSource[sourceIndex];

  if (sourceBoxId === targetBoxId) {
    // Same box - just reorder
    const items = [...sortedSource];
    items.splice(sourceIndex, 1);
    items.splice(targetIndex, 0, movedItem);
    sourceBox.dashboard_menu_items = items;
    await saveMenuItemOrder(sourceBox);
  } else {
    // Different box - move item
    movedItem.box_id = targetBoxId;
    sourceBox.dashboard_menu_items = sortedSource.filter(i => i.id !== movedItem.id);
    
    const targetItems = sortedMenuItems(targetBox);
    targetItems.splice(targetIndex, 0, movedItem);
    targetBox.dashboard_menu_items = targetItems;

    // Update box_id in DB
    await supabase
      .from('dashboard_menu_items')
      .update({ box_id: targetBoxId })
      .eq('id', movedItem.id);

    await saveMenuItemOrder(targetBox);
    await saveMenuItemOrder(sourceBox);
  }

  onDragEnd();
}

function onDragEnd() {
  draggedBoxIndex.value = null;
  dragOverBoxIndex.value = null;
  draggedMenuItem.value = null;
  dragOverMenuItem.value = null;
}

// ========== MOVE UP/DOWN BUTTONS ==========

async function moveBoxUp(index: number) {
  if (index <= 0) return;
  const movedBox = boxes.value[index];
  boxes.value[index] = boxes.value[index - 1];
  boxes.value[index - 1] = movedBox;
  
  // Highlight
  lastMovedBoxId.value = movedBox.id;
  setTimeout(() => { lastMovedBoxId.value = null; }, 1500);
  
  await saveBoxOrder();
  showSuccess();
}

async function moveBoxDown(index: number) {
  if (index >= boxes.value.length - 1) return;
  const movedBox = boxes.value[index];
  boxes.value[index] = boxes.value[index + 1];
  boxes.value[index + 1] = movedBox;
  
  // Highlight
  lastMovedBoxId.value = movedBox.id;
  setTimeout(() => { lastMovedBoxId.value = null; }, 1500);
  
  await saveBoxOrder();
  showSuccess();
}

async function moveMenuItemUp(box: Box, index: number) {
  const items = sortedMenuItems(box);
  if (index <= 0) return;
  const movedItem = items[index];
  items[index] = items[index - 1];
  items[index - 1] = movedItem;
  box.dashboard_menu_items = [...items]; // Force reactivity
  
  lastMovedMenuItemId.value = movedItem.id;
  setTimeout(() => { lastMovedMenuItemId.value = null; }, 1500);
  
  await saveMenuItemOrder(box);
  showSuccess();
}

async function moveMenuItemDown(box: Box, index: number) {
  const items = sortedMenuItems(box);
  if (index >= items.length - 1) return;
  const movedItem = items[index];
  items[index] = items[index + 1];
  items[index + 1] = movedItem;
  box.dashboard_menu_items = [...items]; // Force reactivity
  
  lastMovedMenuItemId.value = movedItem.id;
  setTimeout(() => { lastMovedMenuItemId.value = null; }, 1500);
  
  await saveMenuItemOrder(box);
  showSuccess();
}

// ========== SAVE ORDER TO DATABASE ==========

async function saveBoxOrder() {
  savingOrder.value = true;
  
  const updates = boxes.value.map((box, index) => ({
    id: box.id,
    position: index
  }));

  for (const update of updates) {
    await supabase
      .from('dashboard_boxes')
      .update({ position: update.position })
      .eq('id', update.id);
  }

  savingOrder.value = false;
}

async function saveMenuItemOrder(box: Box) {
  savingOrder.value = true;
  
  const items = box.dashboard_menu_items || [];
  
  for (let i = 0; i < items.length; i++) {
    await supabase
      .from('dashboard_menu_items')
      .update({ position: i })
      .eq('id', items[i].id);
  }

  savingOrder.value = false;
}

function editBox(box: Box) {
  editingBox.value = box;
  boxForm.value = {
    title: box.title,
    description: box.description || '',
    color: box.color,
    icon: box.icon || '',
  };
}

function closeBoxModal() {
  showAddBoxModal.value = false;
  editingBox.value = null;
  boxForm.value = {
    title: '',
    description: '',
    color: 'blue',
    icon: '',
  };
}

async function saveBox() {
  saving.value = true;
  
  const boxData = {
    title: boxForm.value.title,
    description: boxForm.value.description || null,
    color: boxForm.value.color,
    icon: boxForm.value.icon || null,
  };

  if (editingBox.value) {
    await supabase
      .from('dashboard_boxes')
      .update(boxData)
      .eq('id', editingBox.value.id);
  } else {
    const maxPosition = boxes.value.reduce((max, b) => Math.max(max, b.position), -1);
    await supabase
      .from('dashboard_boxes')
      .insert({ ...boxData, position: maxPosition + 1 });
  }

  saving.value = false;
  closeBoxModal();
  await loadBoxes();
}

function confirmDelete(box: Box) {
  deleteTarget.value = box;
}

async function executeDelete() {
  if (!deleteTarget.value) return;
  
  saving.value = true;
  
  await supabase
    .from('dashboard_boxes')
    .delete()
    .eq('id', deleteTarget.value.id);

  saving.value = false;
  deleteTarget.value = null;
  await loadBoxes();
}

function addMenuItem(box: Box) {
  currentBoxId.value = box.id;
  editingMenuItem.value = null;
  menuItemForm.value = {
    title: '',
    description: '',
    url: '',
    color: 'blue',
    open_in_new_tab: false,
  };
  showMenuItemModal.value = true;
}

function editMenuItem(item: MenuItem, box: Box) {
  currentBoxId.value = box.id;
  editingMenuItem.value = item;
  menuItemForm.value = {
    title: item.title,
    description: item.description || '',
    url: item.url || '',
    color: item.color,
    open_in_new_tab: item.open_in_new_tab,
  };
  showMenuItemModal.value = true;
}

function closeMenuItemModal() {
  showMenuItemModal.value = false;
  editingMenuItem.value = null;
  currentBoxId.value = null;
}

async function saveMenuItem() {
  if (!currentBoxId.value) return;
  
  saving.value = true;
  
  const itemData = {
    box_id: currentBoxId.value,
    title: menuItemForm.value.title,
    description: menuItemForm.value.description || null,
    url: menuItemForm.value.url,
    color: menuItemForm.value.color,
    open_in_new_tab: menuItemForm.value.open_in_new_tab,
  };

  if (editingMenuItem.value) {
    await supabase
      .from('dashboard_menu_items')
      .update(itemData)
      .eq('id', editingMenuItem.value.id);
  } else {
    const box = boxes.value.find(b => b.id === currentBoxId.value);
    const maxPosition = (box?.dashboard_menu_items || []).reduce((max, m) => Math.max(max, m.position), -1);
    await supabase
      .from('dashboard_menu_items')
      .insert({ ...itemData, position: maxPosition + 1 });
  }

  saving.value = false;
  closeMenuItemModal();
  await loadBoxes();
}

async function deleteMenuItem(item: MenuItem) {
  if (!confirm(`ต้องการลบเมนู "${item.title}" ใช่หรือไม่?`)) return;
  
  await supabase
    .from('dashboard_menu_items')
    .delete()
    .eq('id', item.id);

  await loadBoxes();
}

// ========== SHOW SUCCESS TOAST ==========

function showSuccess() {
  showSuccessToast.value = true;
  setTimeout(() => {
    showSuccessToast.value = false;
  }, 2000);
}

// Lifecycle
onMounted(() => {
  loadBoxes();
});
</script>

<style scoped>
/* Toast animation */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
