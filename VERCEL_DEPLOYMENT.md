# Vercel 배포 가이드

이 프로젝트는 monorepo 구조로, 프론트엔드와 백엔드를 분리해서 배포할 수 있습니다.

## 배포 방법

### 1. Vercel 대시보드에서 두 개의 프로젝트 생성

#### 프론트엔드 프로젝트

1. Vercel 대시보드에서 "Add New Project" 클릭
2. GitHub 레포지토리 선택
3. **프로젝트 설정**:
   - **Framework Preset**: Vite
   - **Root Directory**: `.` (루트 디렉토리)
   - **Build Command**: `yarn build`
   - **Output Directory**: `dist`
   - **Install Command**: `yarn install`

#### 백엔드 프로젝트

1. Vercel 대시보드에서 "Add New Project" 클릭
2. 같은 GitHub 레포지토리 선택
3. **프로젝트 설정**:
   - **Framework Preset**: Other
   - **Root Directory**: `server` (server 폴더)
   - **Build Command**: `yarn build`
   - **Output Directory**: `dist`
   - **Install Command**: `yarn install`

### 2. 환경 변수 설정

#### 프론트엔드 프로젝트

- `VITE_API_BASE_URL`: 백엔드 API URL (예: `https://your-backend.vercel.app`)

#### 백엔드 프로젝트

- `SUPABASE_URL`: Supabase 프로젝트 URL
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase Service Role Key
- `NODE_ENV`: `production`

### 3. 배포 후 확인

1. 백엔드가 먼저 배포되어야 합니다
2. 백엔드 URL을 확인한 후 프론트엔드의 `VITE_API_BASE_URL` 환경 변수에 설정
3. 프론트엔드를 다시 배포

## 로컬 개발

```bash
# 프론트엔드만 실행
yarn dev

# 백엔드만 실행
yarn dev:server

# 둘 다 실행
yarn dev:all
```

## 파일 구조

```
.
├── vercel.json          # 프론트엔드 Vercel 설정
├── server/
│   ├── vercel.json      # 백엔드 Vercel 설정
│   ├── api/
│   │   └── index.js     # Vercel serverless function 엔트리
│   └── src/
│       └── index.ts     # Express 앱 (Vercel에서도 export됨)
└── ...
```

## 주의사항

- 백엔드는 Vercel Serverless Functions로 배포됩니다
- 각 프로젝트는 독립적으로 배포되므로, 환경 변수를 각각 설정해야 합니다
- 프론트엔드의 API 호출은 프로덕션에서는 `VITE_API_BASE_URL` 환경 변수를 사용합니다
