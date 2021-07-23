import { Router } from "express";
import { isChildMiddleware } from "../app/middlewares";
import {
  createChildController,
  findUserController,
  listChildren,
  updateChildController,
  updateUserController,
} from "../controllers";
const router = Router();

router.post("/update", isChildMiddleware, updateUserController);
router.post("/updateChild/:id", isChildMiddleware, updateChildController);
router.post("/createChild", isChildMiddleware, createChildController);
router.get("/listChildren", listChildren);
router.get("/buscar/:dni", findUserController);

export default router;
