# Apple 코드 서명 설정 가이드

## 필요한 GitHub Secrets

GitHub 저장소의 Settings > Secrets and variables > Actions에서 다음 시크릿들을 설정해야 합니다:

### 1. APPLE_CERT_P12_BASE64
- **설명**: Developer ID Application 인증서 (.p12 파일)을 base64로 인코딩한 값
- **생성 방법**:
  ```bash
  base64 -i /path/to/your/certificate.p12 | pbcopy
  ```

### 2. APPLE_CERT_PASSWORD
- **설명**: .p12 인증서 파일의 비밀번호
- **값**: 인증서 생성 시 설정한 비밀번호

### 3. DEVELOPER_ID_APPLICATION
- **설명**: 코드 서명에 사용할 인증서의 이름
- **형식**: "Developer ID Application: Your Name (TEAM_ID)"
- **확인 방법**:
  ```bash
  security find-identity -v -p codesigning
  ```

### 4. APPLE_ID
- **설명**: Apple 개발자 계정 이메일
- **값**: yourname@example.com

### 5. APPLE_APP_SPECIFIC_PASSWORD
- **설명**: 공증을 위한 앱별 비밀번호
- **생성 방법**: 
  1. appleid.apple.com에 로그인
  2. Sign-In and Security > App-Specific Passwords
  3. "Generate Password" 클릭

### 6. APPLE_TEAM_ID
- **설명**: Apple 개발자 팀 ID
- **확인 방법**: Apple Developer 계정에서 Membership 탭 확인

## 인증서 준비

1. **Keychain Access에서 인증서 내보내기**:
   - Developer ID Application 인증서 선택
   - 우클릭 > "Export"
   - .p12 형식으로 저장
   - 비밀번호 설정

2. **base64 인코딩**:
   ```bash
   base64 -i certificate.p12 | pbcopy
   ```

3. **GitHub Secrets에 추가**:
   - 복사한 base64 값을 APPLE_CERT_P12_BASE64로 저장
   - 설정한 비밀번호를 APPLE_CERT_PASSWORD로 저장

## 주의사항

- 인증서와 비밀번호는 절대 코드에 하드코딩하지 마세요
- .p12 파일은 저장소에 커밋하지 마세요
- GitHub Actions 실행 시에만 임시 키체인이 생성되고 자동으로 정리됩니다