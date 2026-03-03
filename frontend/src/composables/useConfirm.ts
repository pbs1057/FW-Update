import { h } from 'vue'
import { useDialog, NButton, NSpace } from 'naive-ui'

export function useConfirm() {
  const dialog = useDialog()

  /**
   * 확인 다이얼로그를 띄우고 Yes면 true, Cancel이면 false를 반환
   * @param message  - 본문 메시지
   * @param title    - 제목 (기본값: 'Confirm')
   */
  const confirm = (message: string, title = 'Confirm'): Promise<boolean> => {
    return new Promise((resolve) => {
      const d = dialog.info({
        title,
        content: message,
        action: () =>
          h(NSpace, { justify: 'end' }, {
            default: () => [
                 h(NButton, {

                type: 'info',
                ghost: true,
                onClick: () => {
                  d.destroy()
                  resolve(true)
                }
              }, { default: () => 'Yes' }),
              h(NButton, {
                ghost: true,
                onClick: () => {
                  d.destroy()
                  resolve(false)
                }
              }, { default: () => 'Cancel' }),
             
            ]
          }),
        onClose: () => resolve(false)
      })
    })
  }

  return { confirm }
}

