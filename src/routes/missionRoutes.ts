import { Router } from "express";
import { MissionController } from "../controller/missionController";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.get("/missions", verifyToken, MissionController.getAll);
router.get("/missions/:id", verifyToken, MissionController.getById);
router.post("/missions", verifyToken, MissionController.create);
router.put("/missions/:id", verifyToken, MissionController.update);
router.patch("/missions/:id", verifyToken, MissionController.patch);
router.delete("/missions/:id", verifyToken, MissionController.delete);

export default router;
