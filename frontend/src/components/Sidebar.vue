<script setup>
import { ref } from 'vue'

const emit = defineEmits(['menu-change'])

const activeKey = ref('firmware')
const collapsed = ref(false)

const menuOptions = [
  {
    label: 'Firmware',
    key: 'firmware'
  },
  {
    label: 'VerRev',
    key: 'verrev'
  },
  {
    label: 'VerRevCnt',
    key: 'verrevcnt'
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
  }
]

const handleMenuSelect = (key) => {
  activeKey.value = key
  emit('menu-change', key)
}
</script>

<template>
  <div class="bg-gray-900 border-r border-gray-600">
    <n-menu 
      :value="activeKey"
      :options="menuOptions"
      @update:value="handleMenuSelect"
      :indent="24"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      inverted
    />
</div>
</template>

<style scoped>
/* CSS 변수 오버라이드로 배경색 설정 */
:deep(.n-menu) {
  --n-item-color-hover: rgba(79, 148, 245, 0.15) !important;
  --n-item-color-active: rgba(79, 148, 245, 0.25) !important;
  --n-item-color-active-hover: rgba(79, 148, 245, 0.35) !important;
  --n-item-color-active-collapsed: rgba(79, 148, 245, 0.25) !important;


}

/* 추가 스타일 for better visibility */




</style>
