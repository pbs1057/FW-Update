import { computed } from 'vue'
import { useFirmwareMetaStore } from '../stores/useFirmwareMetaStore'

/**
 * 테이블 필터 옵션을 반환
 * FirmwarePage, BulkModifyModal wrapping 등 여러 곳에서 공통 사용
 */
export function useMetaOptions() {
  const metaStore = useFirmwareMetaStore()

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
    metaStore.getBuyers().map(b => ({ label: b.name, value: b.name }))
  )

  return {
    priorityOptions,
    typeOptions,
    modeOptions,
    encryptLevelOptions,
    modelOptions,
    buyerOptions
  }
}
