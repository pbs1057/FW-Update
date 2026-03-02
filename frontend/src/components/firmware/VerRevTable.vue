<template>
  <div style="max-width: 1000px; margin: 0 auto; padding: 0 16px;">
    <n-space justify="space-between" align="center" style=" padding: 0 24px;">
      <n-gradient-text type="info" :size="24">VerRev</n-gradient-text>
    </n-space>
    <n-card style=" background-color: transparent;" :bordered="false">
      <n-data-table ref="dataTableInst" :columns="columns" :data="filteredData" :pagination="pagination"
        :row-props="rowProps" :row-key="(row: VerRev) => row.id" max-height="65vh":scroll-x="800" />

      <n-modal v-model:show="showModal" preset="card" style="width: 500px;" :header-style="{ paddingBottom: '8px' }" >
        <template #header>
          <n-gradient-text type="info">
            Modify Release Note
          </n-gradient-text>
        </template>
        <n-form v-if="selectedRow">
          <n-form-item :show-feedback="false">
            <n-input-group>
              <n-tag type="info"
                style="height: 36px;width: 150px; display: flex; align-items: center; justify-content: center;">
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
              <n-input v-model:value="selectedRow.note" type="textarea" :rows="5" />
            </n-input-group>
          </n-form-item>
        </n-form>
        <template #footer>
          <n-space justify="end">
            <n-button type="info" ghost @click="handleSave">Modify</n-button>
            <n-button @click="showModal = false">Cancel</n-button>
          </n-space>
        </template>
      </n-modal>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { NGradientText, NIcon } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { useFirmwareMetaStore } from '../../stores/useFirmwareMetaStore'
import type { VerRev } from '../../type/type'
import CalendarEditIcon from '../../assets/CalendarEdit20Regular.svg'
import { useMetaTableCrud } from '../../composables/useMetaTableCrud'

const metaStore = useFirmwareMetaStore()
const searchVersion = ref<string | null>(null)
const searchRevision = ref<string | null>(null)

const { showModal, selectedRow, rowProps } = useMetaTableCrud<VerRev>()

const data = computed(() => metaStore.getVerRevs())

// Version 옵션 (중복 제거)
const versionOptions = computed(() => {
  const versions = Array.from(new Set(data.value.map(d => d.version)))
  return versions.map(v => ({ label: v, value: v }))
})

// Revision 옵션 (중복 제거)
const revisionOptions = computed(() => {
  const revisions = Array.from(new Set(data.value.map(d => d.revision)))
  return revisions.map(r => ({ label: r, value: r }))
})

// 필터링된 데이터
const filteredData = computed(() => {
  let result = data.value

  if (searchVersion.value) {
    result = result.filter(d => d.version === searchVersion.value)
  }

  if (searchRevision.value) {
    result = result.filter(d => d.revision === searchRevision.value)
  }

  return result
})

const pagination = ref({ pageSize: 10 })

const handleSave = () => {
  if (selectedRow.value) {
    metaStore.updateVerRev(selectedRow.value.id, selectedRow.value)
    showModal.value = false
  }
}

const handleSearch = () => {
  // 검색 버튼 클릭 시 computed에서 자동으로 필터링됨
  pagination.value = { pageSize: 10 }
}

const handleClear = () => {
  searchVersion.value = null
  searchRevision.value = null
  pagination.value = { pageSize: 10 }
}

const columns: DataTableColumns<VerRev> = [
  {
    title: 'Version', width: 300, align: 'center', key: 'version', sorter: (a, b) => a.version.localeCompare(b.version),
    filterOptions: versionOptions.value,
    filter(value, row) {
      return row.version === value
    }
  },
  { title: 'Revision', align: 'center', key: 'revision', sorter: (a, b) => a.revision.localeCompare(b.revision),
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
        return h('img', {
          src: CalendarEditIcon,
          style: {
            width: '20px',
            height: '20px',
            cursor: 'pointer',
            color: '#2080f0',
            verticalAlign: 'middle',
            display: 'inline-block'
          }
        })
      }
      return null
    }
  }
]
</script>

<style scoped src="./common-table-styles.css"></style>
