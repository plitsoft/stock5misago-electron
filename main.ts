const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
const path = require('path');

let mainWindow: any = null;

function createWindow(): void {
  // 메인 윈도우 생성
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 900,
    minWidth: 1280,
    minHeight: 700,
    titleBarStyle: 'hidden', // 타이틀바 숨기기
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js') // 컴파일된 preload 파일
    },
    icon: path.join(__dirname, 'icon.png'), // 아이콘 (선택사항)
    show: false // 준비될 때까지 숨김
  });

  // 윈도우가 준비되면 표시
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.loadURL('http://localhost:3000');

  // 외부 링크는 기본 브라우저에서 열기
  mainWindow.webContents.setWindowOpenHandler(({ url }: { url: string }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // macOS에서 메뉴바 설정
  if (process.platform === 'darwin') {
    const template: any[] = [
      {
        label: app.getName(),
        submenu: [
          { role: 'about', label: '출고오분전 정보' },
          { type: 'separator' },
          { role: 'services', label: '서비스' },
          { type: 'separator' },
          { role: 'hide', label: '출고오분전 숨기기' },
          { role: 'hideOthers', label: '다른 앱 숨기기' },
          { role: 'unhide', label: '모두 보기' },
          { type: 'separator' },
          { role: 'quit', label: '출고오분전 종료' }
        ]
      },
      {
        label: '편집',
        submenu: [
          { role: 'undo', label: '실행 취소' },
          { role: 'redo', label: '다시 실행' },
          { type: 'separator' },
          { role: 'cut', label: '잘라내기' },
          { role: 'copy', label: '복사' },
          { role: 'paste', label: '붙여넣기' }
        ]
      },
      {
        label: '보기',
        submenu: [
          { role: 'reload', label: '새로고침' },
          { role: 'forceReload', label: '강제 새로고침' },
          { role: 'toggleDevTools', label: '개발자 도구' },
          { type: 'separator' },
          { role: 'resetZoom', label: '실제 크기' },
          { role: 'zoomIn', label: '확대' },
          { role: 'zoomOut', label: '축소' },
          { type: 'separator' },
          { role: 'togglefullscreen', label: '전체 화면' }
        ]
      },
      {
        label: '윈도우',
        submenu: [
          { role: 'minimize', label: '최소화' },
          { role: 'close', label: '닫기' }
        ]
      }
    ];
    
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    // Windows/Linux에서는 기본 메뉴 제거 (선택사항)
    // Menu.setApplicationMenu(null);
  }
}

// 앱이 준비되면 윈도우 생성
app.whenReady().then(() => {
  createWindow();

  // macOS에서 dock 아이콘 클릭 시 윈도우 생성
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 모든 윈도우가 닫히면 앱 종료 (macOS 제외)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 보안 설정: 권한이 없는 내비게이션 차단
app.on('web-contents-created', (_event: any, contents: any) => {
  contents.on('will-navigate', (navigationEvent: any, navigationUrl: string) => {
    const parsedUrl: URL = new URL(navigationUrl);
    
    // localhost가 아닌 외부 사이트로의 내비게이션 차단
    if (parsedUrl.origin !== 'http://localhost:3000') {
      navigationEvent.preventDefault();
    }
  });
});

// IPC 핸들러: 창 드래그를 위한 마우스 이벤트 처리
interface MousePosition {
  mouseX: number;
  mouseY: number;
}

let mouseDiffX: number = 0;
let mouseDiffY: number = 0;

ipcMain.on('window-mouse-down', (_event: any, { mouseX, mouseY }: MousePosition) => {
  if (!mainWindow) return;
  
  const [windowX, windowY] = mainWindow.getPosition();
  mouseDiffX = mouseX - windowX;
  mouseDiffY = mouseY - windowY;
});

ipcMain.on('window-mouse-move', (_event: any, { mouseX, mouseY }: MousePosition) => {
  if (!mainWindow) return;
  
  const newX = mouseX - mouseDiffX;
  const newY = mouseY - mouseDiffY;
  mainWindow.setPosition(newX, newY);
});

// 더블클릭 시 창 최대화/복원 토글
ipcMain.on('window-toggle-maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});