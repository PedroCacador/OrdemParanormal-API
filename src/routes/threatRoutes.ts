import { Router } from "express";
import { ThreatController } from "../controller/threatController";

const router = Router();

router.get("/threats", ThreatController.getAll);
router.get("/threats/:id", ThreatController.getById);
router.post("/threats", ThreatController.create);
router.put("/threats/:id", ThreatController.update);
router.patch("/threats/:id", ThreatController.patch);
router.delete("/threats/:id", ThreatController.delete);

export default router;
