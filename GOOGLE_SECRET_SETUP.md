# Google OAuth Client Secret 설정

## 현재 오류
```
Unsupported provider: missing OAuth secret
```

## 의미
Google Provider가 활성화되었지만 Client Secret이 입력되지 않았습니다.

## 해결 방법

### 1. Google Cloud Console에서 Client Secret 복사

1. **Google Cloud Console 접속**
   - https://console.cloud.google.com

2. **사용자 인증 정보 페이지로 이동**
   - 왼쪽 메뉴: API 및 서비스 > 사용자 인증 정보

3. **생성한 OAuth 클라이언트 ID 클릭**
   - Client ID: `424317837535-eqqg2gih3hb4612u5ao50rh4h71hf97s.apps.googleusercontent.com`

4. **Client Secret 복사**
   - Client Secret 옆에 "비밀번호 표시" 또는 "Show" 버튼 클릭
   - 전체 Client Secret 복사 (보통 GOCSPX-로 시작하는 긴 문자열)
   - **중요**: 이 비밀번호는 한 번만 표시됩니다!

### 2. Supabase Dashboard에 입력

1. **Supabase Dashboard 접속**
   - https://supabase.com/dashboard

2. **프로젝트 선택**
   - boam79's Project

3. **Authentication > Providers > Google**
   - 왼쪽 메뉴에서 Authentication 클릭
   - Providers 탭 클릭
   - Google 섹션으로 스크롤

4. **Credentials 입력**
   - Client ID (for OAuth): `424317837535-eqqg2gih3hb4612u5ao50rh4h71hf97s.apps.googleusercontent.com`
   - Client Secret (for OAuth): 복사한 Client Secret 붙여넣기

5. **저장**
   - "Save" 버튼 클릭
   - 저장 완료 확인

### 3. 설정 확인

Supabase에서 다음을 확인하세요:

✅ Enable Google Sign-In 토글이 ON인지 확인
✅ Client ID가 정확히 입력되었는지 확인
✅ Client Secret이 비어있지 않은지 확인

### 4. 테스트

1. Supabase 설정을 저장한 후 **몇 초 기다립니다** (설정 적용 시간)
2. 브라우저에서 http://localhost:3000/login 접속
3. "Google로 로그인" 버튼 클릭
4. Google 로그인 페이지로 리디렉션되어야 합니다
5. Google 계정으로 로그인

## 문제 해결

### 여전히 오류가 발생하는 경우:

1. **Client Secret 확인**
   - Google Cloud Console에서 Client Secret을 다시 확인
   - 앞뒤 공백이 없는지 확인

2. **Supabase 설정 재저장**
   - Client Secret을 다시 입력하고 Save 클릭

3. **브라우저 캐시 클리어**
   - Ctrl+Shift+Delete (Windows) 또는 Cmd+Shift+Delete (Mac)

4. **Supabase 프로젝트 재시작**
   - Project Settings > General > Restart project
   - 재시작 후 다시 시도

## 완료 확인

성공하면:
- Google 로그인 페이지로 리디렉션됩니다
- Google 계정 선택 화면이 표시됩니다
- 로그인 후 홈페이지로 돌아옵니다

