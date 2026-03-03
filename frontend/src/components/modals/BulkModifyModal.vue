<template>
  <n-modal 
    :show="show"
    @update:show="$emit('update:show', $event)"
    preset="card" 
    style="width: 80vw; max-height: 85vh;" 
    :content-style="{ maxHeight: '73vh', overflow: 'auto' }"
    
  >
  <template #header>
  <n-gradient-text type="info" :size="24">Modify Firmware</n-gradient-text></template>
    <n-space vertical :size="12">
      <!-- 액션 컨트롤 -->
      <n-space justify="space-between">
        <n-button type = "info" ghost>{{ checkedRowKeys.length }}</n-button>
        <n-space>
        <n-select v-model:value="bulkPriority" :options="priorityOptions" placeholder="Priority" style="width: 150px;" />
        <n-button @click="applyBulkPriority" type="info" ghost :disabled="!bulkPriority || checkedRowKeys.length === 0">Modify</n-button>
        </n-space>

        <n-space>
        <n-select v-model:value="bulkUse" :options="useOptions" placeholder="Use" style="width: 150px;" />
        <n-button @click="applyBulkUse" type="info" ghost :disabled="bulkUse === null || checkedRowKeys.length === 0">Modify</n-button>
        </n-space>

        <n-space>
          
        <n-select v-model:value="bulkTest" :options="testOptions" placeholder="Test" style="width: 150px;" />
        <n-button @click="applyBulkTest" type="info" ghost :disabled="bulkTest === null || checkedRowKeys.length === 0">Modify</n-button>
        </n-space>

        <n-button @click="handleBulkDelete" type="error" ghost :disabled="checkedRowKeys.length === 0">Delete</n-button>
      </n-space>
      
      <!-- 벌크 수정용 테이블 -->
      <n-data-table
        :columns="bulkColumns"
        :data="data"
        :row-key="(row: Firmware) => row.id"
        :checked-row-keys="checkedRowKeys"
        :row-props="rowProps"
        :row-class-name="rowClassName"
        max-height="55vh"
        @update:checked-row-keys="handleCheck"
      />
    </n-space>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NModal, NSpace, NSelect, NTag, NButton, NDataTable } from 'naive-ui'
import type { Firmware } from '../../type/type'
import { useConfirm } from '../../composables/useConfirm'



interface Props {
  show: boolean
  data: Firmware[]
  priorityOptions: { label: string; value: string }[]
  modelOptions: { label: string; value: string }[]
}

interface Emits {
  (e: 'update:show', value: boolean): void
  (e: 'bulkUpdate', payload: { ids: string[]; field: string; value: any }): void
  (e: 'bulkDelete', ids: string[]): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const { confirm } = useConfirm()

const checkedRowKeys = ref<Array<string | number>>([])
const bulkPriority = ref<string | null>(null)
const bulkUse = ref<string | null>(null)
const bulkTest = ref<string | null>(null)

const useOptions = [
  { label: 'Use', value: 'use' },
  { label: 'Unuse', value: 'unuse' }
]

const testOptions = [
  { label: 'Test', value: 'test' },
  { label: 'UnTest', value: 'untest' }
]

// 동적 필터 옵션 생성
const versionOptions = computed(() => {
  const versions = Array.from(new Set(props.data.map(d => d.version)))
  return versions.map(v => ({ label: v, value: v }))
})

const revisionOptions = computed(() => {
  const revisions = Array.from(new Set(props.data.map(d => d.revision)))
  return revisions.map(r => ({ label: r, value: r }))
})

const handleCheck = (keys: Array<string | number>) => {
  checkedRowKeys.value = keys
}

const rowProps = (row: Firmware) => {
  return {
    style: 'cursor: pointer;',
    onClick: (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // 체크박스 클릭 시 중복 처리 방지
      if (target.closest('.n-checkbox')) return
      const index = checkedRowKeys.value.indexOf(row.id)
      if (index === -1) {
        checkedRowKeys.value.push(row.id)
      } else {
        checkedRowKeys.value.splice(index, 1)
      }
    }
  }
}

const rowClassName = (row: Firmware) => {
  return checkedRowKeys.value.includes(row.id) ? 'checked-row' : ''
}

const applyBulkPriority = async () => {
  if (!bulkPriority.value || checkedRowKeys.value.length === 0) return
  const ok = await confirm(`Do you want to update priority for ${checkedRowKeys.value.length} item(s)?`)
  if (!ok) return
  emit('bulkUpdate', { 
    ids: checkedRowKeys.value as string[], 
    field: 'priority', 
    value: bulkPriority.value 
  })
  bulkPriority.value = null
}

const applyBulkUse = async () => {
  if (bulkUse.value === null || checkedRowKeys.value.length === 0) return
  const ok = await confirm(`Do you want to update use for ${checkedRowKeys.value.length} item(s)?`)
  if (!ok) return
  emit('bulkUpdate', { 
    ids: checkedRowKeys.value as string[], 
    field: 'use', 
    value: bulkUse.value === 'use'
  })
  bulkUse.value = null
}

const applyBulkTest = async () => {
  if (bulkTest.value === null || checkedRowKeys.value.length === 0) return
  const ok = await confirm(`Do you want to update test for ${checkedRowKeys.value.length} item(s)?`)
  if (!ok) return
  emit('bulkUpdate', { 
    ids: checkedRowKeys.value as string[], 
    field: 'test', 
    value: bulkTest.value === 'test'
  })
  bulkTest.value = null
}

const handleBulkDelete = async () => {
  if (checkedRowKeys.value.length === 0) return
  const ok = await confirm(`Do you want to delete ${checkedRowKeys.value.length} item(s)?`)
  if (!ok) return
  emit('bulkDelete', checkedRowKeys.value as string[])
  checkedRowKeys.value = []
}

const bulkColumns = computed<DataTableColumns<Firmware>>(() => [
  {
    type: 'selection'
  },
  {
    title: 'ID',
    key: 'id',
    width: 100
  },
  {
    title: 'Version',
    key: 'version',
    width: 120,
    filterOptions: versionOptions.value,
    filter(value, row) {
      return row.version === value
    }
  },
  {
    title: 'Revision',
    key: 'revision',
    width: 120,
    filterOptions: revisionOptions.value,
    filter(value, row) {
      return row.revision === value
    }
  },
  {
    title: 'Model',
    key: 'model',
    width: 150,
    filterOptions: props.modelOptions,
    filter(value, row) {
      return row.model === value
    }
  },
  {
    title: 'Priority',
    key: 'priority',
    width: 120,
    filterOptions: props.priorityOptions,
    filter(value, row) {
      return row.priority === value
    }
  },
  {
    title: 'Use',
    key: 'use',
    width: 80,
    render: (row) => row.use ? 'O' : 'X'
  },
  {
    title: 'Test',
    key: 'test',
    width: 80,
    render: (row) => row.test ? 'O' : 'X'
  }
])
</script>

<style scoped>
:deep(.checked-row td) {
  background-color: rgba(128, 128, 128, 0.25) !important;
}

:deep(.checked-row:hover) {
  background-color: rgba(128, 128, 128, 0.35) !important;
}

:deep(.n-pagination-item--button:hover) {
  background-color: rgba(32, 128, 240, 0.1) !important;
}

:deep(.n-pagination-item.n-pagination-item--active) {
  color: black !important;
  border-color: #2080f0 !important;
}

:deep(.n-pagination-item--button:not(.n-pagination-item--disabled):hover) {
  color: #2080f0 !important;
}

:deep(.n-select) {
  color: var(--accent-color) !important;
}

:deep(.n-select .n-base-selection) {
  --n-border-hover: 1px solid var(--accent-color) !important;
  --n-border-focus: 1px solid var(--accent-color) !important;
  --n-border-active: 1px solid var(--accent-color) !important;
  --n-box-shadow-focus: 0 0 0 2px var(--accent-color-20) !important;
  --n-box-shadow-active: 0 0 0 2px var(--accent-color-20) !important;
  --n-caret-color: var(--accent-color) !important;
  --n-arrow-color: var(--accent-color) !important;
  --n-color-active: transparent !important;
}
</style>
