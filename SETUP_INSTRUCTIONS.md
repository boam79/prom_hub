# PromHub 설정 가이드

## 1. Supabase 환경 변수 설정

### Supabase Dashboard에서 가져올 정보:
1. **Project Settings** → **API** 메뉴로 이동
2. 다음 정보를 복사:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` 키 → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` 키 → `SUPABASE_SERVICE_ROLE_KEY` (🔴 주의: 이 키는 서버에서만 사용!)

### 프로젝트 루트에 `.env.local` 파일 생성

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Toss Payments (나중에 설정)
NEXT_PUBLIC_TOSS_CLIENT_KEY=
TOSS_SECRET_KEY=

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

⚠️ **중요**: `.env.local` 파일은 Git에 커밋하지 마세요! 이미 `.gitignore`에 포함되어 있습니다.

## 2. 데이터베이스 스키마 적용

Supabase Dashboard → SQL Editor에서 `supabase/schema.sql` 파일의 모든 내용을 실행하세요.

이미 완료하셨다면 스킵하셔도 됩니다.

## 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속하여 확인하세요.

## 4. 기능 테스트

### 인증 테스트:
1. `/signup` 페이지에서 회원가입
2. `/login` 페이지에서 로그인
3. Supabase Dashboard → Authentication → Users에서 사용자 확인

### 프롬프트 테스트:
1. 로그인 후 `/sell` 페이지에서 프롬프트 등록
2. `/marketplace` 페이지에서 등록한 프롬프트 확인
3. `/prompts/[id]` 페이지에서 상세 정보 확인

## 5. Toss Payments 설정 (선택사항)

1. https://www.toss.im 에서 개발자 계정 생성
2. 결제 상점 생성 및 키 발급
3. `.env.local`에 Toss Payments 키 추가
4. `components/PaymentButton.tsx`에서 실제 결제 로직 구현

## 문제 해결

### 환경 변수가 로드되지 않는 경우:
- 개발 서버를 재시작하세요 (`Ctrl+C` 후 `npm run dev`)
- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- 변수명에 오타가 없는지 확인

### Supabase 연결 오류:
- `NEXT_PUBLIC_SUPABASE_URL`이 정확한지 확인
- Supabase 프로젝트가 활성화되어 있는지 확인
- SQL 스키마가 제대로 적용되었는지 확인

### 인증 오류:
- Database Settings에서 RLS가 활성화되어 있는지 확인
- SQL Editor에서 정책들이 생성되었는지 확인

