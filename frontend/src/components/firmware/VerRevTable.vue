<template>
  <div class="max-w-[1000px] mx-auto px-4">
    <n-space justify="space-between" style=" padding: 0 24px;">
      <n-gradient-text type="info" :size="24">VerRev</n-gradient-text>
    </n-space>
    <n-card style=" background-color: transparent;" :bordered="false">
      <n-data-table :columns="columns" :data="data" :pagination="pagination" :row-props="rowProps"
        :row-key="(row: VerRev) => row.id" :scroll-x="800" />

      <n-modal v-model:show="showModal" preset="card" style="width: 500px;" :header-style="{ paddingBottom: '8px' }">

        <template #header>
          <n-gradient-text type="info">
            Modify Release Note
          </n-gradient-text>
        </template>
        <n-form v-if="selectedRow">
          <n-form-item :show-feedback="false">
            <n-input-group>
              <n-tag type="info"
                style="height: 36px; width: 150px; display: flex; align-items: center; justify-content: center;">
                Version
              </n-tag>
              <n-input v-model:value="selectedRow.version" :disabled="true" />
            </n-input-group>
          </n-form-item>
          <n-form-item :show-feedback="false">
            <n-input-group>
              <n-tag type="info"
                style="height: 36px;width: 150px; display: flex; align-items: center; justify-content: center;">
                Revision
              </n-tag>
              <n-input v-model:value="selectedRow.revision" :disabled="true" />
            </n-input-group>
          </n-form-item>
          <n-form-item :show-feedback="false">
            <n-input-group>
              <n-tag type="info"
                style="height: 125px; width: 150px; display: flex; align-items: center; justify-content: center;">
                Note
              </n-tag>
              <n-input v-model:value="selectedRow.note" placeholder="Autosizable" type="textarea" size="small"
                :autosize="{
                  minRows: 3,
                  maxRows: 5,
                }" />
            </n-input-group>
          </n-form-item>
        </n-form>
        <template #footer>
          <n-space justify="end">
            <n-button type="info" ghost @click="onSave">Modify</n-button>
            <n-button @click="showModal = false">Cancel</n-button>
          </n-space>
        </template>
      </n-modal>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'

import { NGradientText, NIcon ,DataTableColumns } from 'naive-ui'

import { useFirmwareMetaStore } from '../../stores/useFirmwareMetaStore'
import { useMetaTableCrud } from '../../composables/useMetaTableCrud'
import { useMetaOptions } from '../../composables/useMetaOptions'

import CalendarEditIcon from '../../assets/CalendarEdit20Regular.svg?component'
import type { VerRev } from '../../type/type'

const metaStore = useFirmwareMetaStore()

const { showModal, selectedRow, rowProps, handleSave } = useMetaTableCrud<VerRev>()
const { versionOptions, revisionOptions } = useMetaOptions()

const data = computed(() => metaStore.getVerRevs())

const pagination = ref({ pageSize: 10 })

const onSave = () =>
  handleSave(
    (id, d) => metaStore.updateVerRev(id, d),
    () => { }
  )

const columns = computed<DataTableColumns<VerRev>>(() => [
  {
    title: 'Version',
    width: 300,
    align: 'center',
    key: 'version',
    sorter: (a, b) => a.version.localeCompare(b.version),
    filterOptions: versionOptions.value,
    filter(value, row) {
      return row.version === value
    }
  },
  {
    title: 'Revision',
    align: 'center',
    key: 'revision',
    sorter: (a, b) => a.revision.localeCompare(b.revision),
    filterOptions: revisionOptions.value,
    filter(value, row) {
      return row.revision === value
    }
  },
  {
    title: 'Note',
    align: 'center',
    key: 'note',
    width: 300,
    render: (row) => {
      if (row.note && row.note.trim()) {
        return h(NIcon, { size: 20, color: '--select-menu-text', style: { cursor: 'pointer', verticalAlign: 'middle' } }, {
          default: () => h(CalendarEditIcon)
        })
      }
      return null
    }
  }
])
</script>

<style scoped src="./common-table-styles.css"></style>
