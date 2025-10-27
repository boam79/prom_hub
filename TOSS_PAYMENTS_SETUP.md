# Toss Payments 통합 가이드

## 현재 상황
- 결제 버튼 클릭 시 400 오류 발생
- Demo 모드로 구현되어 있음
- 실제 Toss Payments 연동 필요

## Toss Payments 설정 방법

### 1. Toss Payments 상점 등록
1. https://www.toss.im 사이트 접속
2. 개발자 센터에서 계정 생성
3. 상점 신청
4. **Client Key**와 **Secret Key** 발급

### 2. 환경 변수 설정
`.env.local` 파일에 추가:
```env
NEXT_PUBLIC_TOSS_CLIENT_KEY=your_client_key
TOSS_SECRET_KEY=your_secret_key
```

### 3. Toss Payments 설치
```bash
npm install @tosspayments/browser-sdk@latest
```

### 4. 결제 기능 구현
- 결제 요청 API
- 결제 승인 API
- 결제 성공/실패 페이지

## 공식 샘플 참고
GitHub: https://github.com/tosspayments/tosspayments-sample-v1

## 빠른 구현 옵션

### 옵션 A: Toss Payments 완전 통합
- 실제 결제 처리
- 결제창 UI
- 전체 플로우 구현

### 옵션 B: 현재 Demo 모드 유지
- 구매 내역만 Supabase에 저장
- 실제 결제 없이 테스트
- 나중에 통합

어떤 옵션을 선택하시겠습니까?

