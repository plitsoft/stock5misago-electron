const { contextBridge, ipcRenderer } = require('electron');

// Electron API 인터페이스 정의
interface WindowAPI {
  onMouseDown: (mouseX: number, mouseY: number) => void
  onMouseMove: (mouseX: number, mouseY: number) => void
  toggleMaximize: () => void
}

interface ElectronAPI {
  platform: string
  versions: {
    node: string
    chrome: string
    electron: string
  }
  isDev: boolean
  appInfo: {
    name: string
    version: string
  }
  window: WindowAPI
}

// Window 객체에 electronAPI 추가를 위한 전역 타입 확장
declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

// 이 파일을 모듈로 만들기 위한 export
export {};

// 보안을 위해 필요한 API만 선택적으로 노출
contextBridge.exposeInMainWorld('electronAPI', {
  // 플랫폼 정보
  platform: process.platform,
  
  // 앱 버전 정보
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron
  },
  
  // 개발 환경 확인
  isDev: process.env.NODE_ENV === 'development',
  
  // 앱 정보
  appInfo: {
    name: '출고오분전',
    version: '1.0.0'
  },
  
  // 창 조작 API
  window: {
    onMouseDown: (mouseX: number, mouseY: number) => {
      ipcRenderer.send('window-mouse-down', { mouseX, mouseY });
    },
    onMouseMove: (mouseX: number, mouseY: number) => {
      ipcRenderer.send('window-mouse-move', { mouseX, mouseY });
    },
    toggleMaximize: () => {
      ipcRenderer.send('window-toggle-maximize');
    }
  }
} as ElectronAPI)

// 콘솔에 환경 정보 출력 (개발용)
if (process.env.NODE_ENV === 'development') {
  console.log('Electron Preload Script Loaded')
  console.log('Platform:', process.platform)
  console.log('Electron Version:', process.versions.electron)
}