import { Router } from "express";
import { authController } from "./controller";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forget-password", authController.forgetPassword)
router.post("/reset-password", authController.resetPassword)

export default router;
