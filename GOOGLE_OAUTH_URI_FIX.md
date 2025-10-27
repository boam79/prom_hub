# Google OAuth URI 오류 해결

## 오류 메시지
```
올바르지 않은 리디렉션: 공백을 포함할 수 없습니다.
Invalid redirect: Cannot contain spaces.
```

## 원인
URI 입력 필드에 공백(space)이 포함되어 있습니다.

## 해결 방법

### 1. URI 필드 다시 입력

현재 URI:
```
https://uzjduzeacmhiovzgudkj.supabase.co/auth/v1/callback
```

**다음과 같이 다시 입력하세요:**

1. **기존 URI 삭제**
   - URI 필드 옆의 휴지통 아이콘 클릭하거나
   - URI 전체를 선택하고 삭제

2. **URI 다시 입력**
   - `https://uzjduzeacmhiovzgudkj.supabase.co/auth/v1/callback` 를 복사
   - 붙여넣기 (Ctrl+V / Cmd+V)
   - **주의**: 앞뒤 공백이 없는지 확인
   - 스페이스바를 눌러 공백을 추가하지 않았는지 확인

3. **"만들기" 버튼 클릭**

### 2. URI 확인 체크리스트

올바른 URI 입력을 확인하려면:

✅ **올바른 URI:**
```
https://uzjduzeacmhiovzgudkj.supabase.co/auth/v1/callback
```

❌ **잘못된 예시:**
```
 https://uzjduzeacmhiovzgudkj.supabase.co/auth/v1/callback (앞에 공백)
https://uzjduzeacmhiovzgudkj.supabase.co/auth/v1/callback  (뒤에 공백)
https:// uzjduzeacmhiovzgudkj.supabase.co/auth/v1/callback (URL 중간에 공백)
```

### 3. 추가로 설정해야 할 URI

개발 중에는 다음 URI도 추가하는 것을 권장합니다:

```
http://localhost:3000
```

완성된 설정:

**승인된 리디렉션 URI:**
1. `https://uzjduzeacmhiovzgudkj.supabase.co/auth/v1/callback`
2. `http://localhost:3000` (선택사항, 개발용)

### 4. 생성 후 할 일

1. **Client ID와 Client Secret 복사**
   - 생성되면 클라이언트 ID와 비밀번호가 표시됩니다
   - 안전한 곳에 복사해두세요

2. **Supabase에 입력**
   - Supabase Dashboard > Authentication > Providers > Google
   - Client ID 입력
   - Client Secret 입력
   - Save

3. **테스트**
   - http://localhost:3000/login 접속
   - "Google로 로그인" 버튼 클릭
   - 로그인 성공 확인

