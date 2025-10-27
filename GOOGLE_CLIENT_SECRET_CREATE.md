# Google OAuth Client Secret 생성 방법

## 현재 상황

OAuth 클라이언트 편집 페이지에서 Client Secret이 표시되지 않습니다.

## Client Secret 생성 방법

### 방법 1: 새 비밀번호 만들기 (권장)

1. **현재 페이지에서**
   - "저장" 버튼을 먼저 클릭하여 변경사항 저장

2. **사용자 인증 정보 목록으로 돌아가기**
   - 브라우저의 뒤로가기 버튼 클릭
   - 또는 주소창에서 마지막 부분을 제거:
     ```
     https://console.cloud.google.com/apis/credentials (목록 페이지)
     ```

3. **OAuth 클라이언트 목록에서**
   - "supabase_log" 클라이언트 찾기
   - 오른쪽 끝에 **3개 점 메뉴 (⋯)** 클릭
   - **"비밀번호 만들기"** 또는 **"Create Secret"** 선택

4. **새 비밀번호 생성**
   - 팝업이 나타나고 새 비밀번호가 자동 생성됩니다
   - 비밀번호를 복사하세요 (GOCSPX-로 시작하는 긴 문자열)
   - ⚠️ 이 비밀번호는 한 번만 표시됩니다!

### 방법 2: API 및 서비스에서 직접 생성

1. **왼쪽 메뉴에서**
   - "사용자 인증 정보" 또는 "Credentials" 클릭 (이미 클라이언트 섹션에 있다면 상단 브레드크럼에서 "클라이언트" 클릭)

2. **OAuth 2.0 클라이언트 ID 목록**
   - "웹 애플리케이션" 섹션에서 "supabase_log" 찾기
   - 오른쪽 끝의 점 3개 메뉴 (⋯) 클릭

3. **비밀번호 만들기**
   - "비밀번호 만들기" 선택
   - 새 Client Secret 생성 및 복사

## 전체 경로

```
Google Cloud Console
  → APIs & Services (API 및 서비스)
    → Credentials (사용자 인증 정보)
      → OAuth 2.0 클라이언트 ID 목록
        → supabase_log 옆 점 3개 메뉴 (⋯)
          → 비밀번호 만들기 (Create Secret)
            → 새 비밀번호 복사
```

## 참고

### Client Secret이 표시되지 않는 이유
- 보안상 이유로 Client Secret은 한 번만 표시됩니다
- 새로 생성한 비밀번호를 놓치면 다시 생성해야 합니다
- 기존 비밀번호를 재사용할 수 없습니다

### 팁
- Client Secret을 생성하면 즉시 복사하세요
- 메모장이나 텍스트 에디터에 임시로 붙여넣기
- Supabase에 입력한 후 보안이 걱정되면 삭제

## 다음 단계

Client Secret을 복사한 후:

1. **Supabase Dashboard 접속**
   ```
   https://supabase.com/dashboard
   ```

2. **Authentication > Providers > Google**
   - Client ID 입력
   - Client Secret 입력
   - Save

3. **테스트**
   - http://localhost:3000/login
   - "Google로 로그인" 버튼 클릭

