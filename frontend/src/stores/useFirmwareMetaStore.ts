import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { VerRev, VerRevCnt, Buyer, Model, ReleaseType, BuildMode, Priority, PlatformKey, EncryptLv } from '../type/type'

// 랜덤 헬퍼 함수
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
const randomElement = <T>(arr: T[]): T => arr[random(0, arr.length - 1)]

// VerRev 데이터 생성
const generateVerRevData = (): VerRev[] => {
  const versions = ['v1.6.8', 'v1.6.9', 'v1.7.0', 'v1.7.1', 'v1.7.2', 'v1.8.0', 'v1.8.1', 'v2.0.0', 'v2.0.1', 'v2.1.0']
  const data: VerRev[] = []
  let idCounter = 1
  
  versions.forEach((version, idx) => {
    for (let i = 0; i < random(3, 8); i++) {
      const revNum = 27000 + idx * 1000 + i * 100
      data.push({
        id: idCounter++,
        version,
        revision: `r${revNum}`,
        note: `Release notes for ${version} revision ${revNum}`
      })
    }
  })
  
  return data
}

// VerRevCnt 데이터 생성
const generateVerRevCntData = (): VerRevCnt[] => {
  const versions = ['v1.6.8', 'v1.6.9', 'v1.7.0', 'v1.7.1', 'v1.7.2', 'v1.8.0', 'v1.8.1', 'v2.0.0', 'v2.0.1', 'v2.1.0']
  const data: VerRevCnt[] = []
  let idCounter = 1
  
  versions.forEach((version, idx) => {
    for (let i = 0; i < random(2, 5); i++) {
      const revNum = 27000 + idx * 1000 + i * 100
      data.push({
        id: idCounter++,
        version,
        revision: `r${revNum}`,
        count: random(1, 500),
        model: `Model ${String.fromCharCode(65 + random(0, 7))}`
      })
    }
  })
  
  return data
}

// Buyer 데이터 생성
const generateBuyerData = (): Buyer[] => {
  return [
    { id: 1, name: 'FOR' },
    { id: 2, name: 'FALC' },
    { id: 3, name: 'BLA' },
    { id: 4, name: 'ICON' },
    { id: 5, name: 'ZP' },
    { id: 6, name: 'TEST' },
    { id: 7, name: 'OEM' },
    { id: 8, name: 'PARTNER' }
  ]
}

// Model 데이터 생성
const generateModelData = (): Model[] => {
  return [
    { id: 1, systemId: '42000102', name: 'Model A', buyer: 1 },
    { id: 2, systemId: '42000103', name: 'Model B', buyer: 2 },
    { id: 3, systemId: '42000104', name: 'Model C', buyer: 3 },
    { id: 4, systemId: '42000105', name: 'Model D', buyer: 4 },
    { id: 5, systemId: '42000106', name: 'Model E', buyer: 5 },
    { id: 6, systemId: '42000107', name: 'Model F', buyer: 6 },
    { id: 7, systemId: '42000108', name: 'Model G', buyer: 7 },
    { id: 8, systemId: '42000109', name: 'Model H', buyer: 8 }
  ]
}

// ReleaseType 데이터 생성
const generateReleaseTypeData = (): ReleaseType[] => {
  return [
    { id: 1, name: 'Full Release', fileString: 'FULL' },
    { id: 2, name: 'Standard Release', fileString: 'RELEASE' },
    { id: 3, name: 'Patch Update', fileString: 'PATCH' },
    { id: 4, name: 'Recovery Mode', fileString: 'RECOVERY' }
  ]
}

// BuildMode 데이터 생성
const generateBuildModeData = (): BuildMode[] => {
  return [
    { id: 1, name: 'Factory Mode', fileString: 'FACTORY' },
    { id: 2, name: 'Buyer Mode', fileString: 'BUYER' },
    { id: 3, name: 'Debug Mode', fileString: 'DEBUG' },
    { id: 4, name: 'Kernel Debug', fileString: 'KDBG' }
  ]
}

// Priority 데이터 생성
const generatePriorityData = (): Priority[] => {
  return [
    { id: 1, name: 'Force' },
    { id: 2, name: 'High' },
    { id: 3, name: 'Normal' },
    { id: 4, name: 'Low' },
    { id: 5, name: 'Urgent' }
  ]
}

// PlatformKey 데이터 생성
const generatePlatformKeyData = (): PlatformKey[] => {
  const data: PlatformKey[] = []
  const startDate = new Date('2016-02-25')
  
  for (let i = 0; i < 20; i++) {
    const date = new Date(startDate)
    date.setMonth(date.getMonth() + i * 6)
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '')
    
    data.push({
      id: i + 1,
      keyDate: dateStr
    })
  }
  
  return data
}

// EncryptLv 데이터 생성
const generateEncryptLvData = (): EncryptLv[] => {
  return [
    { id: 1, value: '0x01', name: 'Level 1', descr: 'Basic encryption' },
    { id: 2, value: '0x02', name: 'Level 2', descr: 'Standard encryption' },
    { id: 3, value: '0x03', name: 'Level 3', descr: 'Advanced encryption' }
  ]
}

export const useFirmwareMetaStore = defineStore('firmwareMeta', () => {
  // 각 테이블 데이터
  const verRevs = ref<VerRev[]>(generateVerRevData())
  const verRevCnts = ref<VerRevCnt[]>(generateVerRevCntData())
  const buyers = ref<Buyer[]>(generateBuyerData())
  const models = ref<Model[]>(generateModelData())
  const releaseTypes = ref<ReleaseType[]>(generateReleaseTypeData())
  const buildModes = ref<BuildMode[]>(generateBuildModeData())
  const priorities = ref<Priority[]>(generatePriorityData())
  const platformKeys = ref<PlatformKey[]>(generatePlatformKeyData())
  const encryptLvs = ref<EncryptLv[]>(generateEncryptLvData())

  // Getters
  const getVerRevs = () => verRevs.value
  const getVerRevCnts = () => verRevCnts.value
  const getBuyers = () => buyers.value
  const getModels = () => models.value
  const getReleaseTypes = () => releaseTypes.value
  const getBuildModes = () => buildModes.value
  const getPriorities = () => priorities.value
  const getPlatformKeys = () => platformKeys.value
  const getEncryptLvs = () => encryptLvs.value

  // Update functions
  const updateVerRev = (id: number, data: Partial<VerRev>) => {
    const index = verRevs.value.findIndex(item => item.id === id)
    if (index !== -1) {
      verRevs.value[index] = { ...verRevs.value[index], ...data }
      return true
    }
    return false
  }

  const updateBuyer = (id: number, data: Partial<Buyer>) => {
    const index = buyers.value.findIndex(item => item.id === id)
    if (index !== -1) {
      buyers.value[index] = { ...buyers.value[index], ...data }
      return true
    }
    return false
  }

  const updateModel = (id: number, data: Partial<Model>) => {
    const index = models.value.findIndex(item => item.id === id)
    if (index !== -1) {
      models.value[index] = { ...models.value[index], ...data }
      return true
    }
    return false
  }

  const updateReleaseType = (id: number, data: Partial<ReleaseType>) => {
    const index = releaseTypes.value.findIndex(item => item.id === id)
    if (index !== -1) {
      releaseTypes.value[index] = { ...releaseTypes.value[index], ...data }
      return true
    }
    return false
  }

  const updateBuildMode = (id: number, data: Partial<BuildMode>) => {
    const index = buildModes.value.findIndex(item => item.id === id)
    if (index !== -1) {
      buildModes.value[index] = { ...buildModes.value[index], ...data }
      return true
    }
    return false
  }

  const updatePriority = (id: number, data: Partial<Priority>) => {
    const index = priorities.value.findIndex(item => item.id === id)
    if (index !== -1) {
      priorities.value[index] = { ...priorities.value[index], ...data }
      return true
    }
    return false
  }

  const updateEncryptLv = (id: number, data: Partial<EncryptLv>) => {
    const index = encryptLvs.value.findIndex(item => item.id === id)
    if (index !== -1) {
      encryptLvs.value[index] = { ...encryptLvs.value[index], ...data }
      return true
    }
    return false
  }

  const updatePlatformKey = (id: number, data: Partial<PlatformKey>) => {
    const index = platformKeys.value.findIndex(item => item.id === id)
    if (index !== -1) {
      platformKeys.value[index] = { ...platformKeys.value[index], ...data }
      return true
    }
    return false
  }

  // Add functions
  const addBuyer = (buyer: Buyer) => {
    buyers.value.push(buyer)
  }

  const addModel = (model: Model) => {
    models.value.push(model)
  }

  const addReleaseType = (releaseType: ReleaseType) => {
    releaseTypes.value.push(releaseType)
  }

  const addBuildMode = (buildMode: BuildMode) => {
    buildModes.value.push(buildMode)
  }

  const addPriority = (priority: Priority) => {
    priorities.value.push(priority)
  }

  const addEncryptLv = (encryptLv: EncryptLv) => {
    encryptLvs.value.push(encryptLv)
  }

  const addPlatformKey = (platformKey: PlatformKey) => {
    platformKeys.value.push(platformKey)
  }

  // Delete functions
  const deleteBuyer = (id: number) => {
    const index = buyers.value.findIndex(item => item.id === id)
    if (index !== -1) {
      buyers.value.splice(index, 1)
      return true
    }
    return false
  }

  const deleteModel = (id: number) => {
    const index = models.value.findIndex(item => item.id === id)
    if (index !== -1) {
      models.value.splice(index, 1)
      return true
    }
    return false
  }

  const deleteReleaseType = (id: number) => {
    const index = releaseTypes.value.findIndex(item => item.id === id)
    if (index !== -1) {
      releaseTypes.value.splice(index, 1)
      return true
    }
    return false
  }

  const deleteBuildMode = (id: number) => {
    const index = buildModes.value.findIndex(item => item.id === id)
    if (index !== -1) {
      buildModes.value.splice(index, 1)
      return true
    }
    return false
  }

  const deletePriority = (id: number) => {
    const index = priorities.value.findIndex(item => item.id === id)
    if (index !== -1) {
      priorities.value.splice(index, 1)
      return true
    }
    return false
  }

  const deleteEncryptLv = (id: number) => {
    const index = encryptLvs.value.findIndex(item => item.id === id)
    if (index !== -1) {
      encryptLvs.value.splice(index, 1)
      return true
    }
    return false
  }

  const deletePlatformKey = (id: number) => {
    const index = platformKeys.value.findIndex(item => item.id === id)
    if (index !== -1) {
      platformKeys.value.splice(index, 1)
      return true
    }
    return false
  }

  // Regenerate data
  const regenerateAllData = () => {
    verRevs.value = generateVerRevData()
    verRevCnts.value = generateVerRevCntData()
    buyers.value = generateBuyerData()
    models.value = generateModelData()
    releaseTypes.value = generateReleaseTypeData()
    buildModes.value = generateBuildModeData()
    priorities.value = generatePriorityData()
    platformKeys.value = generatePlatformKeyData()
    encryptLvs.value = generateEncryptLvData()
  }

  return {
    // State
    verRevs,
    verRevCnts,
    buyers,
    models,
    releaseTypes,
    buildModes,
    priorities,
    platformKeys,
    encryptLvs,
    // Getters
    getVerRevs,
    getVerRevCnts,
    getBuyers,
    getModels,
    getReleaseTypes,
    getBuildModes,
    getPriorities,
    getPlatformKeys,
    getEncryptLvs,
    // Actions
    updateVerRev,
    updateBuyer,
    updateModel,
    updateReleaseType,
    updateBuildMode,
    updatePriority,
    updateEncryptLv,
    updatePlatformKey,
    addBuyer,
    addModel,
    addReleaseType,
    addBuildMode,
    addPriority,
    addEncryptLv,
    addPlatformKey,
    deleteBuyer,
    deleteModel,
    deleteReleaseType,
    deleteBuildMode,
    deletePriority,
    deleteEncryptLv,
    deletePlatformKey,
    regenerateAllData
  }
})
