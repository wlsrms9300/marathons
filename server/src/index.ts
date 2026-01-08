import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import marathonsRouter from "./routes/marathons.js";
import { testSupabaseConnection } from "./lib/supabase.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 기본 라우트
app.get("/api/health", (_req: express.Request, res: express.Response) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Supabase 연결 상태 확인
app.get("/api/health/db", async (_req: express.Request, res: express.Response) => {
  try {
    const { checkDatabaseStatus } = await import("./lib/supabase.js");
    const status = await checkDatabaseStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({
      connected: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// 테이블 정보 조회
app.get("/api/table-info/:tableName?", async (req: express.Request, res: express.Response) => {
  try {
    const { getTableInfo } = await import("./lib/tableInfo.js");
    const tableName = req.params.tableName || "marathons";
    const info = await getTableInfo(tableName);
    res.json(info);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// 마라톤 API 라우트
app.use("/api/marathons", marathonsRouter);

// 404 핸들러
app.use((_req: express.Request, res: express.Response) => {
  res.status(404).json({ error: "Not Found" });
});

// 에러 핸들러
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: express.NextFunction // Express 에러 핸들러 시그니처에 필수
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
);

app.listen(PORT, async () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  
  // Supabase 연결 테스트
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    await testSupabaseConnection();
  } else {
    console.log('⚠️  Supabase 환경 변수가 설정되지 않았습니다. 테스트 데이터를 사용합니다.');
  }
});
