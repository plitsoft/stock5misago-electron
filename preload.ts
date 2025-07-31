const { contextBridge, ipcRenderer } = require('electron');

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

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

export {};

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron
  },
  
  appInfo: {
    name: '출고오분전',
    version: '1.0.0'
  },
  
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

if (process.env.NODE_ENV === 'development') {
  console.log('Electron Preload Script Loaded')
  console.log('Platform:', process.platform)
  console.log('Electron Version:', process.versions.electron)
}