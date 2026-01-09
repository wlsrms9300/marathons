// Vercel Serverless Function 엔트리 포인트
// Express 앱을 serverless function으로 래핑
// 빌드 후 생성된 dist/index.js를 import
import app from '../dist/index.js';

export default app;

