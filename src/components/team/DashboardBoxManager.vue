<template>
  <div class="space-y-6">
    <!-- Year Tabs Section -->
    <div class="bg-gray-700/30 rounded-xl p-4 border border-gray-600/50">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <h4 class="text-sm font-semibold text-white">แท็บปี (Year Tabs)</h4>
        </div>
        <button
          @click="showYearTabModal = true"
          class="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 hover:text-amber-200 border border-amber-600/30 rounded-lg transition-all duration-200"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          เพิ่มแท็บปี
        </button>
      </div>

      <!-- Year Tabs List -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tab in yearTabs"
          :key="tab.id"
          @click="selectYearTab(tab)"
          :class="[
            'group relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300',
            selectedYearTab?.id === tab.id
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 scale-105'
              : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
          ]"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span>{{ tab.label || `ปี ${tab.year}` }}</span>
          <span
            v-if="tab.is_default"
            class="px-1.5 py-0.5 text-[10px] rounded-full bg-white/20"
          >Default</span>
          <span
            class="ml-1 text-xs opacity-60"
          >({{ getBoxCountForTab(tab.id) }})</span>
          <!-- Edit/Delete Year Tab (on hover) -->
          <div class="absolute -top-1 -right-1 hidden group-hover:flex gap-0.5">
            <button
              @click.stop="editYearTab(tab)"
              class="p-1 bg-gray-800 hover:bg-blue-600 rounded-full text-white shadow-lg transition-colors"
              title="แก้ไข"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button
              @click.stop="confirmDeleteYearTab(tab)"
              class="p-1 bg-gray-800 hover:bg-red-600 rounded-full text-white shadow-lg transition-colors"
              title="ลบ"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </button>

        <!-- No year tabs state -->
        <div v-if="!yearTabs.length && !loading" class="text-sm text-gray-500 py-2">
          ยังไม่มีแท็บปี — กดปุ่ม "เพิ่มแท็บปี" เพื่อเริ่มต้น
        </div>
      </div>
    </div>

    <!-- Header with Add Button -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-semibold text-white">
          จัดการกล่อง Dashboard
          <span v-if="selectedYearTab" class="text-amber-400 text-base font-normal ml-2">
            — {{ selectedYearTab.label || `ปี ${selectedYearTab.year}` }}
          </span>
        </h3>
        <p class="text-sm text-gray-400">ลากเพื่อจัดลำดับกล่องและเมนู หรือใช้ปุ่มลูกศร</p>
      </div>
      <button
        @click="showAddBoxModal = true"
        :disabled="!selectedYearTab"
        class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        เพิ่มกล่องใหม่
      </button>
    </div>

    <!-- No Year Tab Selected Warning -->
    <div v-if="!selectedYearTab && yearTabs.length > 0 && !loading" class="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-amber-300 flex items-center gap-3">
      <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span class="text-sm">กรุณาเลือกแท็บปีด้านบนเพื่อดูและจัดการกล่อง Dashboard</span>
    </div>

    <!-- Boxes List (Sortable) -->
    <div 
      v-if="selectedYearTab"
      class="space-y-4"
      @dragover.prevent
      @drop="onDropBox($event)"
    >
      <div
        v-for="(box, boxIndex) in filteredBoxes"
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
              :disabled="boxIndex === filteredBoxes.length - 1 || savingOrder"
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
      <div v-if="!filteredBoxes.length && !loading && selectedYearTab" class="text-center py-12 bg-gray-700/30 rounded-xl border border-gray-600/50">
        <svg class="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
        <p class="text-gray-400">ยังไม่มีกล่อง Dashboard ในแท็บ "{{ selectedYearTab.label || `ปี ${selectedYearTab.year}` }}"</p>
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

    <!-- Error Toast -->
    <Transition name="toast">
      <div 
        v-if="showErrorToast" 
        class="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 max-w-sm"
      >
        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>{{ errorMessage }}</span>
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

    <!-- Add/Edit Year Tab Modal -->
    <div v-if="showYearTabModal || editingYearTab" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="closeYearTabModal"></div>
      <div class="relative bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl">
        <h3 class="text-xl font-semibold text-white mb-4">
          {{ editingYearTab ? 'แก้ไขแท็บปี' : 'เพิ่มแท็บปีใหม่' }}
        </h3>
        
        <form @submit.prevent="saveYearTab" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">ปี (พ.ศ./ค.ศ.) *</label>
            <input
              v-model.number="yearTabForm.year"
              type="number"
              required
              min="2020"
              max="2099"
              class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="เช่น 2026"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">ป้ายแสดง (Label)</label>
            <input
              v-model="yearTabForm.label"
              type="text"
              class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              :placeholder="`เช่น ข้อมูลปี ${yearTabForm.year || '2026'}`"
            >
          </div>
          
          <div class="flex items-center gap-3">
            <input
              v-model="yearTabForm.is_default"
              type="checkbox"
              id="yearDefault"
              class="w-4 h-4 rounded border-gray-600 bg-gray-700 text-amber-600 focus:ring-amber-500"
            >
            <label for="yearDefault" class="text-sm text-gray-300">ตั้งเป็นแท็บเริ่มต้น (Default)</label>
          </div>
          
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="closeYearTabModal"
              class="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {{ saving ? 'กำลังบันทึก...' : 'บันทึก' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Year Tab Confirmation Modal -->
    <div v-if="deleteYearTabTarget" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="deleteYearTabTarget = null"></div>
      <div class="relative bg-gray-800 rounded-2xl p-6 w-full max-w-sm border border-gray-700 shadow-2xl">
        <div class="text-center">
          <div class="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">ลบแท็บปี</h3>
          <p class="text-gray-400 mb-2">คุณต้องการลบ "{{ deleteYearTabTarget.label || `ปี ${deleteYearTabTarget.year}` }}" ใช่หรือไม่?</p>
          <p class="text-amber-400 text-sm mb-6">
            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            กล่องที่อยู่ในแท็บนี้จะถูกเปลี่ยนเป็นไม่มีแท็บ ({{ getBoxCountForTab(deleteYearTabTarget.id) }} กล่อง)
          </p>
          <div class="flex gap-3">
            <button
              @click="deleteYearTabTarget = null"
              class="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              ยกเลิก
            </button>
            <button
              @click="executeDeleteYearTab"
              :disabled="saving"
              class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {{ saving ? 'กำลังลบ...' : 'ลบแท็บปี' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
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
  year_tab_id?: string | null;
  dashboard_menu_items?: MenuItem[];
}

interface YearTab {
  id: string;
  year: number;
  label?: string;
  is_active: boolean;
  is_default: boolean;
  position: number;
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

// Year Tab State
const yearTabs = ref<YearTab[]>([]);
const selectedYearTab = ref<YearTab | null>(null);
const showYearTabModal = ref(false);
const editingYearTab = ref<YearTab | null>(null);
const deleteYearTabTarget = ref<YearTab | null>(null);
const yearTabForm = ref({
  year: new Date().getFullYear(),
  label: '',
  is_default: false,
});

// Computed: Filter boxes by selected year tab
const filteredBoxes = computed(() => {
  if (!selectedYearTab.value) return [];
  return boxes.value.filter(box => box.year_tab_id === selectedYearTab.value!.id);
});

// Helper: count boxes in a year tab
function getBoxCountForTab(tabId: string): number {
  return boxes.value.filter(b => b.year_tab_id === tabId).length;
}

// Drag & Drop State for Boxes
const draggedBoxIndex = ref<number | null>(null);
const dragOverBoxIndex = ref<number | null>(null);

// Drag & Drop State for Menu Items
const draggedMenuItem = ref<{ id: string; boxId: string; index: number } | null>(null);
const dragOverMenuItem = ref<{ boxId: string; index: number } | null>(null);

// Visual Feedback
const showSuccessToast = ref(false);
const showErrorToast = ref(false);
const errorMessage = ref('');
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
  
  // Load year tabs first
  await loadYearTabs();
  
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

async function loadYearTabs() {
  const { data, error } = await supabase
    .from('dashboard_year_tabs')
    .select('*')
    .eq('is_active', true)
    .order('position');

  if (error) {
    console.error('Error loading year tabs:', error);
    return;
  }

  yearTabs.value = data || [];

  // Auto-select default tab if none selected
  if (!selectedYearTab.value && yearTabs.value.length > 0) {
    const defaultTab = yearTabs.value.find(t => t.is_default);
    selectedYearTab.value = defaultTab || yearTabs.value[0];
  }
}

function selectYearTab(tab: YearTab) {
  selectedYearTab.value = tab;
}

function editYearTab(tab: YearTab) {
  editingYearTab.value = tab;
  yearTabForm.value = {
    year: tab.year,
    label: tab.label || '',
    is_default: tab.is_default,
  };
}

function closeYearTabModal() {
  showYearTabModal.value = false;
  editingYearTab.value = null;
  yearTabForm.value = {
    year: new Date().getFullYear(),
    label: '',
    is_default: false,
  };
}

async function saveYearTab() {
  saving.value = true;

  const tabData = {
    year: yearTabForm.value.year,
    label: yearTabForm.value.label || `ข้อมูลปี ${yearTabForm.value.year}`,
    is_default: yearTabForm.value.is_default,
  };

  // If marking as default, unset other defaults first
  if (tabData.is_default) {
    await supabase
      .from('dashboard_year_tabs')
      .update({ is_default: false })
      .neq('id', editingYearTab.value?.id || '00000000-0000-0000-0000-000000000000');
  }

  if (editingYearTab.value) {
    await supabase
      .from('dashboard_year_tabs')
      .update(tabData)
      .eq('id', editingYearTab.value.id);
  } else {
    const maxPosition = yearTabs.value.reduce((max, t) => Math.max(max, t.position), -1);
    await supabase
      .from('dashboard_year_tabs')
      .insert({ ...tabData, position: maxPosition + 1 });
  }

  saving.value = false;
  closeYearTabModal();
  await loadYearTabs();
  
  // Re-select updated tab
  if (editingYearTab.value) {
    const updated = yearTabs.value.find(t => t.year === tabData.year);
    if (updated) selectedYearTab.value = updated;
  } else {
    // Select newly created tab
    const newTab = yearTabs.value.find(t => t.year === tabData.year);
    if (newTab) selectedYearTab.value = newTab;
  }
}

function confirmDeleteYearTab(tab: YearTab) {
  deleteYearTabTarget.value = tab;
}

async function executeDeleteYearTab() {
  if (!deleteYearTabTarget.value) return;
  
  saving.value = true;

  // Unlink boxes from this year tab (set year_tab_id to null)
  await supabase
    .from('dashboard_boxes')
    .update({ year_tab_id: null })
    .eq('year_tab_id', deleteYearTabTarget.value.id);

  // Delete the year tab
  await supabase
    .from('dashboard_year_tabs')
    .delete()
    .eq('id', deleteYearTabTarget.value.id);

  saving.value = false;
  
  // If we deleted the currently selected tab, reset selection
  if (selectedYearTab.value?.id === deleteYearTabTarget.value.id) {
    selectedYearTab.value = null;
  }
  
  deleteYearTabTarget.value = null;
  await loadYearTabs();
  await loadBoxes();
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
  const filtered = filteredBoxes.value;

  // Get the actual box references
  const movedBox = filtered[fromIndex];
  const realFrom = boxes.value.findIndex(b => b.id === movedBox.id);

  // 🔄 Optimistic UI: Save original state for rollback
  const originalBoxes = JSON.parse(JSON.stringify(boxes.value));

  // Remove from original position and insert at target
  boxes.value.splice(realFrom, 1);
  // Find the real position of the target in the main array
  const targetBox = filtered[toIndex > fromIndex ? toIndex : toIndex];
  let realTo = boxes.value.findIndex(b => b.id === targetBox?.id);
  if (toIndex > fromIndex && realTo >= 0) realTo += 1;
  if (realTo < 0) realTo = boxes.value.length;
  boxes.value.splice(realTo, 0, movedBox);

  // Highlight moved box
  lastMovedBoxId.value = movedBox.id;
  setTimeout(() => { lastMovedBoxId.value = null; }, 1500);

  onDragEnd();

  // Save to server in background
  try {
    await saveBoxOrder();
    showSuccess();
  } catch (error) {
    // ❌ Rollback on error
    console.error('Error saving box order:', error);
    boxes.value = originalBoxes;
    showError('ไม่สามารถบันทึกลำดับกล่องได้ กรุณาลองใหม่');
  }
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

  // 🔄 Optimistic UI: Save original state for rollback
  const originalSourceItems = JSON.parse(JSON.stringify(sourceBox.dashboard_menu_items || []));
  const originalTargetItems = sourceBoxId !== targetBoxId 
    ? JSON.parse(JSON.stringify(targetBox.dashboard_menu_items || [])) 
    : null;

  const sortedSource = sortedMenuItems(sourceBox);
  const movedItem = { ...sortedSource[sourceIndex] };

  // Highlight moved item
  lastMovedMenuItemId.value = movedItem.id;
  setTimeout(() => { lastMovedMenuItemId.value = null; }, 1500);

  // Apply changes locally FIRST (Optimistic)
  if (sourceBoxId === targetBoxId) {
    // Same box - just reorder
    const items = [...sortedSource];
    items.splice(sourceIndex, 1);
    items.splice(targetIndex, 0, movedItem);
    
    // ⚡ Update position property for each item (critical for proper sorting!)
    items.forEach((item, i) => {
      item.position = i;
    });
    
    sourceBox.dashboard_menu_items = items;
  } else {
    // Different box - move item
    movedItem.box_id = targetBoxId;
    
    // Update source box
    const newSourceItems = sortedSource.filter(i => i.id !== movedItem.id);
    newSourceItems.forEach((item, i) => {
      item.position = i;
    });
    sourceBox.dashboard_menu_items = newSourceItems;
    
    // Update target box
    const targetItems = sortedMenuItems(targetBox);
    targetItems.splice(targetIndex, 0, movedItem);
    targetItems.forEach((item, i) => {
      item.position = i;
    });
    targetBox.dashboard_menu_items = targetItems;
  }

  onDragEnd();

  // Save to server in background
  try {
    if (sourceBoxId === targetBoxId) {
      await saveMenuItemOrder(sourceBox);
    } else {
      // Update box_id in DB
      const { error: updateError } = await supabase
        .from('dashboard_menu_items')
        .update({ box_id: targetBoxId })
        .eq('id', movedItem.id);
      
      if (updateError) throw updateError;

      await saveMenuItemOrder(targetBox);
      await saveMenuItemOrder(sourceBox);
    }
    showSuccess();
  } catch (error) {
    // ❌ Rollback on error
    console.error('Error saving menu order:', error);
    sourceBox.dashboard_menu_items = originalSourceItems;
    if (originalTargetItems !== null) {
      targetBox.dashboard_menu_items = originalTargetItems;
    }
    showError('ไม่สามารถบันทึกลำดับเมนูได้ กรุณาลองใหม่');
  }
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
  const filtered = filteredBoxes.value;
  
  // Get the actual box references from main array
  const boxA = filtered[index];
  const boxB = filtered[index - 1];
  const realIndexA = boxes.value.findIndex(b => b.id === boxA.id);
  const realIndexB = boxes.value.findIndex(b => b.id === boxB.id);
  
  // 🔄 Optimistic UI: Save original state for rollback
  const originalBoxes = JSON.parse(JSON.stringify(boxes.value));
  
  // Swap in main array
  boxes.value[realIndexA] = boxB;
  boxes.value[realIndexB] = boxA;
  
  // Highlight
  lastMovedBoxId.value = boxA.id;
  setTimeout(() => { lastMovedBoxId.value = null; }, 1500);
  
  // Save in background
  try {
    await saveBoxOrder();
    showSuccess();
  } catch (error) {
    // ❌ Rollback on error
    console.error('Error moving box up:', error);
    boxes.value = originalBoxes;
    showError('ไม่สามารถเลื่อนกล่องได้ กรุณาลองใหม่');
  }
}

async function moveBoxDown(index: number) {
  const filtered = filteredBoxes.value;
  if (index >= filtered.length - 1) return;
  
  // Get the actual box references from main array
  const boxA = filtered[index];
  const boxB = filtered[index + 1];
  const realIndexA = boxes.value.findIndex(b => b.id === boxA.id);
  const realIndexB = boxes.value.findIndex(b => b.id === boxB.id);
  
  // 🔄 Optimistic UI: Save original state for rollback
  const originalBoxes = JSON.parse(JSON.stringify(boxes.value));
  
  // Swap in main array
  boxes.value[realIndexA] = boxB;
  boxes.value[realIndexB] = boxA;
  
  // Highlight
  lastMovedBoxId.value = boxA.id;
  setTimeout(() => { lastMovedBoxId.value = null; }, 1500);
  
  // Save in background
  try {
    await saveBoxOrder();
    showSuccess();
  } catch (error) {
    // ❌ Rollback on error
    console.error('Error moving box down:', error);
    boxes.value = originalBoxes;
    showError('ไม่สามารถเลื่อนกล่องได้ กรุณาลองใหม่');
  }
}

async function moveMenuItemUp(box: Box, index: number) {
  const items = sortedMenuItems(box);
  if (index <= 0) return;
  
  // 🔄 Optimistic UI: Save original state for rollback
  const originalItems = JSON.parse(JSON.stringify(box.dashboard_menu_items || []));
  
  const movedItem = items[index];
  const swappedItem = items[index - 1];
  
  // Swap items in array
  items[index] = swappedItem;
  items[index - 1] = movedItem;
  
  // ⚡ Update position property for each item (critical for proper sorting!)
  items.forEach((item, i) => {
    item.position = i;
  });
  
  box.dashboard_menu_items = [...items]; // Force reactivity
  
  lastMovedMenuItemId.value = movedItem.id;
  setTimeout(() => { lastMovedMenuItemId.value = null; }, 1500);
  
  // Save in background
  try {
    await saveMenuItemOrder(box);
    showSuccess();
  } catch (error) {
    // ❌ Rollback on error
    console.error('Error moving menu item up:', error);
    box.dashboard_menu_items = originalItems;
    showError('ไม่สามารถเลื่อนเมนูได้ กรุณาลองใหม่');
  }
}

async function moveMenuItemDown(box: Box, index: number) {
  const items = sortedMenuItems(box);
  if (index >= items.length - 1) return;
  
  // 🔄 Optimistic UI: Save original state for rollback
  const originalItems = JSON.parse(JSON.stringify(box.dashboard_menu_items || []));
  
  const movedItem = items[index];
  const swappedItem = items[index + 1];
  
  // Swap items in array
  items[index] = swappedItem;
  items[index + 1] = movedItem;
  
  // ⚡ Update position property for each item (critical for proper sorting!)
  items.forEach((item, i) => {
    item.position = i;
  });
  
  box.dashboard_menu_items = [...items]; // Force reactivity
  
  lastMovedMenuItemId.value = movedItem.id;
  setTimeout(() => { lastMovedMenuItemId.value = null; }, 1500);
  
  // Save in background
  try {
    await saveMenuItemOrder(box);
    showSuccess();
  } catch (error) {
    // ❌ Rollback on error
    console.error('Error moving menu item down:', error);
    box.dashboard_menu_items = originalItems;
    showError('ไม่สามารถเลื่อนเมนูได้ กรุณาลองใหม่');
  }
}

// ========== SAVE ORDER TO DATABASE ==========

async function saveBoxOrder() {
  savingOrder.value = true;
  
  const updates = boxes.value.map((box, index) => ({
    id: box.id,
    position: index
  }));

  const errors = [];
  for (const update of updates) {
    const { error } = await supabase
      .from('dashboard_boxes')
      .update({ position: update.position })
      .eq('id', update.id);
    
    if (error) errors.push(error);
  }

  savingOrder.value = false;
  
  if (errors.length > 0) {
    throw new Error('Failed to save box order');
  }
}

async function saveMenuItemOrder(box: Box) {
  savingOrder.value = true;
  
  const items = box.dashboard_menu_items || [];
  const errors = [];
  
  for (let i = 0; i < items.length; i++) {
    const { error } = await supabase
      .from('dashboard_menu_items')
      .update({ position: i })
      .eq('id', items[i].id);
    
    if (error) errors.push(error);
  }

  savingOrder.value = false;
  
  if (errors.length > 0) {
    throw new Error('Failed to save menu item order');
  }
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
    year_tab_id: selectedYearTab.value?.id || null,
  };

  if (editingBox.value) {
    await supabase
      .from('dashboard_boxes')
      .update(boxData)
      .eq('id', editingBox.value.id);
  } else {
    const maxPosition = filteredBoxes.value.reduce((max, b) => Math.max(max, b.position), -1);
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

// ========== SHOW SUCCESS/ERROR TOAST ==========

function showSuccess() {
  showSuccessToast.value = true;
  setTimeout(() => {
    showSuccessToast.value = false;
  }, 2000);
}

function showError(message: string) {
  errorMessage.value = message;
  showErrorToast.value = true;
  setTimeout(() => {
    showErrorToast.value = false;
    errorMessage.value = '';
  }, 4000);
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
