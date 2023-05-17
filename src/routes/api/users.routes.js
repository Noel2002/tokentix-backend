import { Router } from "express";
import { getAllUsersController, loginController, signupController } from "../../controllers/users.controller.js";

const router = Router();

router.get("/", getAllUsersController);

router.post("/signup", signupController);

router.post("/login", loginController);

export default router;