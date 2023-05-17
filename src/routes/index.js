import { Router } from "express";
import userRoutes from './api/users.routes.js';

const router = Router();

router.use("/users", userRoutes);

export default router;
