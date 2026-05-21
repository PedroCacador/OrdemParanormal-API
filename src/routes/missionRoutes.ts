import { Router } from "express";
import { MissionController } from "../controller/missionController";

const router = Router();

router.get("/missions", MissionController.getAll);
router.get("/missions/:id", MissionController.getById);
router.post("/missions", MissionController.create);
router.put("/missions/:id", MissionController.update);
router.patch("/missions/:id", MissionController.patch);
router.delete("/missions/:id", MissionController.delete);

export default router;
