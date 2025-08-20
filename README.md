# 출고오분전 Electron Desktop App

출고오분전 서비스를 위한 크로스플랫폼 데스크톱 애플리케이션입니다.

[![Version](https://img.shields.io/badge/version-1.0.12-blue.svg)](https://github.com/plitsoft/stock5misago-electron/releases)
[![Node.js](https://img.shields.io/badge/node.js-%3E%3D20.0.0-green.svg)](https://nodejs.org/)
[![Electron](https://img.shields.io/badge/electron-37.2.6-brightgreen.svg)](https://www.electronjs.org/)

## 📋 목차

- [프로젝트 개요](#-프로젝트-개요)
- [팀 개발 가이드](#-팀-개발-가이드)
- [개발 환경 설정](#-개발-환경-설정)
- [프로젝트 아키텍처](#-프로젝트-아키텍처)
- [개발 워크플로우](#-개발-워크플로우)
- [배포 및 릴리스](#-배포-및-릴리스)
- [문제 해결](#-문제-해결)

## 📖 프로젝트 개요

### 기본 정보
- **앱 이름**: 출고오분전 (stock5minsago)
- **타입**: Electron 웹뷰 래퍼 애플리케이션
- **타겟 URL**: https://app.stock.5minsago.com
- **지원 플랫폼**: macOS (Intel/ARM64), Windows 64-bit
- **개발사**: Plitsoft

### 주요 기능
- 웹 서비스의 데스크톱 앱 래퍼
- 프레임리스 창 (커스텀 타이틀바)
- 창 드래그 및 최대화/복원 기능
- 외부 링크 보안 처리
- 자동 업데이트 지원 (Squirrel)

## 👥 팀 개발 가이드

### 브랜치 전략
```
main                    # 메인 브랜치 (배포용)
├── feature/기능명      # 새로운 기능 개발
├── fix/버그명          # 버그 수정
├── chore/작업명        # 빌드, 설정 등 기타 작업
└── docs/문서명         # 문서 작업
```

### PR (Pull Request) 생성 과정

#### 1. 브랜치 생성 및 개발
```bash
# 새 브랜치 생성
git checkout -b feature/새로운기능

# 개발 작업 수행
# ...

# 커밋 및 푸시
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin feature/새로운기능
```

#### 2. PR 생성 시 필수 라벨
모든 PR에는 **반드시** 다음 라벨 중 하나를 추가해야 합니다:

| 라벨 | 설명 | 예시 |
|------|------|------|
| `major` | 호환성을 깨는 변경사항 | `1.0.0 → 2.0.0` |
| `minor` | 새로운 기능 추가 | `1.0.0 → 1.1.0` |
| `patch` | 버그 수정 | `1.0.0 → 1.0.1` |
| `skip-release` | 버전 업데이트 불필요 | CI, 문서, 테스트 등 |

#### 3. PR 검증 프로세스
- **자동 빌드**: TypeScript 컴파일 검증
- **라벨 검증**: 버전 라벨이 정확히 하나만 있는지 확인
- **코드 리뷰**: 팀원의 승인 필요

#### 4. 병합 후 자동 처리
- `main` 브랜치 병합 시 자동으로 버전 업데이트
- Git 태그 생성 및 릴리스 워크플로우 실행

### 커밋 메시지 컨벤션
```
타입: 간단한 설명

[상세 설명 - 선택사항]
```

**타입 예시:**
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 스타일 변경
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드
- `chore`: 빌드, 설정 등

## 🚀 개발 환경 설정

### 필수 요구사항
- **Node.js**: 20 이상
- **npm**: Node.js와 함께 설치됨
- **Git**: 버전 관리

### 로컬 개발 환경 구성

#### 1. 저장소 클론
```bash
git clone https://github.com/plitsoft/stock5misago-electron.git
cd stock5misago-electron
```

#### 2. 의존성 설치
```bash
npm install
```

#### 3. 개발 서버 실행
```bash
# TypeScript 컴파일 + Electron 실행 (개발 모드)
npm run dev
```

### 개발 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 모드 실행 (보안 경고 비활성화) |
| `npm run build` | TypeScript 컴파일만 실행 |
| `npm start` | Electron Forge로 앱 실행 |
| `npm run package` | 앱 패키징 (배포 준비) |
| `npm run make` | 설치 프로그램 생성 |
| `npm run publish` | GitHub Releases에 배포 |

### IDE 설정 권장사항

#### VS Code 확장 프로그램
- **TypeScript**: 기본 지원
- **Electron**: 디버깅 지원
- **GitLens**: Git 히스토리 시각화
- **Prettier**: 코드 포맷팅

#### 디버깅 설정
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Electron Main",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "program": "${workspaceFolder}/dist/main.js",
      "env": {
        "ELECTRON_DISABLE_SECURITY_WARNINGS": "true"
      }
    }
  ]
}
```

## 🏗️ 프로젝트 아키텍처

### 파일 구조
```
stock5misago-electron/
├── main.ts                 # Electron 메인 프로세스
├── preload.js              # Preload 스크립트 (보안 중계)
├── forge.config.mjs        # Electron Forge 설정
├── package.json            # 프로젝트 설정 및 의존성
├── tsconfig.json           # TypeScript 설정
├── icons/                  # 앱 아이콘 (PNG, ICNS, ICO)
├── .github/workflows/      # GitHub Actions 워크플로우
│   ├── auto-release.yml    # 자동 버전 업데이트
│   ├── pr-check.yml        # PR 검증
│   └── release.yml         # 크로스플랫폼 빌드 및 배포
├── dist/                   # TypeScript 컴파일 결과
├── out/                    # Electron Forge 빌드 결과
└── node_modules/           # 의존성 모듈
```

### 핵심 파일 역할

#### `main.ts` - Electron 메인 프로세스
- 앱 생명주기 관리
- 브라우저 창 생성 및 설정
- 보안 정책 설정 (Navigation 제한)
- macOS 메뉴바 설정
- IPC 통신 처리 (창 드래그, 최대화)

#### `preload.js` - 보안 중계 스크립트
- 렌더러 프로세스와 메인 프로세스 간 안전한 통신
- `contextBridge`를 통한 API 노출
- 플랫폼 정보 및 창 제어 API 제공

#### `forge.config.mjs` - 빌드 및 배포 설정
- 패키지 설정 (아이콘, Bundle ID)
- macOS 코드 서명 및 공증 설정
- 플랫폼별 설치 프로그램 설정
- GitHub Publisher 설정
- 보안 Fuses 설정

### Electron 보안 모델

#### Context Isolation
```typescript
// main.ts
webPreferences: {
  nodeIntegration: false,        // Node.js API 비활성화
  contextIsolation: true,        // 컨텍스트 격리 활성화
  preload: path.join(__dirname, "../preload.js"),
}
```

#### 안전한 API 노출
```javascript
// preload.js
contextBridge.exposeInMainWorld("electronAPI", {
  platform: process.platform,
  window: {
    onMouseDown: (x, y) => ipcRenderer.send("window-mouse-down", {x, y}),
    toggleMaximize: () => ipcRenderer.send("window-toggle-maximize"),
  },
});
```

#### Navigation 보안
```typescript
// main.ts - 허용된 도메인만 접근 가능
contents.on("will-navigate", (event, url) => {
  const parsedUrl = new URL(url);
  if (parsedUrl.origin !== "https://app.stock.5minsago.com") {
    event.preventDefault();
  }
});
```

## 🔄 개발 워크플로우

### 로컬 개발

#### 1. 개발 서버 실행
```bash
npm run dev
```
- TypeScript 자동 컴파일 (`dist/` 폴더)
- Electron 앱 실행
- 개발자 도구 접근 가능
- 보안 경고 비활성화

#### 2. 실시간 개발
- 코드 변경 시 수동으로 앱 재시작 필요
- 웹 콘텐츠는 새로고침으로 업데이트 가능

#### 3. 빌드 테스트
```bash
# TypeScript 컴파일 확인
npm run build

# 패키징 테스트
npm run package

# 설치 프로그램 생성 테스트
npm run make
```

### 디버깅

#### 메인 프로세스 디버깅
```bash
# Node.js 디버거로 실행
node --inspect dist/main.js
```

#### 렌더러 프로세스 디버깅
- 앱 실행 후 `Cmd/Ctrl + Shift + I`로 개발자 도구 열기
- 또는 메뉴 → 보기 → 개발자 도구

#### 로그 확인
```bash
# macOS
~/Library/Logs/stock5minsago/

# Windows
%USERPROFILE%/AppData/Roaming/stock5minsago/logs/
```

## 📦 배포 및 릴리스

### 자동화된 배포 프로세스

프로젝트는 **3단계 GitHub Actions 워크플로우**를 사용합니다:

#### 1단계: PR 검증 (`pr-check.yml`)
- **트리거**: PR 생성/업데이트/라벨 변경
- **동작**:
  - TypeScript 빌드 검증
  - 버전 라벨 검증 (major/minor/patch/skip-release)
  - 중복 라벨 방지

#### 2단계: 자동 버전 업데이트 (`auto-release.yml`)
- **트리거**: `main` 브랜치에 push (PR 병합)
- **동작**:
  - 병합된 PR의 라벨 추출
  - `npm version` 으로 자동 버전 업데이트
  - Git 태그 생성 및 push
  - 릴리스 워크플로우 자동 실행

#### 3단계: 크로스플랫폼 빌드 (`release.yml`)
- **트리거**: 태그 push, 수동 실행, Auto Release 완료
- **매트릭스**: macOS + Windows 동시 빌드
- **동작**:
  - 앱 빌드 및 패키징
  - macOS 코드 서명 & 공증
  - GitHub Releases에 Draft 릴리스 생성

### 배포 결과물

#### macOS
- `stock5minsago-darwin-arm64-{version}.zip`
- `stock5minsago-{version}-arm64.dmg`
- Apple 공증 완료된 서명된 앱

#### Windows
- `Stock5MinAgo Setup {version}.exe`
- Squirrel 기반 설치 프로그램
- 자동 업데이트 지원

### 수동 배포 (필요시)

#### 로컬에서 직접 배포
```bash
# GitHub Personal Access Token 설정 후
export GITHUB_TOKEN=your_token
npm run publish
```

#### GitHub Actions에서 수동 실행
1. GitHub 저장소 → Actions 탭
2. "Release" 워크플로우 선택
3. "Run workflow" 클릭

### Apple 코드 서명 (macOS 빌드)

팀원이 Apple 개발자 계정을 관리하는 경우, 다음 GitHub Secrets가 필요합니다:

- `APPLE_CERT_P12_BASE64`: 개발자 인증서 (base64)
- `APPLE_CERT_PASSWORD`: 인증서 비밀번호
- `DEVELOPER_ID_APPLICATION`: 인증서 이름
- `APPLE_ID`: Apple ID 이메일
- `APPLE_APP_SPECIFIC_PASSWORD`: 앱별 비밀번호
- `APPLE_TEAM_ID`: 팀 ID

자세한 설정 방법은 `APPLE_SIGNING.md` 파일을 참고하세요.

## 🚨 문제 해결

### 자주 발생하는 문제들

#### 1. 빌드 오류

**TypeScript 컴파일 오류**
```bash
# TypeScript 재컴파일
npm run build

# 캐시 클리어 후 재빌드
rm -rf dist/
npm run build
```

**의존성 문제**
```bash
# node_modules 재설치
rm -rf node_modules package-lock.json
npm install
```

**Electron 실행 오류**
```bash
# Electron 재설치
npm install electron --save-dev
```

#### 2. GitHub Actions 실패

**PR 검증 실패**
- 버전 라벨이 누락되거나 중복된 경우
- 해결: PR에 `major`, `minor`, `patch`, `skip-release` 중 하나만 추가

**Auto Release 실패**
- GitHub API 호출 실패
- 해결: PR 병합 후 잠시 기다린 후 다시 확인

**Release 빌드 실패**
- macOS: Apple 인증서 문제
- Windows: 빌드 환경 문제
- 해결: GitHub Actions 로그 확인 후 개발팀에 문의

#### 3. 앱 실행 문제

**보안 경고**
```bash
# 개발 모드에서는 정상 (의도된 동작)
ELECTRON_DISABLE_SECURITY_WARNINGS=true electron dist/main.js
```

**창이 표시되지 않음**
- `main.ts`에서 `show: false` 설정 후 `ready-to-show` 이벤트로 표시
- 정상 동작입니다

**웹 페이지 로드 실패**
- 인터넷 연결 확인
- https://app.stock.5minsago.com 접속 가능 여부 확인

### 개발 환경별 주의사항

#### macOS
- Apple Silicon (M1/M2)에서 개발 시 `node_modules` 아키텍처 주의
- Rosetta 모드가 아닌 네이티브 실행 권장

#### Windows
- Windows Defender 실시간 보호로 인한 빌드 속도 저하 가능
- PowerShell 실행 정책 확인 (`Set-ExecutionPolicy RemoteSigned`)

#### 일반적인 개발 팁
- `npm run dev` 실행 시 앱이 자동으로 재시작되지 않으므로 수동 재시작 필요
- 웹 콘텐츠 변경사항은 앱 내에서 새로고침 (`Cmd/Ctrl + R`) 가능
- 개발자 도구는 `Cmd/Ctrl + Shift + I`로 열기

### 도움 요청

기술적 문제나 질문이 있을 경우:
1. 이 README를 먼저 확인
2. GitHub Issues 검색
3. 팀 내 개발 채널에 문의
4. 필요시 새로운 GitHub Issue 생성

---

## 📋 지원 플랫폼

- **macOS**: Intel & Apple Silicon (ARM64)
- **Windows**: 64-bit
- **Linux**: .deb, .rpm 패키지 (설정됨, 사용하지 않음)

## 🔧 주요 기술 스택

- **Runtime**: Node.js 20+
- **Framework**: Electron 37.2.6
- **Language**: TypeScript
- **Build Tool**: Electron Forge 7.8.2
- **CI/CD**: GitHub Actions
- **Code Signing**: Apple Developer Program (macOS)
- **Auto Update**: Squirrel (Windows), Built-in (macOS)

## 📄 라이센스

이 프로젝트는 Plitsoft의 소유입니다.

---

**📧 문의**: 개발 관련 문의사항은 팀 내 개발 채널을 이용해 주세요.  
**🐛 버그 리포트**: [GitHub Issues](https://github.com/plitsoft/stock5misago-electron/issues)  
**📋 버전**: v1.0.12