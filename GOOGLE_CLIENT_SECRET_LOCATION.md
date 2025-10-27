# Google OAuth Client Secret 찾는 방법

## Client Secret 경로

### 1. Google Cloud Console 접속
```
https://console.cloud.google.com
```

### 2. 프로젝트 선택
- 상단의 프로젝트 선택 드롭다운에서 프로젝트 선택
- 또는 프로젝트 이름 클릭

### 3. 사용자 인증 정보 페이지로 이동

**방법 1: 메뉴를 통한 이동**
1. 왼쪽 상단 햄버거 메뉴 (☰) 클릭
2. "API 및 서비스" 클릭
3. "사용자 인증 정보" 클릭

**방법 2: 직접 URL로 이동**
```
https://console.cloud.google.com/apis/credentials
```

### 4. OAuth 클라이언트 ID 찾기
- 페이지에서 OAuth 2.0 클라이언트 ID 섹션 찾기
- 생성한 클라이언트를 클릭:
  - 이름: "supabase_log"
  - Client ID: `424317837535-eqqg2gih3hb4612u5ao50rh4h71hf97s.apps.googleusercontent.com`

### 5. Client Secret 복사
1. **"사용자 인증 정보 편집" 페이지**로 이동됩니다
2. "OAuth 클라이언트 ID" 섹션에서:
   - **Client ID**: `424317837535-eqqg2gih3hb4612u5ao50rh4h71hf97s.apps.googleusercontent.com`
   - **Client Secret**: 표시되지 않음 (보안상 이유로)
3. **"새 비밀번호 만들기"** 또는 **"비밀번호 재설정"** 버튼 클릭
4. **새 Client Secret 생성 확인**
   - 팝업에서 새 비밀번호가 표시됩니다
   - 이 비밀번호를 복사하세요!
   - ⚠️ **주의**: 이 비밀번호는 한 번만 표시됩니다

### 6. Client Secret 복사
- 표시된 비밀번호 선택 (보통 `GOCSPX-`로 시작하는 긴 문자열)
- `Ctrl+C` (Windows) 또는 `Cmd+C` (Mac)로 복사
- **바로 Supabase에 붙여넣기** (한 번 더 볼 수 없습니다!)

## 빠른 링크

### 사용자 인증 정보 페이지
```
https://console.cloud.google.com/apis/credentials
```

### API 및 서비스 메인 페이지
```
https://console.cloud.google.com/apis
```

## 전체 경로 요약

```
Google Cloud Console
  → APIs & Services (API 및 서비스)
    → Credentials (사용자 인증 정보)
      → OAuth 2.0 Client ID
        → Client 이름 클릭 (supabase_log)
          → Client Secret 보기/생성
```

## Supabase에 입력할 정보

**Supabase Dashboard 경로:**
```
https://supabase.com/dashboard
  → 프로젝트 선택 (boam79's Project)
    → Authentication (왼쪽 메뉴)
      → Providers (탭)
        → Google (스크롤)
          → Enable Google Sign-In (토글 ON)
          → Client ID 입력
          → Client Secret 입력
          → Save
```

## 중요 사항

⚠️ **Client Secret은 보안 정보입니다**
- 절대 GitHub나 공개 저장소에 커밋하지 마세요
- .env.local 파일에만 저장하세요
- 다른 사람과 공유하지 마세요

## 테스트 확인

Client Secret을 입력한 후:
1. Save 버튼 클릭
2. 몇 초 기다리기 (적용 시간)
3. http://localhost:3000/login 접속
4. "Google로 로그인" 버튼 클릭
5. Google 로그인 페이지로 이동되어야 합니다

