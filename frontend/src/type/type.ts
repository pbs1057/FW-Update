export interface Firmware {
  key: number;
  id: string;
  version: string;
  revision: string;
  size: string;
  systemId: string;
  md5: string;
  model: string;
  buyer: string;
  type: string;
  mode: string;
  regDate: string;
  download: number;
  priority: string;
  platformKey: string;
  encryptLevel: string;
  needFacRst: boolean;
  use: boolean;
  test: boolean;
  onlyApp: boolean;
  pinUse: boolean;
  pinCode: string | null;
  pinMax: number;
  pinCount: number;
}

export interface VerRev {
  id: number;
  version: string;
  revision: string;
  note: string;
}

export interface VerRevCnt {
  id: number;
  version: string;
  revision: string;
  count: number;
  model: string;
}

export interface Buyer {
  id: number;
  name: string;
}

export interface Model {
  id: number;
  systemId: string;
  name: string;
  buyer: number;
}

export interface ReleaseType {
  id: number;
  name: string;
  fileString: string;
}

export interface BuildMode {
  id: number;
  name: string;
  fileString: string;
}

export interface Priority {
  id: number;
  name: string;
}

export interface PlatformKey {
  id: number;
  keyDate: string;
}

export interface EncryptLv {
  id: number;
  value: string;
  name: string;
  descr: string;
}