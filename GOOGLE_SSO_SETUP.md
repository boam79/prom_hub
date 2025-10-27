# Google SSO 설정 가이드

## 오류 메시지
```
Unsupported provider: provider is not enabled
```

이 오류는 Supabase에서 Google OAuth provider가 활성화되지 않아서 발생합니다.

## 해결 방법

### 1. Supabase Dashboard에서 Google Provider 활성화

1. Supabase 대시보드 접속: https://supabase.com/dashboard
2. 프로젝트 선택 (boam79's Project)
3. 왼쪽 메뉴에서 **Authentication** 클릭
4. **Providers** 메뉴 클릭
5. **Google** 섹션을 찾아서:
   - **Enable Google Sign-In** 토글 활성화
   - **Client ID (for OAuth)** 입력
   - **Client Secret (for OAuth)** 입력

### 2. Google Cloud Console 설정

Google Cloud Console에서 OAuth credentials를 생성해야 합니다:

1. **Google Cloud Console 접속**
   - https://console.cloud.google.com

2. **프로젝트 생성 또는 선택**

3. **OAuth 동의 화면 설정**
   - 왼쪽 메뉴에서 "API 및 서비스" > "OAuth 동의 화면"
   - 사용자 유형 선택 (외부)
   - 앱 정보 입력:
     - 앱 이름: PromHub
     - 사용자 지원 이메일: 본인 이메일
     - 개발자 연락처 정보: 본인 이메일
   - 다음 클릭

4. **스코프 설정**
   - 기본 스코프 유지 (email, profile, openid)
   - 저장 후 계속 클릭

5. **테스트 사용자 추가 (개발 중)**
   - 테스트 사용자에 본인 이메일 추가

6. **승인된 리디렉션 URI 설정**
   - 왼쪽 메뉴에서 "API 및 서비스" > "사용자 인증 정보"
   - "사용자 인증 정보 만들기" > "OAuth 클라이언트 ID"
   - 애플리케이션 유형: "웹 애플리케이션"
   - 승인된 리디렉션 URI 추가:
     ```
     https://uzjduzeacmhiovzgudkj.supabase.co/auth/v1/callback
     ```
   - 만들기 클릭

7. **Client ID와 Client Secret 복사**
   - 생성된 클라이언트 ID와 클라이언트 비밀번호를 복사

### 3. Supabase에 Credentials 입력

1. Supabase Dashboard > Authentication > Providers > Google
2. Enable Google Sign-In 토글 ON
3. **Client ID** 입력
4. **Client Secret** 입력
5. **Save** 클릭

### 4. 테스트

1. http://localhost:3000/login 접속
2. "Google로 로그인" 버튼 클릭
3. Google 계정으로 로그인
4. 정상적으로 로그인이 완료되어야 합니다

## 주의사항

- **승인된 리디렉션 URI는 정확히 일치해야 합니다**
- 프로덕션 배포 시에는 프로덕션 URL도 추가해야 합니다
- Google OAuth 설정은 즉시 적용되지 않을 수 있으므로 몇 분 기다린 후 다시 시도하세요

## 문제 해결

### 여전히 오류가 발생하는 경우:

1. **Supabase 프로젝트 재시작**
   - Project Settings > General > Restart project

2. **브라우저 캐시 클리어**
   - Ctrl+Shift+Delete (Windows) 또는 Cmd+Shift+Delete (Mac)

3. **Supabase 설정 확인**
   - Authentication > Providers에서 Google이 활성화되어 있는지 확인
   - URL Configuration에서 "Site URL"이 설정되어 있는지 확인

4. **Google Cloud Console 확인**
   - OAuth 동의 화면이 게시되었는지 확인
   - 테스트 사용자로 설정되어 있으면 테스트 이메일만 로그인 가능

