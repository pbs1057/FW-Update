<template>
  <div class="max-w-[1000px] mx-auto px-4">
    <n-space justify="space-between" style=" padding: 0 24px;">
      <n-gradient-text type="info" :size="24">Buyer</n-gradient-text>
      <n-space>
        <n-button @click="handleAdd" type="info" ghost>Add Buyer</n-button>
      </n-space>
    </n-space>
    <n-card style=" background-color: transparent;" :bordered="false">
      <n-data-table :columns="columns" :data="data" :pagination="{ pageSize: 10 }" :row-props="rowProps"
        :row-key="(row: Buyer) => row.id" :scroll-x="800" />

      <n-modal v-model:show="showModal" preset="card" style="width: 500px;" :header-style="{ paddingBottom: '8px' }">
        <template #header>
          <n-gradient-text type="info">
            {{ isEdit ? `Modify Buyer info (ID : ${selectedRow?.id})` : 'Add Buyer info' }}
          </n-gradient-text>
        </template>
        <n-form v-if="selectedRow">
          <n-form-item :show-feedback="false">
            <n-input-group>
              <n-tag type="info"
                style="height: 36px;width: 150px; display: flex; align-items: center; justify-content: center;">
                Name
              </n-tag>
              <n-input v-model:value="selectedRow.name" placeholder="" />
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

import { useFirmwareMetaStore } from '../../stores/useFirmwareMetaStore'

import { useMetaTableCrud } from '../../composables/useMetaTableCrud'

import { NGradientText , DataTableColumns } from 'naive-ui'
import type { Buyer } from '../../type/type'

const metaStore = useFirmwareMetaStore()

const columns: DataTableColumns<Buyer> = [
  { title: 'ID', width: 200, align: 'center', key: 'id', sorter: (a, b) => a.id - b.id },
  { title: 'Name', align: 'center', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) }
]

const data = computed(() => metaStore.getBuyers())

const { showModal, selectedRow, isEdit, rowProps, openAdd, handleSave } =
  useMetaTableCrud<Buyer>()

const handleAdd = () =>
  openAdd(data.value, (nextId) => ({ id: nextId, name: '' }))

const onSave = () =>
  handleSave(
    (id, d) => metaStore.updateBuyer(id, d),
    (item) => metaStore.addBuyer(item)
  )
</script>

<style scoped src="./common-table-styles.css"></style>
