import { Router } from "express";
import { ThreatController } from "../controller/threatController";

const router = Router();
const controller = new ThreatController();

router.get("/threats", controller.getAll);
router.get("/threats/:id", controller.getById);
router.post("/threats", controller.create);
router.put("/threats/:id", controller.update);
router.patch("/threats/:id", controller.patch);
router.delete("/threats/:id", controller.delete);

export default router;
