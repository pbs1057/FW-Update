<template>
  <div style="max-width: 1000px; margin: 0 auto; padding: 0 16px;">
    <n-space justify="space-between" align="center" style=" padding: 0 24px;">
      <n-gradient-text type="info" :size="24">VerRevCnt</n-gradient-text>
      <n-space>
        <n-select v-model:value="searchModel" :options="modelOptions" placeholder="Model" clearable
          style="width: 150px;" />
        <n-button @click="handleClear"type="info" ghost>Reset</n-button>
      </n-space>
    </n-space>
    <n-card style=" background-color: transparent;" :bordered="false">

      <n-data-table 
        :columns="columns" 
        :data="filteredData" 
        :pagination="pagination" 
        :row-key="(row: VerRevCnt) => row.id"
        max-height="65vh"
        :scroll-x="800" 
      />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NGradientText } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { useFirmwareMetaStore } from '../../stores/useFirmwareMetaStore'
import type { VerRevCnt } from '../../type/type'
import { useMetaOptions } from '../../composables/useMetaOptions'

const metaStore = useFirmwareMetaStore()

const { modelOptions } = useMetaOptions()

const data = computed(() => metaStore.getVerRevCnts())
const pagination = ref({ pageSize: 10 })

const handleRefresh = () => {
  metaStore.regenerateAllData()
}

const searchModel = ref<string | null>(null)
const filteredData = computed(() => {
  let result = data.value
  
  if (searchModel.value) {
    result = result.filter(d => d.model === searchModel.value)
  }
  return result
})
const handleClear = () => {
  searchModel.value = null
  pagination.value = { pageSize: 10 }
}


const columns: DataTableColumns<VerRevCnt> = [
  { title: 'Version',width: 300, align: 'center', key: 'version', sorter: (a, b) => a.version.localeCompare(b.version) },
  { title: 'Revision', align: 'center', key: 'revision', sorter: (a, b) => a.revision.localeCompare(b.revision) },
  { title: 'Count', align: 'center', key: 'count', sorter: (a, b) => a.count - b.count }
]
</script>

<style scoped src="./common-table-styles.css"></style>
