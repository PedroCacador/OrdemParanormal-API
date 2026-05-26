import { Router } from "express";
import { ThreatController } from "../controller/threatController";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.get("/threats", verifyToken, ThreatController.getAll);
router.get("/threats/:id", verifyToken, ThreatController.getById);
router.post("/threats", verifyToken, ThreatController.create);
router.put("/threats/:id", verifyToken, ThreatController.update);
router.patch("/threats/:id", verifyToken, ThreatController.patch);
router.delete("/threats/:id", verifyToken, ThreatController.delete);

export default router;
