# 출고오분전 Electron Desktop App

출고오분전 서비스를 위한 크로스플랫폼 데스크톱 애플리케이션입니다.

## 🚀 개발 환경 설정

### 필수요구사항
- Node.js 20 이상
- npm 또는 pnpm

### 설치 및 실행
```bash
# 종속성 설치
npm install

# 개발 모드로 실행
npm run dev

# TypeScript 빌드
npm run build

# Electron Forge로 패키징
npm run package

# 배포용 실행파일 생성
npm run make
```

## 📦 배포 가이드

### GitHub Actions를 통한 자동 배포

이 프로젝트는 GitHub Actions를 사용하여 macOS와 Windows용 실행파일을 자동으로 빌드하고 GitHub Releases에 배포합니다.

#### 설정

**별도 토큰 설정 불필요!** GitHub Actions가 자동으로 제공하는 `GITHUB_TOKEN`을 사용하므로 추가 설정이 필요하지 않습니다.

#### 배포 방법

**자동 배포 (태그 기반):**
```bash
# 버전 업데이트 및 태그 생성
npm version patch  # 패치 버전 (1.0.0 → 1.0.1)
npm version minor  # 마이너 버전 (1.0.0 → 1.1.0)
npm version major  # 메이저 버전 (1.0.0 → 2.0.0)

# GitHub에 push (태그 포함)
git push origin main --follow-tags
```

**수동 배포:**
1. GitHub 저장소 → Actions 탭
2. "Release" 워크플로우 선택
3. "Run workflow" 버튼 클릭

#### 4. 배포 결과

- 빌드 완료 후 GitHub Releases에 Draft 릴리스가 생성됩니다
- 다음 파일들이 자동으로 업로드됩니다:
  - **macOS**: `.zip`, `.dmg` 파일
  - **Windows**: `.exe` 설치 프로그램

### 수동 배포

로컬에서 배포하려면 GitHub Personal Access Token이 필요합니다:

```bash
# Personal Access Token 생성 후 환경변수 설정
export GITHUB_TOKEN=your_personal_access_token
npm run publish
```

**참고:** GitHub Actions를 사용하면 토큰 설정 없이 자동 배포가 가능합니다.

## 🛠️ 프로젝트 구조

```
├── main.ts           # Electron 메인 프로세스
├── preload.js        # Preload 스크립트 (CommonJS)
├── forge.config.js   # Electron Forge 설정
├── icons/            # 앱 아이콘
│   ├── icon.icns    # macOS 아이콘
│   └── icon.ico     # Windows 아이콘
└── .github/
    └── workflows/
        └── release.yml  # GitHub Actions 워크플로우
```

## 📋 지원 플랫폼

- **macOS**: Intel & Apple Silicon (ARM64)
- **Windows**: 64-bit
- **Linux**: .deb, .rpm 패키지 (옵션)

## 🔧 설정

### forge.config.js 주요 설정

- **GitHub Publisher**: 자동으로 GitHub Releases에 업로드
- **Makers**: 플랫폼별 설치 프로그램 생성
  - Windows: Squirrel 설치 프로그램
  - macOS: ZIP, DMG 파일
  - Linux: DEB, RPM 패키지

### 보안 설정

- Context Isolation 활성화
- Node Integration 비활성화
- Preload 스크립트를 통한 안전한 API 노출

## 🐛 문제 해결

### 빌드 오류
```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install

# TypeScript 재빌드
npm run build
```

### GitHub Actions 빌드 실패
1. Personal Access Token 권한 확인
2. Repository Secrets 설정 확인
3. forge.config.js의 repository 정보 확인

## 📄 라이센스

이 프로젝트는 Plitsoft의 소유입니다.