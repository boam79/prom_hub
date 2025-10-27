# Toss Payments 결제 시스템 설정 완료

## 현재 구현 완료 상태

### ✅ 구현된 기능
1. **Toss Payments SDK v2 연동**
   - 동적 스크립트 로드
   - SDK 초기화 로직
   - 결제창 호출

2. **결제 플로우**
   - 결제 버튼 클릭 → Toss Payments 결제창
   - 결제 성공 → 구매 내역 저장 → 대시보드 이동
   - 결제 실패 → 오류 메시지 표시

3. **보안 처리**
   - 프롬프트 소유자 확인
   - 중복 구매 방지
   - 로그인 검증

### 환경 변수 설정 필요

`.env.local` 파일에 Toss Payments 클라이언트 키 추가:

```env
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_D4KeOd5bbgrgKRvzwMp87EYnzex6
```

### Toss Payments 테스트 사용법

1. **테스트 클라이언트 키 발급**
   - https://docs.tosspayments.com 접속
   - 로그인 후 API Keys에서 테스트 키 복사

2. **테스트 카드번호**
   - 카드번호: `1234-5678-1234-5678`
   - 유효기간: `12/34`
   - CVC: `123`
   - 비밀번호: `12` (앞 2자리)
   - 생년월일: `900101`

3. **테스트 결제**
   - 프롬프트 상세 페이지에서 "지금 구매하기" 클릭
   - Toss Payments 결제창에서 테스트 카드 입력
   - 결제 완료 확인

### 문제 해결

#### SDK 로드 실패
현재 구현된 내용:
- 스크립트 중복 로드 방지
- async 옵션 추가
- body에 스크립트 추가
- 재시도 로직

#### 406 Not Acceptable 에러
이전 구매 내역 관련 에러일 수 있음
- 브라우저 새로고침 후 다시 시도

### 다음 단계

1. Toss Payments 개발자센터에서 테스트 키 발급
2. `.env.local`에 키 설정
3. 결제 버튼 테스트

