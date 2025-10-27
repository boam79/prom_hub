# PromHub - AI 프롬프트 마켓플레이스

Next.js 14, Supabase, Toss Payments로 구축된 현대적인 AI 프롬프트 구매/판매 마켓플레이스입니다.

## 주요 기능

- 🔐 사용자 인증 (Supabase Auth)
- 🎨 프롬프트 마켓플레이스 (브라우징, 검색, 필터)
- 💳 결제 통합 (Toss Payments)
- 📊 판매자 대시보드
- ⭐ 리뷰 시스템
- 🎯 SEO 최적화
- 📱 반응형 디자인

## 지원 AI 모델

- ChatGPT
- Midjourney
- DALL-E
- Gemini

## 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **데이터베이스**: Supabase (PostgreSQL)
- **인증**: Supabase Auth
- **결제**: Toss Payments
- **배포**: Vercel

## 시작하기

### 필수 조건

- Node.js 18+ 설치
- Supabase 계정
- Toss Payments 계정

### 설치

1. 저장소 클론:
```bash
git clone https://github.com/boam79/prom_hub.git
cd prom_hub
```

2. 의존성 설치:
```bash
npm install
```

3. 환경 변수 설정:
```bash
cp .env.example .env.local
```

4. 환경 변수 구성:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_TOSS_CLIENT_KEY=your_toss_client_key
TOSS_SECRET_KEY=your_toss_secret_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

5. Supabase 설정:
   - 새 Supabase 프로젝트 생성
   - Supabase SQL Editor에서 `supabase/schema.sql` 스크립트 실행

6. 개발 서버 실행:
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

## 프로젝트 구조

```
prom_hub/
├── app/              # Next.js App Router 페이지
├── components/       # React 컴포넌트
├── lib/             # 유틸리티 함수 및 Supabase 클라이언트
├── types/           # TypeScript 타입 정의
├── supabase/        # 데이터베이스 스키마 및 마이그레이션
└── public/          # 정적 자산
```

## 배포

### Vercel에 배포하기

1. GitHub에 코드 푸시
2. Vercel에서 저장소 가져오기
3. 환경 변수 추가
4. 배포!

## 라이선스

MIT
