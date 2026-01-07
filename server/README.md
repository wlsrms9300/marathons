# 마라톤 서버 (Backend)

Node.js + Express + TypeScript 기반 백엔드 서버입니다.

## 설치

```bash
cd server
npm install
```

## 실행

### 개발 모드
```bash
npm run dev
```

### 프로덕션 빌드
```bash
npm run build
npm start
```

## 환경 변수

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```
PORT=3000
NODE_ENV=development
```

## API 엔드포인트

- `GET /api/health` - 서버 상태 확인
- `GET /api/marathons` - 마라톤 목록 조회

## 루트에서 전체 실행

프론트엔드와 백엔드를 동시에 실행하려면 루트 디렉토리에서:

```bash
npm run dev:all
```

