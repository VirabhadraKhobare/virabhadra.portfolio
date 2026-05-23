import { Router } from "express";
import { getAchievementsSummary } from "../controllers/achievementsController.js";

const router = Router();

router.get("/summary", getAchievementsSummary);

export default router;
