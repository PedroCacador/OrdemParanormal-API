import { Router } from "express";
import { ParanormalObjectController } from "../controller/paranormalObjectController";

const router = Router();

router.get("/paranormal-objects", ParanormalObjectController.getAll);
router.get("/paranormal-objects/:id", ParanormalObjectController.getById);
router.post("/paranormal-objects", ParanormalObjectController.create);
router.put("/paranormal-objects/:id", ParanormalObjectController.update);
router.patch("/paranormal-objects/:id", ParanormalObjectController.patch);
router.delete("/paranormal-objects/:id", ParanormalObjectController.delete);

export default router;
