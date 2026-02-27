<script setup>
import { ref } from 'vue'

const emit = defineEmits(['menu-change'])

const menuItems = ref([
  { 
    name: 'Firmware', 
    page: 'firmware', 
  
  },
  { 
    name: 'VerRev', 
    page: 'verrev', 
    active: false
  },
  { 
    name: 'VerRevCnt', 
    page: 'verrevcnt', 
    active: false
  },
  { 
    name: 'Buyer', 
    page: 'buyer', 
    active: false
  },
  { 
    name: 'Model', 
    page: 'model',  
    active: false
  },
  { 
    name: 'Release Type', 
    page: 'releasetype', 
    active: false
  },
  { 
    name: 'Build Mode', 
    page: 'buildmode', 
    active: false
  },
  { 
    name: 'Priority', 
    page: 'priority', 
    active: false
  },
  { 
    name: 'Platform Key', 
    page: 'platformkey', 
    active: false
  },
  { 
    name: 'EncryptLv', 
    page: 'encryptlv', 
    active: false
  }
])

const selectMenu = (index) => {
  const item = menuItems.value[index]
  
  if (item.hasSubmenu) {
    item.expanded = !item.expanded
  } else {
    menuItems.value.forEach((item, i) => {
      item.active = i === index
      if (item.hasSubmenu) {
        item.expanded = false
      }
    })
    emit('menu-change', item.page)
  }
}

const selectSubmenu = (parentIndex, submenuPage) => {
  menuItems.value.forEach((item, i) => {
    item.active = i === parentIndex
  })
  emit('menu-change', submenuPage)
}
</script>

<template>
  <div class="w-56 bg-gray-300 from-emerald-500 to-emerald-700 text-gray-700 flex flex-col">

    <!-- Menu Items -->
    <nav class="flex-1 px-4 py-6">
      <ul class="space-y-2">
        <li v-for="(item, index) in menuItems" :key="index">
          <a 
            @click="selectMenu(index)"
            href="#"
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
              item.active 
                ? 'bg-gray-400 shadow-lg' 
                : 'hover:bg-gray-400/20'
            ]"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path :d="item.icon" />
            </svg>
            <span class="text-xs font-medium tracking-wide flex-1">{{ item.name }}</span>
            <svg v-if="item.hasSubmenu" 
                 class="w-4 h-4 transition-transform duration-200" 
                 :class="{ 'rotate-180': item.expanded }"
                 fill="currentColor" 
                 viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </a>
          
          <!-- Submenu -->
          <ul v-if="item.hasSubmenu && item.expanded" class="mt-2 ml-4 space-y-1">
            <li v-for="(subitem, subindex) in item.submenu" :key="subindex">
              <a 
                @click.stop="selectSubmenu(index, subitem.page)"
                href="#"
                class="flex items-center gap-2 px-4 py-2 rounded-lg text-xs hover:bg-gray-400/30 transition-all duration-200"
              >
                <span class="w-2 h-2 rounded-full bg-gray-500"></span>
                <span>{{ subitem.name }}</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
</style>
