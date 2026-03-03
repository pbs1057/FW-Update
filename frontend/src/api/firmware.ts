import type {
  Firmware,
  VerRev,
  VerRevCnt,
  Buyer,
  Model,
  ReleaseType,
  BuildMode,
  Priority,
  PlatformKey,
  EncryptLv
} from '../type/type'

const BASE_URL = '/api'

// ─────────────────────────────────────────────
// 공통 fetch 래퍼
// ─────────────────────────────────────────────
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`[${response.status}] ${url} - ${errorText}`)
  }
  return response.json() as Promise<T>
}

// ─────────────────────────────────────────────
// Firmware API
// ─────────────────────────────────────────────
export const firmwareApi = {
  /** 전체 목록 */
  getAll: () =>
    request<Firmware[]>('/firmwares'),

  /** 단건 조회 */
  getById: (id: string) =>
    request<Firmware>(`/firmwares/${id}`),

  /** 추가 (파일 업로드) */
  upload: (formData: FormData) =>
    request<Firmware>('/firmwares', {
      method: 'POST',
      headers: {},   // Content-Type은 브라우저가 multipart로 자동 설정
      body: formData
    }),

  /** 단건 수정 */
  update: (id: string, data: Partial<Firmware>) =>
    request<Firmware>(`/firmwares/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),

  /** 벌크 수정 */
  bulkUpdate: (payload: { ids: string[]; field: string; value: unknown }) =>
    request<void>('/firmwares/bulk', {
      method: 'PATCH',
      body: JSON.stringify(payload)
    }),

  /** 삭제 */
  delete: (id: string) =>
    request<void>(`/firmwares/${id}`, { method: 'DELETE' }),

  /** 벌크 삭제 */
  bulkDelete: (ids: string[]) =>
    request<void>('/firmwares/bulk', {
      method: 'DELETE',
      body: JSON.stringify({ ids })
    }),

  /** 순서 저장 (드래그앤드롭) */
  reorder: (ids: string[]) =>
    request<void>('/firmwares/reorder', {
      method: 'PUT',
      body: JSON.stringify({ ids })
    })
}

// ─────────────────────────────────────────────
// VerRev API
// ─────────────────────────────────────────────
export const verRevApi = {
  getAll: () =>
    request<VerRev[]>('/meta/verrevs'),

  update: (id: number, data: Partial<VerRev>) =>
    request<VerRev>(`/meta/verrevs/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
}

// ─────────────────────────────────────────────
// VerRevCnt API
// ─────────────────────────────────────────────
export const verRevCntApi = {
  getAll: () =>
    request<VerRevCnt[]>('/meta/verrevcnts')
}

// ─────────────────────────────────────────────
// Buyer API
// ─────────────────────────────────────────────
export const buyerApi = {
  getAll: () =>
    request<Buyer[]>('/meta/buyers'),

  add: (data: Omit<Buyer, 'id'>) =>
    request<Buyer>('/meta/buyers', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  update: (id: number, data: Partial<Buyer>) =>
    request<Buyer>(`/meta/buyers/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),

  delete: (id: number) =>
    request<void>(`/meta/buyers/${id}`, { method: 'DELETE' })
}

// ─────────────────────────────────────────────
// Model API
// ─────────────────────────────────────────────
export const modelApi = {
  getAll: () =>
    request<Model[]>('/meta/models'),

  add: (data: Omit<Model, 'id'>) =>
    request<Model>('/meta/models', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  update: (id: number, data: Partial<Model>) =>
    request<Model>(`/meta/models/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),

  delete: (id: number) =>
    request<void>(`/meta/models/${id}`, { method: 'DELETE' })
}

// ─────────────────────────────────────────────
// ReleaseType API
// ─────────────────────────────────────────────
export const releaseTypeApi = {
  getAll: () =>
    request<ReleaseType[]>('/meta/releasetypes'),

  add: (data: Omit<ReleaseType, 'id'>) =>
    request<ReleaseType>('/meta/releasetypes', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  update: (id: number, data: Partial<ReleaseType>) =>
    request<ReleaseType>(`/meta/releasetypes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),

  delete: (id: number) =>
    request<void>(`/meta/releasetypes/${id}`, { method: 'DELETE' })
}

// ─────────────────────────────────────────────
// BuildMode API
// ─────────────────────────────────────────────
export const buildModeApi = {
  getAll: () =>
    request<BuildMode[]>('/meta/buildmodes'),

  add: (data: Omit<BuildMode, 'id'>) =>
    request<BuildMode>('/meta/buildmodes', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  update: (id: number, data: Partial<BuildMode>) =>
    request<BuildMode>(`/meta/buildmodes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),

  delete: (id: number) =>
    request<void>(`/meta/buildmodes/${id}`, { method: 'DELETE' })
}

// ─────────────────────────────────────────────
// Priority API
// ─────────────────────────────────────────────
export const priorityApi = {
  getAll: () =>
    request<Priority[]>('/meta/priorities'),

  add: (data: Omit<Priority, 'id'>) =>
    request<Priority>('/meta/priorities', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  update: (id: number, data: Partial<Priority>) =>
    request<Priority>(`/meta/priorities/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),

  delete: (id: number) =>
    request<void>(`/meta/priorities/${id}`, { method: 'DELETE' })
}

// ─────────────────────────────────────────────
// PlatformKey API
// ─────────────────────────────────────────────
export const platformKeyApi = {
  getAll: () =>
    request<PlatformKey[]>('/meta/platformkeys'),

  add: (data: Omit<PlatformKey, 'id'>) =>
    request<PlatformKey>('/meta/platformkeys', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  update: (id: number, data: Partial<PlatformKey>) =>
    request<PlatformKey>(`/meta/platformkeys/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),

  delete: (id: number) =>
    request<void>(`/meta/platformkeys/${id}`, { method: 'DELETE' })
}

// ─────────────────────────────────────────────
// EncryptLv API
// ─────────────────────────────────────────────
export const encryptLvApi = {
  getAll: () =>
    request<EncryptLv[]>('/meta/encryptlvs'),

  add: (data: Omit<EncryptLv, 'id'>) =>
    request<EncryptLv>('/meta/encryptlvs', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  update: (id: number, data: Partial<EncryptLv>) =>
    request<EncryptLv>(`/meta/encryptlvs/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),

  delete: (id: number) =>
    request<void>(`/meta/encryptlvs/${id}`, { method: 'DELETE' })
}
