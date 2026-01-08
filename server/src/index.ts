import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import marathonsRouter from "./routes/marathons.js";

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

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
