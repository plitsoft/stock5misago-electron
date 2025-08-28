const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  platform: process.platform,

  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },

  appInfo: {
    name: "출고오분전",
    version: "1.0.0",
  },

  window: {
    // macOS에서만 커스텀 드래그 API 제공 (Windows는 CSS 드래그 사용)
    ...(process.platform === "darwin" && {
      onMouseDown: (mouseX, mouseY) => {
        ipcRenderer.send("window-mouse-down", { mouseX, mouseY });
      },
      onMouseMove: (mouseX, mouseY) => {
        ipcRenderer.send("window-mouse-move", { mouseX, mouseY });
      },
    }),
    toggleMaximize: () => {
      ipcRenderer.send("window-toggle-maximize");
    },
  },
});

if (process.env.NODE_ENV === "development") {
  console.log("Electron Preload Script Loaded");
  console.log("Platform:", process.platform);
  console.log("Electron Version:", process.versions.electron);
}
