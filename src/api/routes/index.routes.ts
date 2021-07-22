import { Router } from "express";
import { createUserController, loginUserController } from "../controllers";
const router = Router();

router.post("/login", loginUserController);
router.post("/register", createUserController);

export default router;
