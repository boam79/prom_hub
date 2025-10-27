# Google OAuth Client Secret 생성 - 단계별 가이드

## 현재 상황
- OAuth 클라이언트 "supabase_log"가 생성되어 있음
- Client ID: `424317837535-eqqg2gih3hb4612u5ao50rh4h71hf97s.apps.googleusercontent.com`
- Client Secret이 생성되지 않았거나 표시되지 않음

## 단계별 해결 방법

### 1단계: OAuth 클라이언트 클릭
현재 페이지에서 "supabase_log" 클릭

### 2단계: 편집 페이지에서
- 페이지 상단에 "웹 애플리케이션의 클라이언트 ID" 타이틀 보임
- 오른쪽 상단에 "삭제" 버튼 보임
- 페이지 하단에 "저장", "취소" 버튼 보임

### 3단계: Client Secret 찾기/생성
현재 편집 페이지에서 Client Secret 섹션을 찾으세요:

**가능한 위치:**
1. **Client ID 바로 아래**: "Client Secret" 또는 "비밀번호" 라벨
2. **페이지 중간 부분**: OAuth 클라이언트 정보 섹션
3. **보이지 않는다면**: 
   - "새 비밀번호 만들기" 버튼 클릭
   - 또는 "비밀번호 표시" 버튼 클릭

### 4단계: Client Secret이 보이지 않는 경우
1. **"뒤로가기" 클릭**하여 사용자 인증 정보 목록으로 돌아가기
2. "supabase_log" 클라이언트의 **오른쪽 끝 점 3개 메뉴 (⋯)** 클릭
3. **"비밀번호 만들기"** 또는 **"재설정"** 선택

### 5단계: 현재 페이지에서 확인
현재 편집 페이지에서 스크롤하면서 다음을 찾으세요:
- "Client Secret" 또는 "클라이언트 비밀번호" 라벨
- 비밀번호가 표시되는 텍스트 필드
- "비밀번호 표시" 또는 "Show" 버튼
- "새 비밀번호 생성" 버튼

### 6단계: Client Secret 확인 시
- 비밀번호 복사 (보통 `GOCSPX-`로 시작)
- Supabase에 입력

### 7단계: Client Secret이 완전히 없는 경우
OAuth 2.0 클라이언트에 Client Secret이 필수가 아닌 경우도 있습니다.
- Mobile apps (iOS, Android)
- Desktop apps

하지만 **웹 애플리케이션**의 경우 Client Secret이 필요합니다.

## 현재 페이지에서 해야 할 일

### 옵션 A: Client Secret 필드 찾기
현재 편집 페이지에서 스크롤하여:
- "Client Secret" 섹션 찾기
- 비밀번호가 이미 생성되어 있을 수 있음

### 옵션 B: 뒤로가기하여 재생성
1. 브라우저에서 **뒤로가기** 버튼 클릭
2. 목록에서 "supabase_log" 클릭
3. 페이지 오른쪽 상단 메뉴에서 Client Secret 생성

## 대안: 새 OAuth 클라이언트 만들기
만약 Client Secret을 찾을 수 없다면:
1. 현재 페이지에서 "삭제" 버튼으로 클라이언트 삭제
2. "사용자 인증 정보 만들기" > OAuth 클라이언트 ID > 웹 애플리케이션
3. Client ID와 Client Secret이 함께 생성됨

## 다음 액션
현재 편집 페이지에서 다음 중 하나를 시도해보세요:
1. **스크롤하면서 "Client Secret" 섹션 찾기**
2. **"저장" 버튼 클릭** 후 "비밀번호 표시" 옵션 확인
3. **뒤로가기**하여 목록에서 재생성 옵션 찾기

