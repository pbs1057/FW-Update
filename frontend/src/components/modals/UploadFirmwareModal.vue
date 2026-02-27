<template>
  <n-modal 
    :show="show"
    @update:show="$emit('update:show', $event)"
    preset="card" 
    style="width: 70vw; max-height: 85vh;"
    :header-style="{ paddingBottom: '8px' }"
  >
    <template #header>
      <n-gradient-text type="info">
        Upload Firmware
      </n-gradient-text>
    </template>

    <n-space vertical :size="16">
      <!-- 액션 컨트롤 -->
      <n-space justify="space-between">
        <n-button type="info"ghost>{{ checkedRowKeys.length }}</n-button>
        <n-button @click="" type="info" ghost>Add Firmware</n-button>
      </n-space>
      
      <!-- 업로드 파일 테이블 -->
      <n-data-table
        :columns="columns"
        :data="uploadedFiles"
        :row-key="(row: UploadFile) => row.id"
        :checked-row-keys="checkedRowKeys"
        @update:checked-row-keys="handleCheck"
        :pagination="false"
        max-height="50vh"
      >
        <template #empty>
          <div style="padding: 40px 0; text-align: center; color: #999;">
            Not found.
          </div>
        </template>
      </n-data-table>
    </n-space>

    <template #footer>
      <n-space justify="end">
        <n-button type="info" ghost @click="handleUpload" :disabled="uploadedFiles.length === 0">Upload</n-button>
        <n-button @click="$emit('update:show', false)">Cancel</n-button>
      </n-space>
    </template>
  </n-modal>

  <!-- 숨겨진 파일 input -->
  <input
    ref="fileInputRef"
    type="file"
    multiple
    accept=".bin,.hex,.fw"
    style="display: none"
    @change="handleFileChange"
  />
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { NCheckbox, NGradientText } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

interface UploadFile {
  id: string
  name: string
  size: string
  md5: string
  file: File
}

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
  'upload': [files: File[]]
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const uploadedFiles = ref<UploadFile[]>([])
const checkedRowKeys = ref<string[]>([])

const columns: DataTableColumns<UploadFile> = [
  {
    type: 'selection',
    align: 'center'
  },
  {
    title: 'Name',
    key: 'name',
    align: 'center',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: 'Size',
    key: 'size',
    align: 'center',
    width: 150
  },
  {
    title: 'MD5',
    key: 'md5',
    align: 'center',
    width: 250,
    ellipsis: {
      tooltip: true
    }
  }
]

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

const calculateMD5 = async (file: File): Promise<string> => {
  // MD5 계산 (실제로는 crypto-js 같은 라이브러리 필요)
  // 임시로 파일명 기반 해시 생성
  return 'MD5_' + file.name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 20)
}

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  
  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const md5 = await calculateMD5(file)
      
      uploadedFiles.value.push({
        id: `${Date.now()}_${i}`,
        name: file.name,
        size: formatFileSize(file.size),
        md5: md5,
        file: file
      })
    }
  }
  
  // input 초기화
  if (target) {
    target.value = ''
  }
}

const handleAddFirmware = () => {
  fileInputRef.value?.click()
}

const handleCheck = (keys: string[]) => {
  checkedRowKeys.value = keys
}

const handleUpload = () => {
  const filesToUpload = uploadedFiles.value.map(f => f.file)
  emit('upload', filesToUpload)
  
  // 초기화
  uploadedFiles.value = []
  checkedRowKeys.value = []
  emit('update:show', false)
}
</script>

<style scoped>
:deep(.n-data-table-td) {
  padding: 8px 12px !important;
}

:deep(.n-data-table-th) {
  padding: 8px 12px !important;
  font-weight: 600;
}
</style>
