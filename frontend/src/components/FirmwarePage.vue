<template>
  <div style="max-width: 1400px; margin: 0 auto; padding: 0 16px;">
    <n-space vertical :size="12">
      <n-space justify="space-between" style="width: 100%;">
        <n-space>
          <n-tag>Use</n-tag>
          <n-tag type="error">NoUse</n-tag>
          <n-tag type="info">Test</n-tag>
          <n-tag ghost
            :color="{ textColor: 'rgba(249, 127, 188, 0.831)', borderColor: 'rgba(249, 127, 188, 0.831)' }">NoUse
            & Test</n-tag>
          <n-tag type="success">Pin</n-tag>
        </n-space>
        <n-space>
          <n-button @click="openUploadModal" type="info" ghost>Upload Firmware</n-button>
          <n-button @click="openModifyModal" type="info" ghost>Modify Firmware</n-button>
        </n-space>
      </n-space>

      <n-data-table 
      ref="dataTableInst" 
      :columns="columns" 
      :data="data" 
      :pagination="{ showSizePicker: true, pageSizes: [10, 20, 50, 200] }"
      :row-props="rowProps" max-height="65vh" :scroll-x="1200" />

      <!-- 업로드 모달 -->
      <UploadFirmwareModal 
      v-model:show="showUploadModal" 
      @upload="handleUpload" />

      <!-- 벌크 수정 모달 -->
      <BulkModifyModal 
      v-model:show="showBulkModal" 
      :data="data" 
      :priority-options="priorityOptions"
      :model-options="modelOptions" 
      @bulk-update="handleBulkUpdate" 
      @bulk-delete="handleBulkDelete" />

      <!-- 상세 정보 모달 -->
      <FirmwareDetailModal  
        v-model:show="showModal"
        v-model:selected-row="selectedRow"
        :priority-options="priorityOptions"
        :model-options="modelOptions"
        :buyer-options="buyerOptions"
        :encrypt-level-options="encryptLevelOptions"
        :type-options="typeOptions"
        :mode-options="modeOptions"
        @save="saveChanges"
        @delete="deleteFirmware"
      />
    </n-space>
  </div>
</template>

<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { ref, computed } from 'vue'
import { NButton, NSpace } from 'naive-ui'
import { useFirmwareStore } from '../stores/useFirmwareStore'
import { useFirmwareMetaStore } from '../stores/useFirmwareMetaStore'
import type { Firmware } from '../type/type'
import BulkModifyModal from './modals/BulkModifyModal.vue'
import UploadFirmwareModal from './modals/UploadFirmwareModal.vue'
import FirmwareDetailModal from './modals/FirmwareDetailModal.vue'
import { useFirmwareCrud } from '../composables/useFirmwareCrud'
import { useFirmwareRowStyle } from '../composables/useFirmwareRowStyle'
import { useFirmwareSortable } from '../composables/useFirmwareSortable'
import { useMetaOptions } from '../composables/useMetaOptions'

const firmwareStore = useFirmwareStore()
const metaStore = useFirmwareMetaStore()

// 펌웨어 CRUD (상세 모달 열기/저장/삭제/벌크 처리)
const {
  showModal,
  selectedRow,
  handleRowClick,
  saveChanges,
  deleteFirmware,
  handleBulkUpdate,
  handleBulkDelete
} = useFirmwareCrud()

// 행 스타일 (상태별 클래스, switch 스타일)
const { getFirmwareRowProps } = useFirmwareRowStyle()

// 메타 스토어 셀렉트 옵션
const { priorityOptions, typeOptions, modeOptions, encryptLevelOptions, modelOptions, buyerOptions } = useMetaOptions()

// 벌크/업로드 모달
const showBulkModal = ref(false)
const showUploadModal = ref(false)

const openModifyModal = () => { showBulkModal.value = true }
const openUploadModal = () => { showUploadModal.value = true }

const handleUpload = (files: File[]) => {
  console.log('Uploading files:', files)
  // TODO: 실제 업로드 로직 구현
}

// rowProps: 상태별 클래스 + 클릭 핸들러
const rowProps = (row: Firmware) => getFirmwareRowProps(row, handleRowClick)

// 펌웨어 데이터
const data = computed(() => firmwareStore.getFirmwares())

// 드래그앤드롭 정렬
const { dataTableInst } = useFirmwareSortable(() => data.value)

// Version / Revision 필터 옵션 (중복 제거)
const versionOptions = computed(() => {
  const versions = Array.from(new Set(data.value.map(d => d.version)))
  return versions.map(v => ({ label: v, value: v }))
})

const revisionOptions = computed(() =>
  metaStore.getReleaseTypes().map(r => ({ label: r.name, value: r.name }))
)

//ID  Version  Revision  Size  Model  Buyer  Type  Priority  Download
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
</script>

<style scoped>
:deep(.n-data-table) {
  border-color: var(--accent-color) !important;
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
  background-color: rgba(249, 127, 188, 0.831) !important;
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
  border-color: var(--accent-color) !important;
  background-color: transparent !important;
}

:deep(.n-pagination-item--button:hover) {
  background-color: var(--accent-color-10) !important;
  border-color: var(--accent-color) !important;
}

:deep(.n-pagination-item.n-pagination-item--active) {
  border-color: var(--accent-color) !important;
  color: var(--accent-color) !important;
}

:deep(.n-pagination-item--button:not(.n-pagination-item--disabled):hover) {
  color: var(--accent-color) !important;
  border-color: var(--accent-color) !important;
}

/* Pagination size picker 스타일 - CSS 변수 override */
:deep(.n-pagination .n-select .n-base-selection) {
  --n-border: 1px solid var(--accent-color) !important;
  --n-border-hover: 1px solid var(--accent-color) !important;
  --n-border-focus: 1px solid var(--accent-color) !important;
  --n-border-active: 1px solid var(--accent-color) !important;
  --n-box-shadow-focus: 0 0 0 2px var(--accent-color-20) !important;
  --n-box-shadow-active: 0 0 0 2px var(--accent-color-20) !important;
  --n-box-shadow-hover: none !important;
  --n-caret-color: var(--accent-color) !important;
  --n-color: transparent !important;
  --n-color-active: transparent !important;
  --n-arrow-color: var(--accent-color) !important;
  --n-loading-color: var(--accent-color) !important;
}

:deep(.n-pagination) {
  color: var(--accent-color) !important;
}

:global(.n-select-menu) {
  background-color: var(--select-menu-bg) !important;
  border-color: var(--accent-color) !important;
  --n-color: var(--select-menu-bg) !important;
  --n-option-color-pending: var(--accent-color-15) !important;
  --n-option-color-active: var(--accent-color-10) !important;
  --n-option-color-active-pending: var(--accent-color-20) !important;
  --n-option-text-color: var(--select-menu-text) !important;
  --n-option-text-color-active: var(--accent-color) !important;
  --n-option-text-color-pressed: var(--accent-color) !important;
  --n-option-check-color: var(--accent-color) !important;
  --n-group-header-text-color: rgba(128, 128, 128, 0.7) !important;
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