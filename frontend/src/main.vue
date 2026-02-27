<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import FirmwarePage from './components/FirmwarePage.vue'
import VerRevTable from './components/firmware/VerRevTable.vue'
import VerRevCntTable from './components/firmware/VerRevCntTable.vue'
import BuyerTable from './components/firmware/BuyerTable.vue'
import ModelTable from './components/firmware/ModelTable.vue'
import ReleaseTypeTable from './components/firmware/ReleaseTypeTable.vue'
import BuildModeTable from './components/firmware/BuildModeTable.vue'
import PriorityTable from './components/firmware/PriorityTable.vue'
import PlatformKeyTable from './components/firmware/PlatformKeyTable.vue'
import EncryptLvTable from './components/firmware/EncryptLvTable.vue'

const currentPage = ref('firmware')

const handleMenuChange = (page) => {
  currentPage.value = page
}
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-900 font-poppins ">
    <!-- 상단 헤더 -->
    <div class="px-20 pt-6 pb-4 flex items-center border border-gray-600">
      <h1 class="text-2xl font-bold text-white">FW Update</h1>
      <nav class="flex items-center space-x-2 text-sm text-gray-300 px-20">
        <span class="hover:text-white cursor-pointer">Home</span>
        <span>/</span>
        <span class="text-white font-medium">{{ currentPage.charAt(0).toUpperCase() + currentPage.slice(1) }}</span>
      </nav>
    </div>

    <!-- 메인 레이아웃 -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar (왼쪽) -->
      <div class="w-64 flex-shrink-0 ">
        <Sidebar class="overflow-hidden  h-full" @menu-change="handleMenuChange" />
      </div>

      <!-- Main Content Area (오른쪽) -->
      <div class="flex-1 p-6 overflow-auto">
        <FirmwarePage v-if="currentPage === 'firmware'" />
        <VerRevTable v-else-if="currentPage === 'verrev'" />
        <VerRevCntTable v-else-if="currentPage === 'verrevcnt'" />
        <BuyerTable v-else-if="currentPage === 'buyer'" />
        <ModelTable v-else-if="currentPage === 'model'" />
        <ReleaseTypeTable v-else-if="currentPage === 'releasetype'" />
        <BuildModeTable v-else-if="currentPage === 'buildmode'" />
        <PriorityTable v-else-if="currentPage === 'priority'" />
        <PlatformKeyTable v-else-if="currentPage === 'platformkey'" />
        <EncryptLvTable v-else-if="currentPage === 'encryptlv'" />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
