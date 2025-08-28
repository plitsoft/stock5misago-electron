import { app, BrowserWindow, Menu, shell, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
// @ts-ignore
import squirrelStartup from "electron-squirrel-startup";

if (squirrelStartup) {
  app.quit();
}

let mainWindow: any = null;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 900,
    minWidth: 1280,
    minHeight: 700,
    ...(process.platform === 'darwin' 
      ? {
          // macOS: 기존 설정 유지
          titleBarStyle: "hidden",
        }
      : {
          // Windows/Linux: CSS 드래그 기반 (IPC 드래그 제거)
          frame: false,
          titleBarStyle: "hidden",
          titleBarOverlay: true
        }
    ),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "../preload.js"),
    },
    icon: path.join(__dirname, "../icons/icon.png"),
    show: false,
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.loadURL("http://192.168.0.150:3000");

  mainWindow.webContents.setWindowOpenHandler(({ url }: { url: string }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  if (process.platform === "darwin") {
    const template: any[] = [
      {
        label: app.getName(),
        submenu: [
          { role: "about", label: "출고오분전 정보" },
          { type: "separator" },
          { role: "services", label: "서비스" },
          { type: "separator" },
          { role: "hide", label: "출고오분전 숨기기" },
          { role: "hideOthers", label: "다른 앱 숨기기" },
          { role: "unhide", label: "모두 보기" },
          { type: "separator" },
          { role: "quit", label: "출고오분전 종료" },
        ],
      },
      {
        label: "편집",
        submenu: [
          { role: "undo", label: "실행 취소" },
          { role: "redo", label: "다시 실행" },
          { type: "separator" },
          { role: "cut", label: "잘라내기" },
          { role: "copy", label: "복사" },
          { role: "paste", label: "붙여넣기" },
        ],
      },
      {
        label: "보기",
        submenu: [
          { role: "reload", label: "새로고침" },
          { role: "forceReload", label: "강제 새로고침" },
          { role: "toggleDevTools", label: "개발자 도구" },
          { type: "separator" },
          { role: "resetZoom", label: "실제 크기" },
          { role: "zoomIn", label: "확대" },
          { role: "zoomOut", label: "축소" },
          { type: "separator" },
          { role: "togglefullscreen", label: "전체 화면" },
        ],
      },
      {
        label: "윈도우",
        submenu: [
          { role: "minimize", label: "최소화" },
          { role: "close", label: "닫기" },
        ],
      },
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("web-contents-created", (_event: any, contents: any) => {
  contents.on(
    "will-navigate",
    (navigationEvent: any, navigationUrl: string) => {
      const parsedUrl: URL = new URL(navigationUrl);
      if (parsedUrl.origin !== "https://app.stock.5minsago.com") {
        navigationEvent.preventDefault();
      }
    }
  );
});

interface MousePosition {
  mouseX: number;
  mouseY: number;
}

let mouseDiffX: number = 0;
let mouseDiffY: number = 0;

// macOS에서만 커스텀 드래그 핸들러 등록 (Windows는 CSS 드래그 사용)
if (process.platform === "darwin") {
  ipcMain.on(
    "window-mouse-down",
    (_event: any, { mouseX, mouseY }: MousePosition) => {
      if (!mainWindow) return;
      const [windowX, windowY] = mainWindow.getPosition();
      mouseDiffX = mouseX - windowX;
      mouseDiffY = mouseY - mouseY;
    }
  );

  ipcMain.on(
    "window-mouse-move",
    (_event: any, { mouseX, mouseY }: MousePosition) => {
      if (!mainWindow) return;

      const newX = mouseX - mouseDiffX;
      const newY = mouseY - mouseDiffY;
      mainWindow.setPosition(newX, newY);
    }
  );
}

ipcMain.on("window-toggle-maximize", () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});
