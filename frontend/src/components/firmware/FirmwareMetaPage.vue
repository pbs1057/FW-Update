<template>
  <div style="max-width: 1400px; margin: 0 auto; padding: 0 16px;">
  <div class="firmware-meta-page">
    <n-page-header title="Firmware Metadata Management">
      <template #header>
      </template>
    </n-page-header>

    <n-space vertical :size="16" style="margin-top: 16px;">
      <n-grid :cols="2" :x-gap="16" :y-gap="16">
        <n-gi>
          <VerRevTable />
        </n-gi>
        <n-gi>
          <VerRevCntTable />
        </n-gi>
        <n-gi>
          <BuyerTable />
        </n-gi>
        <n-gi>
          <ModelTable />
        </n-gi>
        <n-gi>
          <ReleaseTypeTable />
        </n-gi>
        <n-gi>
          <BuildModeTable />
        </n-gi>
        <n-gi>
          <PriorityTable />
        </n-gi>
        <n-gi>
          <PlatformKeyTable />
        </n-gi>
        <n-gi :span="2">
          <EncryptLvTable />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
  </div>
</template>

<script setup lang="ts">
import VerRevTable from './VerRevTable.vue'
import VerRevCntTable from './VerRevCntTable.vue'
import BuyerTable from './BuyerTable.vue'
import ModelTable from './ModelTable.vue'
import ReleaseTypeTable from './ReleaseTypeTable.vue'
import BuildModeTable from './BuildModeTable.vue'
import PriorityTable from './PriorityTable.vue'
import PlatformKeyTable from './PlatformKeyTable.vue'
import EncryptLvTable from './EncryptLvTable.vue'
</script>

<style scoped>
.firmware-meta-page {
  padding: 16px;
}

:deep(.n-page-header__title) {
  color: #e5e7eb !important;
}
</style>
