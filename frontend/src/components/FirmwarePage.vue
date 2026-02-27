<template>
  <div style="max-width: 1400px; margin: 0 auto; padding: 0 16px;">
    <n-space vertical :size="12">
      <n-space justify="space-between" style="width: 100%;">
        <n-space>
          <n-tag>Use</n-tag>
          <n-tag type="error">NoUse</n-tag>
          <n-tag type="info">Test</n-tag>
          <n-tag ghost
            :color="{ color: 'rgba(147, 142, 158, 0.3)', textColor: 'rgb(255,231,242)', borderColor: 'rgb(255,231,242)' }">NoUse
            & Test</n-tag>
          <n-tag type="success">Pin</n-tag>

        </n-space>
        <n-space>
          <n-button @click="openUploadModal" type="info" ghost>Upload Firmware</n-button>
          <n-button @click="openModifyModal" type="info" ghost>Modify Firmware</n-button>
        </n-space>


      </n-space>

      <n-data-table ref="dataTableInst" :columns="columns" :data="data" 
        :pagination="{ pageSize: 10, showSizePicker: false }"
        :row-props="rowProps" max-height="65vh" :scroll-x="1200" />

      <!-- 업로드 모달 -->
      <UploadFirmwareModal v-model:show="showUploadModal" @upload="handleUpload" />

      <!-- 벌크 수정 모달 -->
      <BulkModifyModal v-model:show="showBulkModal" :data="data" :priority-options="priorityOptions"
        :model-options="modelOptions" @bulk-update="handleBulkUpdate" @bulk-delete="handleBulkDelete" />

      <!-- 상세 정보 모달 -->

      <n-modal v-model:show="showModal" preset="card" style="width: 600px;">
        <template #header>
          <n-gradient-text type="info">
            Modify Firmware Info (ID : {{ selectedRow?.id }})
          </n-gradient-text>
        </template>
        <n-space vertical v-if="selectedRow" :size="12">
          <n-form>
            <n-grid :cols="2" :x-gap="12" :y-gap="8">
              <!-- Row 1 -->
              <n-gi>
                <n-input-group>
                  <n-tag type="info"
                    style="height: 34px; width: 150px; display: flex; align-items: center; justify-content: center;">Version</n-tag>
                  <n-input v-model:value="selectedRow.version" :disabled="true" />
                </n-input-group>
              </n-gi>

              <n-gi>
                <n-input-group>
                  <n-tag type="info"
                    style="height: 34px; width: 150px; display: flex; align-items: center; justify-content: center;">Priority</n-tag>
                  <n-select v-model:value="selectedRow.priority" :options="priorityOptions" />
                </n-input-group>
              </n-gi>

              <!-- Row 2 -->
              <n-gi>
                <n-input-group>
                  <n-tag type="info"
                    style="height: 34px; width: 150px; display: flex; align-items: center; justify-content: center;">Revision</n-tag>
                  <n-input v-model:value="selectedRow.revision" :disabled="true" />
                </n-input-group>
              </n-gi>

              <n-gi>
                <n-input-group>
                  <n-tag type="info"
                    style="height: 34px; width: 150px; display: flex; align-items: center; justify-content: center;">PlatformKey</n-tag>
                  <n-input v-model:value="selectedRow.platformKey" :disabled="true" />
                </n-input-group>
              </n-gi>

              <!-- Row 3 -->
              <n-gi>
                <n-input-group>
                  <n-tag type="info"
                    style="height: 34px; width: 150px; display: flex; align-items: center; justify-content: center;">Size
                    (Byte)</n-tag>
                  <n-input v-model:value="selectedRow.size" :disabled="true" />
                </n-input-group>
              </n-gi>

              <n-gi>
                <n-input-group>
                  <n-tag type="info"
                    style="height: 34px; width: 150px; display: flex; align-items: center; justify-content: center;">Encrypt
                    Level</n-tag>
                  <n-select v-model:value="selectedRow.encryptLevel" :options="encryptLevelOptions" :disabled="true" />
                </n-input-group>
              </n-gi>

              <!-- Row 4 -->
              <n-gi>
                <n-input-group>
                  <n-tag type="info"
                    style="height: 34px; width: 150px; display: flex; align-items: center; justify-content: center;">SystemID</n-tag>
                  <n-input v-model:value="selectedRow.systemId" :disabled="true" />
                </n-input-group>
              </n-gi>

              <n-gi>
                <n-input-group>
                  <n-tag type="info" style="height: 34px; width: 100px; display: flex;  justify-content: center;">Need
                    FacRst</n-tag>
                  <div style="display: flex; align-items: center; justify-content: center; flex: 1;">
                    <n-switch v-model:value="selectedRow.needFacRst" :round="false" :rail-style="switchRailStyle" />
                  </div>
                </n-input-group>
              </n-gi>

              <!-- Row 5 -->
              <n-gi>
                <n-input-group>
                  <n-tag type="info"
                    style="height: 34px; width: 150px; display: flex; align-items: center; justify-content: center;">Md5</n-tag>

                  <n-input v-model:value="selectedRow.md5" :disabled="true" />
                </n-input-group>
              </n-gi>

              <n-gi>
                <n-input-group>
                  <n-tag type="info"
                    style="height: 34px; width: 100px; display: flex; align-items: center; justify-content: center;">Use</n-tag>
                  <div style="display: flex; align-items: center; justify-content: center; flex: 1;">
                    <n-switch v-model:value="selectedRow.use" :rail-style="switchRailStyle" :round="false" />
                  </div>
                </n-input-group>
              </n-gi>

              <!-- Row 6 -->
              <n-gi>
                <n-input-group>
                  <n-tag type="info"
                    style="height: 34px; width: 150px; display: flex; align-items: center; justify-content: center;">Model</n-tag>
                  <n-select v-model:value="selectedRow.model" :options="modelOptions" :disabled="true" />
                </n-input-group>
              </n-gi>

              <n-gi>
                <n-input-group>
                  <n-tag type="info"
                    style="height: 34px; width: 100px; display: flex; align-items: center; justify-content: center;">Test</n-tag>
                  <div style="display: flex; align-items: center; justify-content: center; flex: 1;">
                    <n-switch v-model:value="selectedRow.test" :rail-style="switchRailStyle" :round="false" />
                  </div>
                </n-input-group>
              </n-gi>

              <!-- Row 7 -->
              <n-gi>
                <n-input-group>
                  <n-tag type="info"
                    style="height: 34px; width: 150px; display: flex; align-items: center; justify-content: center;">Buyer</n-tag>
                  <n-select v-model:value="selectedRow.buyer" :options="buyerOptions" :disabled="true" />
                </n-input-group>
              </n-gi>

              <n-gi>
                <n-input-group>
                  <n-tag type="info"
                    style="height: 34px; width: 100px; display: flex; align-items: center; justify-content: center;">OnlyApp</n-tag>
                  <div style="display: flex; align-items: center; justify-content: center; flex: 1;">
                    <n-switch v-model:value="selectedRow.onlyApp" :rail-style="switchRailStyle" :round="false" />
                  </div>
                </n-input-group>
              </n-gi>

              <!-- Row 8 -->
              <n-gi>
                <n-input-group>
                  <n-tag type="info"
                    style="height: 34px; width: 150px; display: flex; align-items: center; justify-content: center;">Type</n-tag>
                  <n-select v-model:value="selectedRow.type" :options="typeOptions" :disabled="true" />
                </n-input-group>
              </n-gi>

              <n-gi>
                <n-input-group>
                  <n-tag type="info"
                    style="height: 34px; width: 100px; display: flex; align-items: center; justify-content: center;">Pin
                    Use</n-tag>
                  <div style="display: flex; align-items: center; justify-content: center; flex: 1;">
                    <n-switch v-model:value="selectedRow.pinUse" :rail-style="switchRailStyle" :round="false" />
                  </div>
                </n-input-group>
              </n-gi>

              <!-- Row 9 -->
              <n-gi>
                <n-input-group>
                  <n-tag type="info"
                    style="height: 34px; width: 150px; display: flex; align-items: center; justify-content: center;">Mode</n-tag>
                  <n-select v-model:value="selectedRow.mode" :options="modeOptions" :disabled="true" />
                </n-input-group>
              </n-gi>

              <n-gi>
                <n-input-group>
                  <n-tag type="info"
                    style="height: 34px; width: 150px; display: flex; align-items: center; justify-content: center;">Pin
                    Code</n-tag>
                  <n-input v-model:value="selectedRow.pinCode" :disabled="true" />
                </n-input-group>
              </n-gi>

              <!-- Row 10 -->
              <n-gi>
                <n-input-group>
                  <n-tag type="info"
                    style="height: 34px; width: 150px; display: flex; align-items: center; justify-content: center;">RegDate</n-tag>
                  <n-input v-model:value="selectedRow.regDate" disabled />
                </n-input-group>
              </n-gi>

              <n-gi>
                <n-input-group>
                  <n-tag type="info"
                    style="height: 34px; width: 150px; display: flex; align-items: center; justify-content: center;">Pin
                    Max</n-tag>
                  <n-input-number v-model:value="selectedRow.pinMax" style="width: 100%;" />
                </n-input-group>
              </n-gi>

              <!-- Row 11 -->
              <n-gi>
                <n-input-group>
                  <n-tag type="info"
                    style="height: 34px; width: 100px; display: flex; align-items: center; justify-content: center;">Down
                    Link</n-tag>
                  <div style="display: flex; align-items: center; justify-content: center; flex: 1;">
                    <n-button text tag="a" type="info" style="width: 100%;">IRD DOWN</n-button>
                  </div>
                </n-input-group>
              </n-gi>

              <n-gi>
                <n-input-group>
                  <n-tag type="info"
                    style="height: 34px; width: 150px; display: flex; align-items: center; justify-content: center;">Pin
                    Count</n-tag>
                  <n-input-number v-model:value="selectedRow.pinCount" style="width: 100%;" :disabled="true" />
                </n-input-group>
              </n-gi>
            </n-grid>
          </n-form>
        </n-space>

        <template #footer>
          <n-space justify="end">
            <n-button @click="saveChanges" type="info" ghost>Modify</n-button>
            <n-button @click="deleteFirmware" type="error" ghost>Delete</n-button>
            <n-button @click="showModal = false">Cancel</n-button>
          </n-space>
        </template>
      </n-modal>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import type { DataTableColumns, DataTableInst } from 'naive-ui'
import { ref, computed, onMounted, nextTick } from 'vue'
import { NButton, NModal, NSpace, NForm, NInput, NInputNumber, NInputGroup, NSelect, NSwitch, NTag, NGrid, NGi, NGradientText } from 'naive-ui'
import { useFirmwareStore } from '../stores/useFirmwareStore'
import { useFirmwareMetaStore } from '../stores/useFirmwareMetaStore'
import type { Firmware } from '../type/type'
import BulkModifyModal from './modals/BulkModifyModal.vue'
import UploadFirmwareModal from './modals/UploadFirmwareModal.vue'
import Sortable from 'sortablejs'

const firmwareStore = useFirmwareStore()
const metaStore = useFirmwareMetaStore()

const showModal = ref(false)
const selectedRow = ref<Firmware | null>(null)

// Switch rail style function
const switchRailStyle = ({ focused, checked }: { focused: boolean; checked: boolean }) => ({
  background: checked ? '#2080f0' : '#d0d0d0',
  boxShadow: focused ? '0 0 0 2px rgba(32, 128, 240, 0.3)' : 'none'
})

// 벌크 수정 모달
const showBulkModal = ref(false)
const showUploadModal = ref(false)

const openModifyModal = () => {
  showBulkModal.value = true
}

const openUploadModal = () => {
  showUploadModal.value = true
}

const handleUpload = (files: File[]) => {
  console.log('Uploading files:', files)
  // TODO: 실제 업로드 로직 구현
}

const handleBulkUpdate = (payload: { ids: string[]; field: string; value: any }) => {
  payload.ids.forEach(id => {
    const firmware = firmwareStore.getFirmwares().find(f => f.id === id)
    if (firmware) {
      firmwareStore.updateFirmware(id, { ...firmware, [payload.field]: payload.value })
    }
  })
}

const handleBulkDelete = (ids: string[]) => {
  ids.forEach(id => {
    firmwareStore.deleteFirmware(id)
  })
}

const handleRowClick = (row: Firmware) => {
  selectedRow.value = { ...row }
  showModal.value = true
}

const rowProps = (row: Firmware) => {
  let className = 'custom-row'

  if (row.use && row.pinUse) {
    className += ' row-pin'
  } else if (!row.use && row.test) {
    className += ' row-no-use-test'
  } else if (row.use && row.test) {
    className += ' row-test'
  } else if (row.use) {
    className += ' row-use'
  } else if (!row.use) {
    className += ' row-no-use'
  }

  return {
    class: className,
    style: { cursor: 'pointer' },
    onClick: () => {
      handleRowClick(row)
    }
  }
}

// 스토어에서 옵션 가져오기
const priorityOptions = computed(() =>
  metaStore.getPriorities().map(p => ({ label: p.name, value: p.name }))
)

const typeOptions = computed(() =>
  metaStore.getReleaseTypes().map(t => ({ label: t.name, value: t.id }))
)

const modeOptions = computed(() =>
  metaStore.getBuildModes().map(m => ({ label: m.name, value: m.id }))
)

const encryptLevelOptions = computed(() =>
  metaStore.getEncryptLvs().map(e => ({ label: e.name, value: e.name }))
)

const modelOptions = computed(() =>
  metaStore.getModels().map(m => ({ label: m.name, value: m.name }))
)

const buyerOptions = computed(() =>
  metaStore.getBuyers().map(b => ({ label: b.name, value: b.id }))
)


// Version 옵션 (중복 제거)
const versionOptions = computed(() => {
  const versions = Array.from(new Set(data.value.map(d => d.version)))
  return versions.map(v => ({ label: v, value: v }))
})

const revisionOptions = computed(() =>
  metaStore.getReleaseTypes().map(r => ({ label: r.name, value: r.name }))
)


const saveChanges = () => {
  if (selectedRow.value) {
    firmwareStore.updateFirmware(selectedRow.value.id, selectedRow.value)
    console.log('저장된 데이터:', selectedRow.value)
    showModal.value = false
  }
}

const deleteFirmware = () => {
  if (selectedRow.value && confirm(`ID ${selectedRow.value.id} 펌웨어를 삭제하시겠습니까?`)) {
    firmwareStore.deleteFirmware(selectedRow.value.id)
    showModal.value = false
  }
}

//ID	Version	Revision	Size	Model	Buyer	Type	Priority	Download
const columns = computed<DataTableColumns<Firmware>>(() => [
  {
    title: 'ID',
    key: 'id',
    width: 100,
    align: 'center',
    sorter: (a, b) => Number(a.id) - Number(b.id)
  },
  {
    title: 'Version',
    key: 'version',
    sorter: (row1, row2) => row1.version.localeCompare(row2.version),
    filterOptions: versionOptions.value,
    filter(value, row) {
      return row.version === value
    }
  },
  {
    title: 'Revision',
    key: 'revision',
    sorter: (row1, row2) => row1.revision.localeCompare(row2.revision),
    filterOptions: revisionOptions.value,
    filter(value, row) {
      return row.revision === value
    }
  },
  {
    title: 'Size',
    key: 'size',
    sorter: (row1, row2) => {
      const size1 = parseFloat(row1.size)
      const size2 = parseFloat(row2.size)
      return size1 - size2
    }
  },
  {
    title: 'Model',
    key: 'model',
    sorter: (row1, row2) => row1.model.localeCompare(row2.model),
    filterOptions: modelOptions.value,
    filter(value, row) {
      return row.model === value
    }
  },
  {
    title: 'Buyer',
    key: 'buyer',
    filterOptions: buyerOptions.value,
    filter(value, row) {
      return row.buyer === value
    },
    render(row) {
      const buyer = metaStore.getBuyers().find(b => b.id === row.buyer)
      return buyer ? buyer.name : String(row.buyer)
    }
  },
  {
    title: 'Type',
    key: 'type',
  },
  {
    title: 'Priority',
    key: 'priority',
    sorter: (row1, row2) => row1.priority.localeCompare(row2.priority),
    filterOptions: priorityOptions.value,
    filter(value, row) {
      return row.priority === value
    }
  },
  {
    title: 'Download',
    key: 'download',
    sorter: (row1, row2) => row1.download - row2.download
  }

])

const data = computed(() => firmwareStore.getFirmwares())

const dataTableInst = ref<DataTableInst | null>(null)

function filterAddress() {
  dataTableInst.value?.filter({
    buyer: ['For']
  })
}

function sortName() {
  dataTableInst.value?.sort('version', 'ascend')
}

function clearFilters() {
  dataTableInst.value?.clearFilters()
}

function clearSorter() {
  dataTableInst.value?.clearSorter()
}

// 드래그앤드롭 기능 초기화
onMounted(() => {
  nextTick(() => {
    const table = document.querySelector('.n-data-table-tbody') as HTMLElement
    if (table) {
      Sortable.create(table, {
        animation: 150,
        handle: '.n-data-table-td',
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        dragClass: 'sortable-drag',
        onEnd: (evt) => {
          const oldIndex = evt.oldIndex
          const newIndex = evt.newIndex
          
          if (oldIndex !== undefined && newIndex !== undefined && oldIndex !== newIndex) {
            const items = [...data.value]
            const [movedItem] = items.splice(oldIndex, 1)
            items.splice(newIndex, 0, movedItem)
            firmwareStore.reorderFirmwares(items)
          }
        }
      })
    }
  })
})
</script>

<style scoped>
:deep(.n-data-table) {
  border-color: #2080f0 !important;
  background-color: transparent !important;
  
}

:deep(.n-data-table-wrapper) {
  background-color: transparent !important;
}

/* Pin use - 초록색 */
:deep(.row-pin td) {
  background-color: rgba(90, 210, 105, 0.5) !important;
}

:deep(.row-pin:hover td) {
  background-color: rgba(90, 210, 105, 0.6) !important;
}

/* No use & Test - 핑크색 */
:deep(.row-no-use-test td) {
  background-color: rgba(255, 105, 180, 0.15) !important;
}

:deep(.row-no-use-test:hover td) {
  background-color: rgba(255, 105, 180, 0.25) !important;
}

/* Test - 파란색 */
:deep(.row-test td) {
  background-color: rgba(29, 127, 238, 0.5) !important;
}

:deep(.row-test:hover td) {
  background-color: rgba(29, 127, 238, 0.6) !important;
}

/* No use - 빨간색 */
:deep(.row-no-use td) {
  background-color: rgba(249, 78, 78, 0.5) !important;
}

:deep(.row-no-use:hover td) {
  background-color: rgba(249, 78, 78, 0.6) !important;
}

/* Pagination info 스타일 */
:deep(.n-pagination-item) {
  color: #fff!important;
  border-color: #2080f0 !important;
  background-color: transparent !important;
}


:deep(.n-pagination-item--button:hover) {
  background-color: rgba(32, 128, 240, 0.1) !important;
  border-color: #2080f0 !important;
  
}

:deep(.n-pagination-item.n-pagination-item--active) {
  border-color: #2080f0 !important;
  color: #2080f0 !important;
}

:deep(.n-pagination-item--button:not(.n-pagination-item--disabled):hover) {
   color: #2080f0 !important;
   border-color: #2080f0 !important;
}

/* 드래그앤드롭 스타일 */
:deep(.n-data-table-tbody .n-data-table-tr) {
  cursor: move;
  transition: all 0.3s ease;
}

:deep(.sortable-ghost) {
  opacity: 0.4;
  background: rgba(32, 128, 240, 0.1) !important;
}

:deep(.sortable-chosen) {
  background: rgba(32, 128, 240, 0.15) !important;
}

:deep(.sortable-drag) {
  opacity: 0.8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

</style>