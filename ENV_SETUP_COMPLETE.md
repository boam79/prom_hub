# 환경 변수 설정 완료

## 현재 설정된 환경 변수

### ✅ 완료된 설정
1. **Supabase**
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY

2. **Google OAuth**
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET

3. **Site**
   - NEXT_PUBLIC_SITE_URL

### 🔄 추가 설정 필요
1. **PortOne (Toss Payments)**
   - NEXT_PUBLIC_PORTONE_STORE_ID (your_store_id_here로 설정됨)
   - NEXT_PUBLIC_PORTONE_CHANNEL_KEY (your_channel_key_here로 설정됨)

2. **Toss Payments (구버전)**
   - NEXT_PUBLIC_TOSS_CLIENT_KEY
   - TOSS_SECRET_KEY

## 포트원 설정 방법

### 1. PortOne 대시보드 접속
https://admin.portone.io

### 2. Store ID 가져오기
1. Stores > Create Store 또는 기존 Store 선택
2. Store ID 복사
3. `.env.local`에서 `your_store_id_here` 교체

### 3. Channel Key 가져오기
1. Channels > Create Channel 또는 기존 Channel 선택
2. Channel Key 복사
3. `.env.local`에서 `your_channel_key_here` 교체

### 4. 환경 변수 업데이트 후
```bash
# 개발 서버 재시작
# Ctrl+C로 서버 중지 후
npm run dev
```

## 보안 주의사항

⚠️ `.env.local` 파일은 절대 Git에 커밋하지 마세요!
- 이미 `.gitignore`에 포함되어 있습니다
- 실제 키를 누출하지 않도록 주의하세요

## 테스트

모든 환경 변수가 설정된 후:
1. Google 로그인 작동 확인
2. Toss Payments 결제창 작동 확인

