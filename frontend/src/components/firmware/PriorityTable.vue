<template>
  <div style="max-width: 1000px; margin: 0 auto; padding: 0 16px;">
    <n-space justify="space-between" align="center" style=" padding: 0 24px;">
      <n-gradient-text type="info" :size="24">Priority</n-gradient-text>
      <n-space>
        <n-button @click="handleAdd" type="info" ghost>Add Priority</n-button>
      </n-space>
    </n-space>
  <n-card style=" background-color: transparent;" :bordered="false">
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :row-props="rowProps"
      :row-key="(row: Priority) => row.id"
      max-height="65vh"
      :scroll-x="800"
    />
    
    <n-modal v-model:show="showModal" preset="card" style="width: 500px;" :header-style="{ paddingBottom: '8px' }">
      <template #header>
        <n-gradient-text type="info">
          {{ isEdit ? `Edit Priority (ID : ${selectedRow?.id})` : 'Add Priority Info' }}
        </n-gradient-text>
      </template>
      <n-form v-if="selectedRow">
        <n-form-item :show-feedback="false">
          <n-input-group>
            <n-tag type="info" style="height: 36px;width: 150px; display: flex; align-items: center; justify-content: center;">
              Name
            </n-tag>
            <n-input v-model:value="selectedRow.name" />
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
import type { Priority } from '../../type/type'
import { useMetaTableCrud } from '../../composables/useMetaTableCrud'

const metaStore = useFirmwareMetaStore()

const columns: DataTableColumns<Priority> = [
  { title: 'ID', width: 200, align: 'center', key: 'id', sorter: (a, b) => a.id - b.id },
  { title: 'Name', align: 'center', key: 'name' }
]

const data = computed(() => metaStore.getPriorities())
const pagination = ref({ pageSize: 10 })

const { showModal, selectedRow, isEdit, rowProps, openAdd, handleSave, handleDelete } =
  useMetaTableCrud<Priority>()

const handleAdd = () =>
  openAdd(data.value, (nextId) => ({ id: nextId, name: '' }))

const onSave = () =>
  handleSave(
    (id, d) => metaStore.updatePriority(id, d),
    (item) => metaStore.addPriority(item)
  )

const onDelete = () => handleDelete((id) => metaStore.deletePriority(id))

const handleRefresh = () => metaStore.regenerateAllData()
</script>

<style scoped src="./common-table-styles.css"></style>
