<template>
  <div style="max-width: 1000px; margin: 0 auto; padding: 0 16px;">
    <n-space justify="space-between" align="center" style=" padding: 0 24px;">
      <n-gradient-text type="info" :size="24">Model</n-gradient-text>
      <n-space>
        
      </n-space>
    </n-space>
  <n-card style=" background-color: transparent;" :bordered="false">
    <template #header-extra>
      <n-space>
        <n-button size="small" @click="handleAdd">추가</n-button>
        <n-button size="small" @click="handleRefresh">새로고침</n-button>
      </n-space>
    </template>
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :row-props="rowProps"
      :row-key="(row: Model) => row.id"
      max-height="65vh"
      :scroll-x="800"
    />
    
    <n-modal v-model:show="showModal" preset="card" style="width: 500px;" :header-style="{ paddingBottom: '8px' }">
      <template #header>
        <n-gradient-text type="info">
          Modify Model Info (ID : {{ selectedRow?.id }})
        </n-gradient-text>
      </template>
      <n-form v-if="selectedRow">
        <n-form-item :show-feedback="false">
          <n-input-group>
            <n-tag type="info" style="height: 36px;width: 150px; display: flex; align-items: center; justify-content: center;">
              ID
            </n-tag>
            <n-input v-model:value="selectedRow.id" :disabled="isEdit" />
          </n-input-group>
        </n-form-item>
        <n-form-item :show-feedback="false">
          <n-input-group>
            <n-tag type="info" style="height: 36px;width: 150px; display: flex; align-items: center; justify-content: center;">
              System ID
            </n-tag>
            <n-input v-model:value="selectedRow.systemId" />
          </n-input-group>
        </n-form-item>
        <n-form-item :show-feedback="false">
          <n-input-group>
            <n-tag type="info" style="height: 36px;width: 150px; display: flex; align-items: center; justify-content: center;">
              Model Name
            </n-tag>
            <n-input v-model:value="selectedRow.name" />
          </n-input-group>
        </n-form-item>
        <n-form-item :show-feedback="false">
          <n-input-group>
            <n-tag type="info" style="height: 36px;width: 150px; display: flex; align-items: center; justify-content: center;">
              Buyer
            </n-tag>
            <n-select v-model:value="selectedRow.buyer" :options="buyerOptions" />
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
import type { Model } from '../../type/type'
import { useMetaTableCrud } from '../../composables/useMetaTableCrud'

const metaStore = useFirmwareMetaStore()

const columns: DataTableColumns<Model> = [
  { title: 'ID', width: 200, align: 'center', key: 'id', sorter: (a, b) => a.id - b.id },
  { title: 'System ID', align: 'center', key: 'systemId', sorter: (a, b) => a.systemId.localeCompare(b.systemId) },
  { title: 'Model Name', align: 'center', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
  {
    title: 'Buyer', align: 'center', key: 'buyer', sorter: (a, b) => a.buyer - b.buyer,
    render: (row) => {
      const buyer = metaStore.getBuyers().find(b => b.id === row.buyer)
      return buyer ? buyer.name : String(row.buyer)
    }
  }
]

const data = computed(() => metaStore.getModels())
const pagination = ref({ pageSize: 10 })

const buyerOptions = computed(() =>
  metaStore.getBuyers().map(buyer => ({ label: buyer.name, value: buyer.id }))
)

const { showModal, selectedRow, isEdit, rowProps, openAdd, handleSave, handleDelete } =
  useMetaTableCrud<Model>()

const handleAdd = () =>
  openAdd(data.value, (nextId) => ({ id: nextId, systemId: '', name: '', buyer: 1 }))

const onSave = () =>
  handleSave(
    (id, d) => metaStore.updateModel(id, d),
    (item) => metaStore.addModel(item)
  )

const onDelete = () => handleDelete((id) => metaStore.deleteModel(id))

const handleRefresh = () => metaStore.regenerateAllData()
</script>

<style scoped src="./common-table-styles.css"></style>
