import { Router } from "express";
import { MissionController } from "../controller/missionController";

const router = Router();
const controller = new MissionController();

router.get("/missions", controller.getAll);
router.get("/missions/:id", controller.getById);
router.post("/missions", controller.create);
router.put("/missions/:id", controller.update);
router.patch("/missions/:id", controller.patch);
router.delete("/missions/:id", controller.delete);

export default router;
