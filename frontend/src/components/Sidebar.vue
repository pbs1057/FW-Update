<script setup>
import { ref, inject } from 'vue'

const emit = defineEmits(['menuChange'])
const isDark = inject('isDark', ref(true))

const activeKey = ref('firmware')
const collapsed = ref(false)

// 메뉴 선택 핸들러
const handleMenuSelect = (key) => {
  activeKey.value = key
  emit('menuChange', key)
}

const menuOptions = [
  {
    label: 'Firmware',
    key: 'firmware'
  },
  {
    label: 'VerRev',
    key: 'verRev'
  },
  {
    label: 'VerRevCnt',
    key: 'verRevCnt'
  },
  {
    label: 'Buyer',
    key: 'buyer'
  },
  {
    label: 'Model',
    key: 'model'
  },
  {
    label: 'Release Type',
    key: 'releasetype'
  },
  {
    label: 'Build Mode',
    key: 'buildmode'
  },
  {
    label: 'Priority',
    key: 'priority'
  },
  {
    label: 'Platform Key',
    key: 'platformkey'
  },
  {
    label: 'EncryptLv',
    key: 'encryptlv'
  },

]
</script>

<template>
  <div class="border-r border-gray-600">
    <n-menu :value="activeKey" :options="menuOptions" @update:value="handleMenuSelect" :indent="24"
      :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :inverted="isDark" />
  </div>
</template>

<style scoped>
/* CSS 변수 오버라이드로 배경색 설정 */
:deep(.n-menu) {
  --n-item-color-hover: rgba(79, 148, 245, 0.15) !important;
  --n-item-color-active: rgba(79, 148, 245, 0.25) !important;
  --n-item-color-active-hover: rgba(79, 148, 245, 0.35) !important;
  --n-item-color-active-collapsed: rgba(79, 148, 245, 0.25) !important;
  --n-item-text-color-hover: var(--accent-color) !important;
  --n-item-text-color-active: var(--accent-color) !important;
  --n-item-text-color-active-hover: var(--accent-color) !important;
}
</style>
