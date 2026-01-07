# 마라톤 앱 (Maratons)

React + TypeScript + Vite 프론트엔드와 Node.js + Express 백엔드가 함께 있는 풀스택 프로젝트입니다.

## 프로젝트 구조

```
maratons/
├── src/              # 프론트엔드 (React + Vite)
├── server/           # 백엔드 (Node.js + Express + TypeScript)
└── package.json      # 루트 패키지 설정
```

## 시작하기

### 1. 의존성 설치

```bash
# 루트 의존성 설치
npm install

# 서버 의존성 설치
cd server
npm install
cd ..
```

### 2. 개발 서버 실행

**프론트엔드와 백엔드를 동시에 실행 (권장):**
```bash
npm run dev:all
```

**개별 실행:**
```bash
# 프론트엔드만 실행 (포트 5173)
npm run dev

# 백엔드만 실행 (포트 3000)
npm run dev:server
```

### 3. 빌드

```bash
# 전체 빌드 (서버 + 프론트)
npm run build:all

# 개별 빌드
npm run build          # 프론트엔드
npm run build:server   # 백엔드
```

## 개발 환경 설정

### 백엔드 환경 변수

`server/.env` 파일을 생성하세요:

```env
PORT=3000
NODE_ENV=development
```

### API 프록시

개발 모드에서 Vite가 `/api/*` 요청을 자동으로 `http://localhost:3000`으로 프록시합니다.
프론트엔드 코드에서는 `/api/marathons`처럼 상대 경로를 사용하면 됩니다.

## 기술 스택

### 프론트엔드
- React 19
- TypeScript
- Vite
- Tailwind CSS
- TanStack Query

### 백엔드
- Node.js
- Express
- TypeScript
- CORS

---

## 원본 템플릿 정보

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
