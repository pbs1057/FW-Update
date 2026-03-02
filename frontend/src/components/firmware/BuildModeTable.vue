<template>
  <div style="max-width: 1000px; margin: 0 auto; padding: 0 16px;">
    <n-space justify="space-between" align="center" style=" padding: 0 24px;">
      <n-gradient-text type="info" :size="24" >Build Mode</n-gradient-text>
      <n-space>
        <n-button @click="handleAdd" type="info" ghost>Add Mode</n-button>
      </n-space>
    </n-space>
  <n-card style=" background-color: transparent;" :bordered="false">
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :row-props="rowProps"
      :row-key="(row: BuildMode) => row.id"
      max-height="65vh"
      :scroll-x="800"
    />
    
    <n-modal v-model:show="showModal" preset="card" style="width: 500px;" :header-style="{ paddingBottom: '8px' }">
      <template #header>
        <n-gradient-text type="info">
          {{ isEdit ? `Modify Mode Info (ID : ${selectedRow?.id})` : 'Add Mode Info' }}
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
        <n-form-item :show-feedback="false">
          <n-input-group>
            <n-tag type="info" style="height: 36px;width: 150px; display: flex; align-items: center; justify-content: center;">
              File String
            </n-tag>
            <n-input v-model:value="selectedRow.fileString" />
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
import type { BuildMode } from '../../type/type'
import { useMetaTableCrud } from '../../composables/useMetaTableCrud'

const metaStore = useFirmwareMetaStore()

const columns: DataTableColumns<BuildMode> = [
  { title: 'ID', align: 'center', width: 200, key: 'id', sorter: (a, b) => a.id - b.id },
  { title: 'Name', align: 'center', key: 'name' },
  { title: 'File String', align: 'center', key: 'fileString' }
]

const data = computed(() => metaStore.getBuildModes())
const pagination = ref({ pageSize: 10 })

const { showModal, selectedRow, isEdit, rowProps, openAdd, handleSave, handleDelete } =
  useMetaTableCrud<BuildMode>()

const handleAdd = () =>
  openAdd(data.value, (nextId) => ({ id: nextId, name: '', fileString: '' }))

const onSave = () =>
  handleSave(
    (id, d) => metaStore.updateBuildMode(id, d),
    (item) => metaStore.addBuildMode(item)
  )

const onDelete = () => handleDelete((id) => metaStore.deleteBuildMode(id))

const handleRefresh = () => metaStore.regenerateAllData()
</script>

<style scoped src="./common-table-styles.css"></style>
