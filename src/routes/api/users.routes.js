import { Router } from "express";
import { activateUserController, getAllUsersController, getUserController, loginController, sendOTPController, signupController } from "../../controllers/users.controller.js";
import { sendOTP } from "../../middlewares/otp.middleware.js";

const router = Router();

router.get("/", getAllUsersController);

router.get('/:id', getUserController);

router.post("/signup", signupController, sendOTP);

router.post("/login", loginController);

router.post("/sendOTP", sendOTPController);

router.post("/activate", activateUserController)

export default router;