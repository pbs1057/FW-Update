import { ref, nextTick, onMounted  } from 'vue'
import type { DataTableInst } from 'naive-ui'
import type { Firmware } from '../type/type'
import { useFirmwareStore } from '../stores/useFirmwareStore'
import Sortable from 'sortablejs'

/**
 * 펌웨어 테이블 드래그앤드롭 정렬 컴포저블
 * FirmwarePage 에서 사용
 */
export function useFirmwareSortable(getData: () => Firmware[]) {
  const dataTableInst = ref<DataTableInst | null>(null)
  const firmwareStore = useFirmwareStore()

  onMounted(() => {
    nextTick(() => {
      const table = document.querySelector('.n-data-table-tbody') as HTMLElement
      if (!table) return

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
            const items = [...getData()]
            const [movedItem] = items.splice(oldIndex, 1)
            items.splice(newIndex, 0, movedItem)
            firmwareStore.reorderFirmwares(items)
          }
        }
      })
    })
  })

  const filterAddress = () => {
    dataTableInst.value?.filter({ buyer: ['For'] })
  }

  const sortName = () => {
    dataTableInst.value?.sort('version', 'ascend')
  }

  const clearFilters = () => {
    dataTableInst.value?.clearFilters()
  }

  const clearSorter = () => {
    dataTableInst.value?.clearSorter()
  }

  return {
    dataTableInst,
    filterAddress,
    sortName,
    clearFilters,
    clearSorter
  }
}
