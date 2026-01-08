# Supabase MCP 서버 설정 가이드

[참고 문서](https://apidog.com/kr/blog/supabase-mcp-kr/)

## 현재 프로젝트 적용 순서

### ✅ 1단계: Supabase 프로젝트 확인 (이미 완료)

- [x] Supabase 프로젝트 생성 완료
- [x] 테이블 생성 완료 (`marathons` 테이블)
- [x] `server/.env` 파일에 환경 변수 설정 필요

**확인 사항:**
- `SUPABASE_URL`: Supabase 대시보드 > Settings > API > Project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Settings > API > service_role key (secret)

### 📦 2단계: MCP 서버 패키지 설치

프로젝트 루트에서 다음 명령어 실행:

```bash
# npm을 통해 MCP 서버 설치
npm install -g @supabase/mcp-server

# 또는 로컬 설치 (프로젝트에 포함)
yarn add -D @supabase/mcp-server
```

**또는 GitHub에서 직접 설치:**
```bash
# Supabase 공식 MCP 서버 저장소 확인
# https://github.com/supabase/mcp-server-supabase
```

### 🔧 3단계: Supabase 연결 정보 확인

**필요한 정보:**
1. **PostgreSQL 연결 문자열**
   - Supabase 대시보드 > Settings > Database > Connection string
   - 형식: `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`
   - 또는 직접 연결: `postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres`

2. **API 키**
   - `SUPABASE_URL`: 이미 `.env`에 설정됨
   - `SUPABASE_SERVICE_ROLE_KEY`: 이미 `.env`에 설정됨

### ⚙️ 4단계: Cursor MCP 설정 파일 생성

Cursor의 MCP 설정은 다음 위치에 있습니다:

**Windows:**
```
%APPDATA%\Cursor\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json
```

또는 Cursor 설정에서 직접 구성할 수 있습니다.

**설정 파일 예시 (`cline_mcp_settings.json`):**

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

### 🔗 5단계: PostgreSQL 연결 문자열 방식 (대안)

PostgreSQL 연결 문자열을 사용하는 경우:

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

### 📝 6단계: 환경 변수 설정 (권장 방법)

**방법 1: Cursor 설정 파일에 직접 입력**
- 위의 JSON 설정에서 `env` 섹션에 실제 값 입력

**방법 2: 시스템 환경 변수 사용**
- Windows: 시스템 환경 변수에 추가
- Cursor 설정에서는 환경 변수 이름만 참조

### 🧪 7단계: 연결 테스트

1. **Cursor 재시작**
   - Cursor를 완전히 종료하고 다시 시작

2. **MCP 리소스 확인**
   - Cursor에서 MCP 리소스가 표시되는지 확인
   - 또는 AI에게 "Supabase 테이블 정보를 보여줘"라고 요청

3. **서버 로그 확인**
   - MCP 서버 실행 시 콘솔에 로그가 표시되는지 확인

### 🔍 8단계: 문제 해결

**MCP 리소스가 보이지 않는 경우:**

1. **설정 파일 경로 확인**
   ```bash
   # Windows PowerShell
   echo $env:APPDATA\Cursor\User\globalStorage
   ```

2. **패키지 설치 확인**
   ```bash
   npx -y @supabase/mcp-server-supabase --help
   ```

3. **환경 변수 확인**
   - `.env` 파일의 값이 올바른지 확인
   - Cursor 설정 파일의 `env` 값이 올바른지 확인

4. **Cursor 로그 확인**
   - Cursor > Help > Toggle Developer Tools
   - Console에서 MCP 관련 에러 확인

### 📚 추가 리소스

- [Supabase MCP 서버 GitHub](https://github.com/supabase/mcp-server-supabase)
- [MCP 프로토콜 문서](https://modelcontextprotocol.io)
- [Cursor MCP 설정 가이드](https://docs.cursor.com)

## 현재 프로젝트 상태

- ✅ Supabase 프로젝트 생성 완료
- ✅ 테이블 생성 완료
- ⏳ MCP 서버 설치 필요
- ⏳ Cursor 설정 파일 구성 필요
- ⏳ 연결 테스트 필요


