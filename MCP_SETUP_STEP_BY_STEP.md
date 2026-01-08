# Supabase MCP 서버 설정 - 단계별 가이드

[참고: https://apidog.com/kr/blog/supabase-mcp-kr/](https://apidog.com/kr/blog/supabase-mcp-kr/)

## 🎯 현재 프로젝트 적용 순서

### ✅ **1단계: Supabase 프로젝트 확인** (이미 완료)

**확인 사항:**
- [x] Supabase 프로젝트 생성 완료
- [x] `marathons` 테이블 생성 완료
- [ ] `server/.env` 파일에 다음 정보 확인:
  - `SUPABASE_URL` (예: `https://xxxxx.supabase.co`)
  - `SUPABASE_SERVICE_ROLE_KEY` (긴 JWT 토큰)

**Supabase 대시보드에서 확인:**
1. Settings > API > Project URL → `SUPABASE_URL`
2. Settings > API > service_role key (secret) → `SUPABASE_SERVICE_ROLE_KEY`
3. Settings > Database > Connection string → PostgreSQL 연결 문자열 (선택사항)

---

### 📦 **2단계: MCP 서버 패키지 확인 및 설치**

**옵션 1: npm을 통한 전역 설치**
```bash
npm install -g @supabase/mcp-server
```

**옵션 2: npx로 직접 실행 (권장)**
```bash
# 패키지가 존재하는지 확인
npx -y @supabase/mcp-server-supabase --help
```

**옵션 3: GitHub에서 직접 설치**
```bash
# Supabase 공식 저장소 확인
# https://github.com/supabase/mcp-server-supabase
```

**참고:** 실제 패키지 이름은 `@supabase/mcp-server-supabase`일 수 있습니다.

---

### 🔧 **3단계: 프로젝트 내 MCP 설정 파일 생성**

**프로젝트 루트에 `.cursor/mcp.json` 파일 생성:**

1. **프로젝트 루트에 `.cursor` 폴더 생성** (이미 생성됨)

2. **`.cursor/mcp.json` 파일 생성** (이미 생성됨)

3. **설정 파일 내용:**

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase"
      ],
      "env": {
        "SUPABASE_URL": "https://your-project-id.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "your-service-role-key-here"
      }
    }
  }
}
```

**또는 PostgreSQL 연결 문자열 사용:**

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase"
      ],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
      }
    }
  }
}
```

---

### 🔐 **4단계: 환경 변수 설정**

**`.cursor/mcp.json` 파일에 실제 값 입력:**

1. **`.cursor/mcp.json` 파일 열기**
2. **`env` 섹션에 실제 Supabase 값 입력:**
   - `SUPABASE_URL`: `server/.env` 파일의 값과 동일하게 입력
   - `SUPABASE_SERVICE_ROLE_KEY`: `server/.env` 파일의 값과 동일하게 입력

**참고:** 
- `.cursor/mcp.json.example` 파일을 참고하세요
- 실제 키 값은 Git에 커밋하지 않도록 주의 (`.gitignore` 확인)

**방법 2: 시스템 환경 변수 사용**
- Windows 환경 변수에 추가
- Cursor가 자동으로 읽도록 설정

**실제 값 입력 예시 (`.cursor/mcp.json`):**
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase"
      ],
      "env": {
        "SUPABASE_URL": "https://abcdefghijklmnop.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjQ1NzI4MDAwLCJleHAiOjE5NjEzMDQwMDB9.실제키값"
      }
    }
  }
}
```

**보안 주의사항:**
- `.cursor/mcp.json` 파일에 실제 키를 입력하되, Git에 커밋하지 않도록 주의
- 또는 환경 변수를 사용하는 방법도 고려 가능

---

### 🔄 **5단계: Cursor 재시작**

1. Cursor 완전히 종료
2. Cursor 다시 시작
3. MCP 서버가 자동으로 연결되는지 확인

---

### 🧪 **6단계: 연결 테스트**

**테스트 방법:**

1. **MCP 리소스 확인:**
   - Cursor에서 MCP 리소스 목록 확인
   - Supabase 관련 리소스가 표시되는지 확인

2. **AI에게 요청:**
   ```
   "Supabase 데이터베이스의 marathons 테이블 구조를 보여줘"
   "marathons 테이블에 몇 개의 레코드가 있어?"
   "marathons 테이블의 스키마를 설명해줘"
   ```

3. **서버 로그 확인:**
   - Cursor 개발자 도구 열기 (Help > Toggle Developer Tools)
   - Console에서 MCP 관련 로그 확인

---

### 🛠️ **7단계: 문제 해결**

**문제 1: MCP 리소스가 보이지 않음**

**해결 방법:**
1. 설정 파일 경로 확인:
   ```powershell
   # PowerShell에서 실행
   echo $env:APPDATA\Cursor
   ```

2. 설정 파일 형식 확인:
   - JSON 문법 오류 없는지 확인
   - 따옴표, 쉼표 등 확인

3. 패키지 설치 확인:
   ```bash
   npx -y @supabase/mcp-server-supabase --help
   ```

4. 환경 변수 확인:
   - `SUPABASE_URL`과 `SUPABASE_SERVICE_ROLE_KEY`가 올바른지 확인
   - `.env` 파일의 값과 동일한지 확인

**문제 2: 패키지를 찾을 수 없음**

**해결 방법:**
1. 패키지 이름 확인:
   - `@supabase/mcp-server-supabase` (최신)
   - `@supabase/mcp-server` (구버전일 수 있음)

2. GitHub에서 직접 확인:
   - https://github.com/supabase/mcp-server-supabase
   - 최신 설치 방법 확인

**문제 3: 연결 실패**

**해결 방법:**
1. Supabase 프로젝트 상태 확인:
   - 대시보드에서 프로젝트가 활성화되어 있는지 확인
   - API 키가 유효한지 확인

2. 방화벽/네트워크 확인:
   - 인터넷 연결 확인
   - Supabase 서버 접근 가능한지 확인

---

### 📋 **체크리스트**

설정 완료 확인:

- [ ] `server/.env` 파일에 Supabase 정보 입력 완료
- [ ] MCP 서버 패키지 설치 또는 npx로 실행 가능 확인
- [ ] Cursor 설정 파일에 MCP 서버 설정 추가
- [ ] 환경 변수에 실제 Supabase 값 입력
- [ ] Cursor 재시작 완료
- [ ] MCP 리소스 목록에 Supabase 표시 확인
- [ ] AI를 통해 테이블 정보 조회 성공

---

### 📚 **추가 참고 자료**

- [Supabase MCP 서버 GitHub](https://github.com/supabase/mcp-server-supabase)
- [MCP 프로토콜 공식 문서](https://modelcontextprotocol.io)
- [Cursor 공식 문서](https://docs.cursor.com)

---

## 🚀 **빠른 시작 (요약)**

1. **환경 변수 확인:** `server/.env` 파일 확인
2. **설정 파일 생성:** Cursor 설정에 MCP 서버 추가
3. **재시작:** Cursor 재시작
4. **테스트:** "Supabase 테이블 정보 보여줘" 요청

완료되면 Cursor에서 자연어로 Supabase 데이터베이스를 쿼리할 수 있습니다!

