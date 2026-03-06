<template>
  <div class="max-w-[1000px] mx-auto px-4">
    <n-space justify="space-between" style=" padding: 0 24px;">
      <n-gradient-text type="info" :size="24">Platform Key</n-gradient-text>
    </n-space>
    <n-card style=" background-color: transparent;" :bordered="false">
      <n-data-table :columns="columns" :data="data" :pagination="pagination" :row-props="rowProps"
        :row-key="(row: PlatformKey) => row.id" :scroll-x="800" />

      <n-modal v-model:show="showModal" preset="card" style="width: 500px;" :header-style="{ paddingBottom: '8px' }">
        <template #header>
          <n-gradient-text type="info">
            {{ isEdit ? `Modify Platform Key Info (ID : ${selectedRow?.id})` : 'Add Platform Key' }}
          </n-gradient-text>
        </template>
        <n-form v-if="selectedRow">
          <n-form-item :show-feedback="false">
            <n-input-group>
              <n-tag type="info"
                style="height: 36px;width: 150px; display: flex; align-items: center; justify-content: center;">
                Key Date
              </n-tag>
              <n-input v-model:value="selectedRow.keyDate" />
            </n-input-group>
          </n-form-item>
        </n-form>
        <template #footer>
          <n-space justify="end">
            <n-button type="info" ghost @click="onSave">{{ isEdit ? 'Modify' : 'Add' }}</n-button>
            <n-button @click="showModal = false">Cancel</n-button>
          </n-space>
        </template>
      </n-modal>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import { NGradientText } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

import { useFirmwareMetaStore } from '../../stores/useFirmwareMetaStore'
import { useMetaTableCrud } from '../../composables/useMetaTableCrud'

import type { PlatformKey } from '../../type/type'

const metaStore = useFirmwareMetaStore()

const data = computed(() => metaStore.getPlatformKeys())
const pagination = ref({ pageSize: 10 })

const { showModal, selectedRow, isEdit, rowProps, handleSave } =
  useMetaTableCrud<PlatformKey>()

const onSave = () =>
  handleSave(
    (id, d) => metaStore.updatePlatformKey(id, d),
    (item) => metaStore.addPlatformKey(item)
  )

const columns: DataTableColumns<PlatformKey> = [
  { 
    title: 'ID', 
    width: 200, 
    align: 'center', 
    key: 'id', 
    sorter: (a, b) => a.id - b.id },
  { 
    title: 'Key Date', 
    align: 'center', 
    key: 'keyDate', 
    sorter: (a, b) => a.keyDate.localeCompare(b.keyDate) 
  }
]  

</script>

<style scoped src="./common-table-styles.css"></style>
