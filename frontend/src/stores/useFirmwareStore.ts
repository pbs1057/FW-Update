import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Firmware } from '../type/type'

// 랜덤 데이터를 생성하는 헬퍼 함수들
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
const randomElement = <T>(arr: T[]): T => arr[random(0, arr.length - 1)]
const randomBoolean = () => Math.random() > 0.5

const versions = ['v1.6.8', 'v1.6.9', 'v1.7.0', 'v1.7.1', 'v1.7.2', 'v1.8.0', 'v1.8.1', 'v2.0.0', 'v2.0.1', 'v2.1.0']
const models = ['Model A', 'Model B', 'Model C', 'Model D', 'Model E', 'Model F', 'Model G', 'Model H']
const buyers = [1, 2, 3, 4, 5, 6, 7, 8]
const types = ['FULL', 'RELEASE', 'PATCH', 'RECOVERY']
const modes = ['FACTORY', 'BUYER', 'DEBUG', 'KDBG']
const priorities = ['Force', 'High', 'Normal', 'Low', 'Urgent']
const encryptLevels = ['Level 1', 'Level 2', 'Level 3']

// MD5 해시 생성 (랜덤)
const generateMd5 = () => {
  const chars = '0123456789abcdef'
  let md5 = ''
  for (let i = 0; i < 32; i++) {
    md5 += chars[random(0, 15)]
  }
  return md5
}

// 날짜 생성 (2025-01-01 ~ 2025-12-31)
const generateRandomDate = () => {
  const year = 2025
  const month = String(random(1, 12)).padStart(2, '0')
  const day = String(random(1, 28)).padStart(2, '0')
  const hour = String(random(0, 23)).padStart(2, '0')
  const minute = String(random(0, 59)).padStart(2, '0')
  const second = String(random(0, 59)).padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

// 200개의 펌웨어 데이터 생성
const generateFirmwareData = (): Firmware[] => {
  const firmwares: Firmware[] = []
  
  for (let i = 0; i < 200; i++) {
    const sizeInMB = random(50, 500)
    const sizeInBytes = sizeInMB * 1024 * 1024
    
    firmwares.push({
      key: i,
      id: `${String(i + 1)}`,
      version: randomElement(versions),
      revision: `r${random(27000, 35000)}`,
      size: `${sizeInMB}.${random(10, 99)} MB`,
      systemId: `${random(42000000, 42999999)}`,
      md5: generateMd5(),
      model: randomElement(models),
      buyer: randomElement(buyers),
      type: randomElement(types),
      mode: randomElement(modes),
      regDate: generateRandomDate(),
      download: random(1, 5000),
      priority: randomElement(priorities),
      platformKey: `${random(20160225, 20260225)}`,
      encryptLevel: randomElement(encryptLevels),
      needFacRst: randomBoolean(),
      use: randomBoolean(),
      test: randomBoolean(),
      onlyApp: randomBoolean(),
      pinUse: randomBoolean(),
      pinCode: randomBoolean() ? null : String(random(1000, 9999)),
      pinMax: random(1, 5),
      pinCount: random(0, 3)
    })
  }
  
  return firmwares
}

export const useFirmwareStore = defineStore('firmware', () => {
  const firmwares = ref<Firmware[]>(generateFirmwareData())
  
  // 펌웨어 목록 가져오기
  const getFirmwares = () => firmwares.value
  
  // 특정 펌웨어 가져오기
  const getFirmwareById = (id: string) => {
    return firmwares.value.find(fw => fw.id === id)
  }
  
  // 펌웨어 업데이트
  const updateFirmware = (id: string, updatedData: Partial<Firmware>) => {
    const index = firmwares.value.findIndex(fw => fw.id === id)
    if (index !== -1) {
      firmwares.value[index] = { ...firmwares.value[index], ...updatedData }
      return true
    }
    return false
  }
  
  // 펌웨어 삭제
  const deleteFirmware = (id: string) => {
    const index = firmwares.value.findIndex(fw => fw.id === id)
    if (index !== -1) {
      firmwares.value.splice(index, 1)
      return true
    }
    return false
  }
  
  // 펌웨어 추가
  const addFirmware = (firmware: Omit<Firmware, 'key'>) => {
    const newKey = Math.max(...firmwares.value.map(fw => fw.key)) + 1
    firmwares.value.push({ ...firmware, key: newKey })
  }
  
  // 데이터 다시 생성
  const regenerateData = () => {
    firmwares.value = generateFirmwareData()
  }
  
  // 펌웨어 순서 재배열
  const reorderFirmwares = (newOrder: Firmware[]) => {
    firmwares.value = newOrder
  }
  
  return {
    firmwares,
    getFirmwares,
    getFirmwareById,
    updateFirmware,
    deleteFirmware,
    addFirmware,
    regenerateData,
    reorderFirmwares
  }
})
