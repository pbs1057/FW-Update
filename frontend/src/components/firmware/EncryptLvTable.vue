<template>
  <div style="max-width: 1000px; margin: 0 auto; padding: 0 16px;">
    <n-space justify="space-between" align="center" style=" padding: 0 24px;">
      <n-gradient-text type="info" :size="24">EncryptLv</n-gradient-text>
      <n-space>
        <n-button @click="handleAdd" type="info" ghost>Add EncryptLv</n-button>
      </n-space>
    </n-space>
  <n-card style=" background-color: transparent;" :bordered="false">
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :row-props="rowProps"
      :row-key="(row: EncryptLv) => row.id"
      max-height="65vh"
      :scroll-x="800"
    />
    
    <n-modal v-model:show="showModal" preset="card" style="width: 500px;" :header-style="{ paddingBottom: '8px' }">
      <template #header>
        <n-gradient-text type="info">
          {{ isEdit ? `Modify Encrypt Level (ID : ${selectedRow?.id})` : 'Add Encrypt Level' }}
        </n-gradient-text>
      </template>
      <n-form v-if="selectedRow">
        <n-form-item :show-feedback="false">
          <n-input-group>
            <n-tag type="info" style="height: 36px;width: 150px; display: flex; align-items: center; justify-content: center;">
              Value (Hex)
            </n-tag>
            <n-input v-model:value="selectedRow.value" placeholder="e.g., 0x01" />
          </n-input-group>
        </n-form-item>
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
            <n-tag type="info" style="height: 90px;width: 150px; display: flex; align-items: center; justify-content: center;">
              Description
            </n-tag>
            <n-input v-model:value="selectedRow.descr" type="textarea" :rows="3" />
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
import type { EncryptLv } from '../../type/type'
import { useMetaTableCrud } from '../../composables/useMetaTableCrud'

const metaStore = useFirmwareMetaStore()

const columns: DataTableColumns<EncryptLv> = [
  { title: 'ID', width: 200, align: 'center', key: 'id', sorter: (a, b) => a.id - b.id },
  { title: 'Value (Hex)', align: 'center', key: 'value' },
  { title: 'Name', align: 'center', key: 'name' },
  { title: 'Description', width: 400, align: 'center', key: 'descr', ellipsis: { tooltip: true } }
]

const data = computed(() => metaStore.getEncryptLvs())
const pagination = ref({ pageSize: 10 })

const { showModal, selectedRow, isEdit, rowProps, openAdd, handleSave, handleDelete } =
  useMetaTableCrud<EncryptLv>()

const handleAdd = () =>
  openAdd(data.value, (nextId) => ({ id: nextId, value: '', name: '', descr: '' }))

const onSave = () =>
  handleSave(
    (id, d) => metaStore.updateEncryptLv(id, d),
    (item) => metaStore.addEncryptLv(item)
  )

const onDelete = () => handleDelete((id) => metaStore.deleteEncryptLv(id))

const handleRefresh = () => metaStore.regenerateAllData()
</script>

<style scoped src="./common-table-styles.css"></style>
