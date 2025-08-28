# Stock5minsago Desktop App

출고오분전 재고 관리 시스템의 데스크톱 앱 포팅 버전입니다.

## 📋 프로젝트 개요

- **앱 이름**: stock5minsago (출고오분전)
- **현재 버전**: 1.0.18
- **개발사**: Plitsoft
- **기술 스택**: Electron, TypeScript, Node.js
- **지원 플랫폼**: macOS, Windows, Linux

### 주요 기능
- 웹 기반 재고 관리 시스템의 데스크톱 환경 제공
- 크로스 플랫폼 지원 (macOS, Windows, Linux)
- 플랫폼별 최적화된 UI/UX
- 자동 업데이트 지원
- 보안 강화된 웹뷰 환경

## 🚀 개발 환경 설정

### 필수 요구사항
- macOS 빌드 시: Xcode Command Line Tools 설치 필요

### 설치 방법

1. 저장소 클론
```bash
git clone https://github.com/plitsoft/stock5misago-electron.git
cd stock5misago-electron
```

2. 의존성 설치
```bash
npm install
```

## 🔨 빌드 및 실행

### 개발 모드 실행
```bash
npm run dev
```

### 프로덕션 빌드
```bash
npm run build
```

### 패키징
```bash
# 현재 플랫폼용 패키지 생성
npm run package

# 배포용 인스톨러 생성
npm run make
```

### 사용 가능한 스크립트
- `npm run dev`: 개발 모드로 앱 실행 (보안 경고 비활성화)
- `npm run build`: TypeScript 컴파일
- `npm run start`: Electron Forge를 통한 앱 시작
- `npm run package`: 현재 플랫폼용 실행 파일 생성
- `npm run make`: 플랫폼별 배포 패키지 생성
- `npm run publish`: GitHub에 자동 배포

## 📦 배포 및 릴리즈

### 자동 배포 설정
이 프로젝트는 GitHub Actions를 통한 자동 배포가 설정되어 있습니다:

- **GitHub Publisher**: `@electron-forge/publisher-github` 사용
- **배포 대상**: `plitsoft/stock5misago-electron` 저장소
- **릴리즈 타입**: Prerelease

### 플랫폼별 패키징

#### macOS
- **패키지 형식**: DMG, ZIP
- **번들 ID**: `com.plitsoft.stock5minsago`
- **코드 서명**: 환경변수를 통한 자동 서명
- **공증**: Apple notarytool 사용

필요한 환경변수:
```bash
DEVELOPER_ID_APPLICATION=your_developer_id
APPLE_ID=your_apple_id
APPLE_PASSWORD=your_app_specific_password
APPLE_TEAM_ID=your_team_id
```

#### Windows
- **패키지 형식**: Squirrel installer
- **앱 이름**: StockApp5MinAgo

#### Linux
- **패키지 형식**: DEB, RPM

### 릴리즈 프로세스
1. 버전 업데이트 (`package.json`의 `version` 필드)
2. 변경사항 커밋
3. `npm run publish` 실행
4. GitHub에서 자동으로 릴리즈 생성

## 📁 프로젝트 구조

```
stock5misago-electron/
├── icons/                 # 앱 아이콘 파일들
│   ├── icon.icns         # macOS 아이콘
│   ├── icon.ico          # Windows 아이콘
│   └── icon.png          # Linux 아이콘
├── main.ts               # 메인 프로세스 (Electron 앱의 진입점)
├── preload.js            # 프리로드 스크립트
├── package.json          # 프로젝트 설정 및 의존성
├── tsconfig.json         # TypeScript 설정
├── forge.config.mjs      # Electron Forge 설정
```

### 주요 파일 설명

#### `main.ts`
- Electron 앱의 메인 프로세스
- 브라우저 윈도우 생성 및 관리
- 웹 콘텐츠 로드 (`https://app.stock.5minsago.com`)
- 플랫폼별 설정 처리
- 보안 정책 적용

#### `preload.js`
- 렌더러 프로세스와 메인 프로세스 간 안전한 통신
- contextBridge를 통한 API 노출
- 플랫폼 정보 및 윈도우 제어 API 제공

#### `forge.config.mjs`
- Electron Forge 빌드 및 배포 설정
- 플랫폼별 maker 구성
- 보안 Fuse 설정
- 코드 서명 및 공증 설정

## 🔧 플랫폼별 특이사항

### macOS
- **타이틀바**: `titleBarStyle: "hidden"` 사용
- **윈도우 드래그**: IPC 통신을 통한 커스텀 드래그 구현
- **메뉴**: 한국어 네이티브 메뉴 제공
- **코드 서명**: 필수 (배포 시)

### Windows & Linux
- **타이틀바**: `frame: false`로 프레임리스 윈도우
- **윈도우 드래그**: CSS 기반 드래그 (`-webkit-app-region: drag`)
- **메뉴**: 기본 시스템 메뉴 사용

### 주요 차이점
```typescript
// 플랫폼별 윈도우 설정
...(process.platform === 'darwin' 
  ? {
      // macOS: 기존 설정 유지
      titleBarStyle: "hidden",
    }
  : {
      // Windows/Linux: CSS 드래그 기반
      frame: false,
      titleBarStyle: "hidden",
      titleBarOverlay: true
    }
)
```

### Pull Request 프로세스

1. **브랜치 생성**
```bash
git checkout -b feature/your-feature-name
# 또는
git checkout -b fix/issue-description
```

2. **개발 및 커밋**
```bash
git add .
git commit -m "feat: 기능 설명"
# 또는
git commit -m "fix: 수정 내용 설명"
```

3. **Push 및 PR 생성**
```bash
git push origin feature/your-feature-name
```
GitHub에서 Pull Request 생성

4. **⚠️ 필수: 버전 라벨 추가**
PR 생성 후 **반드시 다음 라벨 중 하나**를 추가해야 합니다:

- `major`: 주요 변경사항 (1.0.0 → 2.0.0)
  - 기존 API의 호환성을 깨는 변경
  - 사용자 경험에 큰 영향을 주는 변경
- `minor`: 새로운 기능 (1.0.0 → 1.1.0)
  - 새로운 기능 추가
  - 하위 호환성을 유지하는 개선사항
- `patch`: 버그 수정 (1.0.0 → 1.0.1)
  - 버그 수정
  - 보안 패치
  - 작은 개선사항
- `skip-release`: 릴리즈 생략
  - CI/CD 설정 변경
  - 문서 업데이트
  - 테스트 코드 추가

**⚠️ 주의사항:**
- 라벨이 없으면 PR 체크가 실패합니다
- 여러 버전 라벨을 동시에 사용할 수 없습니다
- 라벨은 PR 생성 후에도 추가/변경 가능합니다

5. **PR 요구사항**
- 명확한 제목과 설명
- 변경사항에 대한 상세 설명
- **적절한 버전 라벨** (위에서 선택)
- 관련 이슈 번호 (있는 경우)
- 테스트 결과 확인

### CI/CD 자동화 파이프라인

이 프로젝트는 3단계 자동화 파이프라인을 통해 버전 관리와 배포를 자동화합니다:

#### 1단계: PR Check
- **트리거**: PR 생성/업데이트 시
- **작업**: 
  - TypeScript 빌드 테스트
  - 버전 라벨 유효성 검증
  - 라벨 중복/누락 체크
- **결과**: 통과해야만 merge 가능

#### 2단계: Auto Release
- **트리거**: main 브랜치에 PR merge 시
- **작업**:
  - 병합된 PR에서 라벨 추출
  - 라벨에 따른 자동 버전 업
  - `package.json` 및 `package-lock.json` 업데이트
  - Git 태그 생성 (예: `v1.0.18`)
  - main 브랜치에 버전 업 커밋 푸시
- **결과**: 새 버전 태그로 Release 워크플로우 트리거

#### 3단계: Release & Distribution
- **트리거**: 새 태그 푸시 시
- **작업**:
  - 멀티 플랫폼 빌드 (macOS, Windows)
  - macOS 앱 서명 및 공증
  - 배포 패키지 생성 (DMG, Squirrel installer)
  - GitHub Release 자동 생성
  - 아티팩트 업로드
- **결과**: 사용자 다운로드 가능한 배포 파일 제공

### 자동 버전 관리 예시

```bash
# 1. 기능 브랜치에서 작업
git checkout -b feature/new-dashboard
git commit -m "feat: add new dashboard component"
git push origin feature/new-dashboard

# 2. GitHub에서 PR 생성 → 'minor' 라벨 추가

# 3. PR merge 시 자동 실행:
#    - 현재 버전: 1.0.17
#    - minor 라벨 → 새 버전: 1.0.18
#    - 자동 커밋: "chore: bump version to 1.0.18"
#    - 자동 태그: "v1.0.18"

# 4. 태그 푸시 시 자동 릴리즈:
#    - macOS/Windows 빌드
#    - GitHub Release 생성
#    - 배포 파일 업로드 완료
```

## 📞 지원 및 문의

- **개발사**: Plitsoft
- **저장소**: [https://github.com/plitsoft/stock5misago-electron](https://github.com/plitsoft/stock5misago-electron)
- **이슈 리포트**: GitHub Issues 사용

---