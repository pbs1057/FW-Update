import { ref } from 'vue'
import type { Firmware } from '../type/type'
import { useFirmwareStore } from '../stores/useFirmwareStore'

/**
 *  CRUD 공통 로직
 * - 행 클릭 → 상세 모달
 * - 저장 / 삭제 / 벌크 수정 / 벌크 삭제
 */
export function useFirmwareCrud() {
  const firmwareStore = useFirmwareStore()

  const showModal = ref(false)
  const selectedRow = ref<Firmware | null>(null)

  /** 행 클릭 → 상세 모달 오픈 */
  const handleRowClick = (row: Firmware) => {
    selectedRow.value = { ...row }
    showModal.value = true
  }

  /** 상세 모달에서 저장 */
  const saveChanges = (firmware: Firmware) => {
    firmwareStore.updateFirmware(firmware.id, firmware)
    showModal.value = false
  }

  /** 상세 모달에서 삭제 */
  const deleteFirmware = (id: string) => {
    firmwareStore.deleteFirmware(id)
    showModal.value = false
  }

  /** 벌크 수정 모달에서 필드 일괄 변경 */
  const handleBulkUpdate = (payload: { ids: string[]; field: string; value: any }) => {
    payload.ids.forEach(id => {
      const firmware = firmwareStore.getFirmwares().find(f => f.id === id)
      if (firmware) {
        firmwareStore.updateFirmware(id, { ...firmware, [payload.field]: payload.value })
      }
    })
  }

  /** 벌크 수정 모달에서 일괄 삭제 */
  const handleBulkDelete = (ids: string[]) => {
    ids.forEach(id => firmwareStore.deleteFirmware(id))
  }

  return {
    showModal,
    selectedRow,
    handleRowClick,
    saveChanges,
    deleteFirmware,
    handleBulkUpdate,
    handleBulkDelete
  }
}
