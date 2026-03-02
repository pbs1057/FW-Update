import type { Firmware } from '../type/type'

/**
 * 펌웨어 테이블 행 스타일 관련 공통 로직 컴포저블
 * - 행 상태(use/test/pin)에 따른 클래스명 결정
 * - n-switch 스타일 함수
 */
export function useFirmwareRowStyle() {
  /** 펌웨어 상태에 따라 행 CSS 클래스명 반환 */
  const getFirmwareRowClass = (row: Firmware): string => {
    let className = 'custom-row'

    if (row.use && row.pinUse) {
      className += ' row-pin'
    } else if (!row.use && row.test) {
      className += ' row-no-use-test'
    } else if (row.use && row.test) {
      className += ' row-test'
    } else if (row.use) {
      className += ' row-use'
    } else {
      className += ' row-no-use'
    }
    return className
  }

  /**
   * 데이터 테이블 row-props 생성 함수
   * @param row 펌웨어 행 데이터
   * @param onClick 클릭 시 실행할 콜백
   */
  const getFirmwareRowProps = (row: Firmware, onClick: (row: Firmware) => void) => ({
    class: getFirmwareRowClass(row),
    style: { cursor: 'pointer' },
    onClick: () => onClick(row)
  })

  /** n-switch 컴포넌트의 커스텀 레일 스타일 */
  const switchRailStyle = ({
    focused,
    checked
  }: {
    focused: boolean
    checked: boolean
  }) => ({
    background: checked ? '#2080f0' : '#d0d0d0',
    boxShadow: focused ? '0 0 0 2px rgba(32, 128, 240, 0.3)' : 'none'
  })

  return {
    getFirmwareRowClass,
    getFirmwareRowProps,
    switchRailStyle
  }
}
