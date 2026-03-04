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
import Login from './components/firmware/Login.vue'
import { NConfigProvider, NMessageProvider, NDialogProvider, NGlobalStyle, NButton, NIcon, darkTheme, lightTheme } from 'naive-ui'
import { computed, provide, watchEffect } from 'vue'
import { useAuthStore } from './stores/useAuthStore'

const authStore = useAuthStore()
const currentPage = ref('firmware')
const isDark = ref(localStorage.getItem('theme') !== 'light')
const theme = computed(() => isDark.value ? darkTheme : lightTheme)
provide('isDark', isDark)

watchEffect(() => {
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
})

watchEffect(() => {
  const root = document.documentElement
  if (isDark.value) {
    root.style.setProperty('--accent-color', 'rgb(101, 184, 229)')
    root.style.setProperty('--accent-color-10', 'rgba(32, 128, 240, 0.1)')
    root.style.setProperty('--accent-color-15', 'rgba(32, 128, 240, 0.15)')
    root.style.setProperty('--accent-color-20', 'rgba(32, 128, 240, 0.2)')
    root.style.setProperty('--select-menu-bg', '#1a2a3a')
    root.style.setProperty('--select-menu-text', '#ffffff')
  } else {
    root.style.setProperty('--accent-color', '#2080f0')
    root.style.setProperty('--accent-color-10', 'rgba(32, 128, 240, 0.1)')
    root.style.setProperty('--accent-color-15', 'rgba(32, 128, 240, 0.15)')
    root.style.setProperty('--accent-color-20', 'rgba(32, 128, 240, 0.2)')
    root.style.setProperty('--select-menu-bg', '#ffffff')
    root.style.setProperty('--select-menu-text', '#333333')
  }
})

const handleMenuChange = (page) => {
  currentPage.value = page
}

const toggleTheme = () => {
  isDark.value = !isDark.value
}
</script>

<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <n-message-provider>
      <n-dialog-provider>
      <!-- 로그인 페이지 -->
      <div v-if="!authStore.isLoggedIn" class="flex items-center justify-center h-screen">
        <Login />
      </div>

      <!-- 메인 앱 레이아웃 -->
      <div v-else class="flex flex-col h-screen font-poppins">
        <!-- 상단 헤더 -->
        <div class="px-20 pt-6 pb-4 flex items-center border-b border-gray-600">
          <h1 class="text-2xl font-bold">FW Update</h1>
          <nav class="flex items-center space-x-2 text-sm px-20" style="opacity: 0.7;">
            <span class="cursor-pointer">Home</span>
            <span>/</span>
            <span class="font-medium" style="opacity: 1;">{{ currentPage.charAt(0).toUpperCase() + currentPage.slice(1) }}</span>
          </nav>
          <!-- 테마 토글 버튼 -->
          <div class="ml-auto ">
            <n-button type="info" ghost @click="toggleTheme">
              {{ isDark ? 'Dark' : 'Light' }}
            </n-button >
            
          </div>
          <div class="ml-2">
          <n-button type="info" ghost @click="authStore.logout()">Logout</n-button>
          </div>
        </div>

        <!-- 메인 레이아웃 -->
        <div class="flex flex-1 overflow-hidden">
          <!-- Sidebar (왼쪽) -->
          <div class="w-64 flex-shrink-0 ">
            <Sidebar class="overflow-hidden h-full" @menu-change="handleMenuChange" />
          </div>

          <!-- Main Content Area (오른쪽) -->
          <div class="flex-1 p-6 overflow-auto">
            <FirmwarePage v-if="currentPage === 'firmware'" />
            <VerRevTable v-else-if="currentPage === 'verRev'" />
            <VerRevCntTable v-else-if="currentPage === 'verRevCnt'" />
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
      <!-- /메인 앱 레이아웃 -->
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
</style>
