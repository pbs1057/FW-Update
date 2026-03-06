<template>
  <div class="max-w-[1000px] mx-auto px-4">
    <n-space justify="space-between" style=" padding: 0 24px;">
      <n-gradient-text type="info" :size="24">Release Type</n-gradient-text>
      <n-space>
        <n-button @click="handleAdd" type="info" ghost>Add Type</n-button>
      </n-space>
    </n-space>

    <n-card style=" background-color: transparent;" :bordered="false">
      <n-data-table :columns="columns" :data="data" :pagination="{ pageSize: 10 }" :row-props="rowProps"
        :row-key="(row: ReleaseType) => row.id" max-height="65vh" :scroll-x="800" />

      <n-modal v-model:show="showModal" preset="card" style="width: 500px;" :header-style="{ paddingBottom: '8px' }">

        <template #header>
          <n-gradient-text type="info">
            {{ isEdit ? `Modify Release Type Info (ID : ${selectedRow?.id})` : 'Add Type Info' }}
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
          <n-form-item :show-feedback="false">
            <n-input-group>
              <n-tag type="info"
                style="height: 36px;width: 150px; display: flex; align-items: center; justify-content: center;">
                File String
              </n-tag>
              <n-input v-model:value="selectedRow.fileString" placeholder="" />
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
import { computed } from 'vue'

import { NGradientText ,DataTableColumns } from 'naive-ui'

import { useFirmwareMetaStore } from '../../stores/useFirmwareMetaStore'
import { useMetaTableCrud } from '../../composables/useMetaTableCrud'

import type { ReleaseType } from '../../type/type'

const metaStore = useFirmwareMetaStore()


const data = computed(() => metaStore.getReleaseTypes())

const { showModal, selectedRow, isEdit, rowProps, openAdd, handleSave } = useMetaTableCrud<ReleaseType>()

const handleAdd = () =>
  openAdd(data.value, (nextId) => ({ id: nextId, name: '', fileString: '' }))

const onSave = () =>
  handleSave(
    (id, d) => metaStore.updateReleaseType(id, d),
    (item) => metaStore.addReleaseType(item)
  )

const columns: DataTableColumns<ReleaseType> = [
  {
    title: 'ID',
    width: 200,
    align: 'center',
    key: 'id',
    sorter: (a, b) => a.id - b.id
  },
  {
    title: 'Name',
    align: 'center',
    key: 'name'
  },
  {
    title: 'File String',
    align: 'center',
    key: 'fileString'
  }
]

</script>

<style scoped src="./common-table-styles.css"></style>
