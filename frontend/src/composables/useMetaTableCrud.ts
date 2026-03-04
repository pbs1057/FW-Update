import { ref } from 'vue'
import { useConfirm } from './useConfirm'

/**
 * 메타 테이블 공통 CRUD 컴포저블
 * BuyerTable, ModelTable, PriorityTable, ReleaseTypeTable,
 * BuildModeTable, EncryptLvTable, PlatformKeyTable 에서 공통으로 사용
 */
export function useMetaTableCrud<T extends { id: number }>() {
  const showModal = ref(false)
  const selectedRow = ref<T | null>(null)
  const isEdit = ref(false)
  const { confirm } = useConfirm()

  /** 행 클릭 시 수정 모달 오픈 */
  const rowProps = (row: T) => ({
    style: 'cursor: pointer;',
    onClick: () => {
      selectedRow.value = { ...row }
      isEdit.value = true
      showModal.value = true
    }
  })

  /**
   * 추가 버튼 클릭 핸들러
   */
  const openAdd = (items: T[], createDefault: (nextId: number) => T) => {
    const maxId = items.reduce((max, item) => (item.id > max ? item.id : max), 0)
    selectedRow.value = createDefault(maxId + 1)
    isEdit.value = false
    showModal.value = true
  }

  /**
   * 저장 버튼 클릭 핸들러
   * @param updateFn 수정 시 호출할 스토어 함수
   * @param addFn    추가 시 호출할 스토어 함수
   */
  const handleSave = async (
    updateFn: (id: number, data: Partial<T>) => void,
    addFn: (item: T) => void
  ) => {
    if (!selectedRow.value) return
    const message = isEdit.value ? 'Do you want to update?' : 'Do you want to add?'
    showModal.value = false
    const ok = await confirm(message)
    if (!ok) {
      showModal.value = true
      return
    }
    if (isEdit.value) {
      updateFn(selectedRow.value.id, selectedRow.value)
    } else {
      addFn(selectedRow.value)
    }
  }

  /**
   * 삭제 버튼 클릭 핸들러
   * @param deleteFn 삭제 시 호출할 스토어 함수
   */
  const handleDelete = async (deleteFn: (id: number) => void) => {
    if (!selectedRow.value) return
    showModal.value = false
    const ok = await confirm(`Do you want to delete ID ${selectedRow.value.id}?`)
    if (!ok) {
      showModal.value = true
      return
    }
    deleteFn(selectedRow.value.id)
  }

  return {
    showModal,
    selectedRow,
    isEdit,
    rowProps,
    openAdd,
    handleSave,
    handleDelete
  }
}
