# Supabase Purchase Table RLS Policy 확인

## 현재 문제
- 결제 버튼 클릭 후 "결제 완료" 메시지는 나타나지만
- 실제 구매 내역이 Supabase에 저장되지 않음
- 406 Not Acceptable 에러 발생

## 원인
RLS (Row Level Security) 정책이 제대로 설정되지 않았거나 INSERT 권한이 없을 가능성

## 해결 방법

### Supabase SQL Editor에서 다음 쿼리 실행:

```sql
-- Purchase INSERT 권한 확인 및 수정
-- 먼저 기존 정책 확인
SELECT * FROM pg_policies WHERE tablename = 'purchases';

-- 혹시 정책이 없으면 새로 생성
CREATE POLICY "Users can insert own purchases"
  ON purchases FOR INSERT
  WITH CHECK (auth.uid() = buyer_id);

-- 이미 있다면 삭제 후 재생성
DROP POLICY IF EXISTS "Users can insert own purchases" ON purchases;

CREATE POLICY "Users can insert own purchases"
  ON purchases FOR INSERT
  WITH CHECK (auth.uid() = buyer_id);

-- 혹시 필요하면 SELECT 권한도 확인
CREATE POLICY IF NOT EXISTS "Users can view own purchases"
  ON purchases FOR SELECT
  USING (auth.uid() = buyer_id);
```

## 빠른 확인
Supabase Dashboard > Database > Policies에서:
- purchases 테이블에 INSERT 정책이 있는지 확인
- 정책이 없으면 위 SQL 실행

## 테스트
1. 브라우저 새로고침
2. 다시 결제 버튼 클릭
3. Supabase Dashboard > Database > Table Editor > purchases에서 데이터 확인

