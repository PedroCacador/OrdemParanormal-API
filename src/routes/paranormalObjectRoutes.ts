import { Router } from "express";
import { ParanormalObjectController } from "../controller/paranormalObjectController";

const router = Router();
const controller = new ParanormalObjectController();

router.get("/paranormal-objects", controller.getAll);
router.get("/paranormal-objects/:id", controller.getById);
router.post("/paranormal-objects", controller.create);
router.put("/paranormal-objects/:id", controller.update);
router.patch("/paranormal-objects/:id", controller.patch);
router.delete("/paranormal-objects/:id", controller.delete);

export default router;
