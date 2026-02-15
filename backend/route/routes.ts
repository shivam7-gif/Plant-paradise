import {Router , type Request , type Response} from "express";
import { signupController, loginController } from "../src/controllers/authController";

const router = Router();

router.post("/signup",signupController);
router.get("/login",loginController);

export default router;