# Toss Payments 결제 시스템 수정 완료

## 수정 사항

### 1. SDK URL 변경 (v2 → v1)
- **이전**: `https://js.tosspayments.com/v2拋掷` 
- **수정**: `https://js.tosspayments.com/v1/payment`
- **이유**: v2는 npm 패키지가 필요하고, v1은 HTML 스크립트로 바로 사용 가능

### 2. 테스트 클라이언트 키 추가
```javascript
const clientKey = process.env.NEXT_PUBLIC_TOSS準CLIENT_KEY || 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'
```
- 샘플 프로젝트의 테스트 키를 기본값으로 설정
- 환경 변수가 없어도 테스트 가능

### 3. SDK 로드 개선
- `defer` 옵션 추가
- 100ms 지연으로 초기화 완료 보장
- 타임아웃 5초 설정

### 4. orderId 형식 변경
- **이전**: `order-${timestamp}-${random}`
- **수정**: `promhub-${timestamp}-${random}`
- 프로젝트 식별용 prefix 추가

### 5. URL 파라미터 추가
- 성공 URL에 `orderId` 추가
- 실패 URL에 `orderId` 추가
- 결제 추적 가능

## 테스트 방법

### 1. 브라우저 새로고침
- 개발 서버 재시작 불필요
- 캐시 초기화를 위한 하드 리프레시: `Cmd+Shift+R` (Mac) / `Ctrl+Shift+R` (Windows)

### 2. 결제 버튼 클릭
- 프롬프트 상세 페이지에서 "지금 구매하기" 버튼 클릭
- Toss Payments 결제창이 팝업으로 열림

### 3. 테스트 카드 정보
- **카드번호**: 0000-0000-0000-0000 (실제로는 Toss Payments 결제창에서 안내)
- **유효기간**: 12/34
- **생년월일**: 900101

## 다음 단계

### 자신의 클라이언트 키 사용 (옵션)
`.env.local` 파일에 추가:
```env
NEXT_PUBLIC_TOSS_CLIENT_KEY=your_test_client_key_here
```

### 개발자센터에서 키 발급
1. https://developers.tosspayments.com 접속
2. 로그인 및 상점 등록
3. API Keys > 테스트 키 복사

## 참고 자료
- [토스페이먼츠 공식 문서](https://docs.tosspayments.com/guides/v2/get-started)
- [샘플 프로젝트](https://github.com/tosspayments/tosspayments-sample)
- [1:1 채팅(Discord)](https://discord.com/invite/VdkfJnknD9)

