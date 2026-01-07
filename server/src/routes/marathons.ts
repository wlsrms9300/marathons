import { Router, type Request, type Response } from "express";
import { marathons, getMonth, type Marathon } from "../data/marathons.js";

const router = Router();

// 마라톤 목록 조회 (필터링 지원)
router.get("/", (req: Request, res: Response) => {
  try {
    const {
      type,
      distance,
      difficulty,
      month,
      search,
    } = req.query;

    let filtered = [...marathons];

    // 타입 필터
    if (type && type !== "all") {
      filtered = filtered.filter(
        (m) => m.type === type
      );
    }

    // 거리 필터
    if (distance && distance !== "all") {
      filtered = filtered.filter((m) =>
        m.distances.includes(distance as string)
      );
    }

    // 난이도 필터
    if (difficulty && difficulty !== "all") {
      filtered = filtered.filter(
        (m) => m.difficulty === difficulty
      );
    }

    // 월 필터
    if (month && month !== "all") {
      const monthNum = parseInt(month as string);
      filtered = filtered.filter(
        (m) => getMonth(m.date) === monthNum
      );
    }

    // 검색 필터
    if (search) {
      const searchLower = (search as string).toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(searchLower) ||
          m.location.toLowerCase().includes(searchLower) ||
          m.country.toLowerCase().includes(searchLower)
      );
    }

    res.json(filtered);
  } catch (error) {
    console.error("Error fetching marathons:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 마라톤 상세 조회
router.get("/:id", (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const marathon = marathons.find((m) => m.id === id);

    if (!marathon) {
      return res.status(404).json({ error: "Marathon not found" });
    }

    res.json(marathon);
  } catch (error) {
    console.error("Error fetching marathon:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

