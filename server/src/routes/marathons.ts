import { Router, type Request, type Response } from "express";
import {
  getMarathonsFromDB,
  getMarathonByIdFromDB,
} from "../lib/db.js";

const router = Router();

// 마라톤 목록 조회 (필터링 지원, DB 연동)
router.get("/", async (req: Request, res: Response) => {
  try {
    const { type, distance, difficulty, month, search } = req.query;

    const monthNum =
      month && month !== "all" ? parseInt(month as string, 10) : undefined;

    const marathons = await getMarathonsFromDB({
      type: (type as string | undefined) || undefined,
      distance: (distance as string | undefined) || undefined,
      difficulty: (difficulty as string | undefined) || undefined,
      month: monthNum,
      search: (search as string | undefined) || undefined,
    });

    res.json(marathons);
  } catch (error) {
    console.error("Error fetching marathons from DB:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 마라톤 상세 조회 (DB 연동)
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid marathon id" });
    }

    const marathon = await getMarathonByIdFromDB(id);

    if (!marathon) {
      return res.status(404).json({ error: "Marathon not found" });
    }

    res.json(marathon);
  } catch (error) {
    console.error("Error fetching marathon from DB:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

