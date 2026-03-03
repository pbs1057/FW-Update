<template>
  <n-modal v-model:show="show" preset="card" style="width: 600px;  ">
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
        <n-button @click="handleSave" type="info" ghost>Modify</n-button>
        <n-button @click="handleDelete" type="error" ghost>Delete</n-button>
        <n-button @click="show = false">Cancel</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NModal, NSpace, NForm, NInput, NInputNumber, NInputGroup, NSelect, NSwitch, NTag, NGrid, NGi, NGradientText, NButton } from 'naive-ui'
import type { Firmware } from '../../type/type'
import { useFirmwareRowStyle } from '../../composables/useFirmwareRowStyle'
import { useConfirm } from '../../composables/useConfirm'

interface Props {
  show: boolean
  selectedRow: Firmware | null
  priorityOptions: { label: string; value: string }[]
  modelOptions: { label: string; value: string }[]
  buyerOptions: { label: string; value: number | string }[]
  encryptLevelOptions: { label: string; value: string }[]
  typeOptions: { label: string; value: number | string }[]
  modeOptions: { label: string; value: number | string }[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:show': [value: boolean]
  'update:selectedRow': [value: Firmware]
  'save': [firmware: Firmware]
  'delete': [id: string]
}>()

const show = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
})

const selectedRow = computed({
  get: () => props.selectedRow,
  set: (value) => value && emit('update:selectedRow', value)
})

// switch 스타일 (기존 로컬 정의 → 컴포저블로 통합)
const { switchRailStyle } = useFirmwareRowStyle()
const { confirm } = useConfirm()

const handleSave = async () => {
  if (!selectedRow.value) return
  show.value = false
  const ok = await confirm('Do you want to update firmware?')
  if (!ok) {
    show.value = true
    return
  }
  emit('save', selectedRow.value)
}

const handleDelete = async () => {
  if (!selectedRow.value) return
  show.value = false
  const ok = await confirm(`Do you want to delete ID ${selectedRow.value.id}?`)
  if (!ok) {
    show.value = true
    return
  }
  emit('delete', selectedRow.value.id)
}
</script>

<style scoped>
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
  --n-color-active: transparent !important;
}

:deep(.n-input-number .n-input) {
  --n-border-hover: 1px solid var(--accent-color) !important;
  --n-border-focus: 1px solid var(--accent-color) !important;
  --n-box-shadow-focus: 0 0 0 2px var(--accent-color-20) !important;
  --n-caret-color: var(--accent-color) !important;
  --n-color-focus: transparent !important;
}

:deep(.n-input-number-button) {
  color: var(--accent-color) !important;
  border-color: var(--accent-color) !important;
}
</style>
