import { Router } from "express";
import { ParanormalObjectController } from "../controller/paranormalObjectController";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.get("/paranormal-objects", verifyToken, ParanormalObjectController.getAll);
router.get("/paranormal-objects/:id", verifyToken, ParanormalObjectController.getById);
router.post("/paranormal-objects", verifyToken, ParanormalObjectController.create);
router.put("/paranormal-objects/:id", verifyToken, ParanormalObjectController.update);
router.patch("/paranormal-objects/:id", verifyToken, ParanormalObjectController.patch);
router.delete("/paranormal-objects/:id", verifyToken, ParanormalObjectController.delete);

export default router;
