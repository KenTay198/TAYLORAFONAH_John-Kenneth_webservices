import express from "express";
import usersRoutes from "./users.routes";
import projectsRoutes from "./projects.routes";
import authRoutes from "./auth.routes";
import skillsRoutes from "./skills.routes";
import { isAuth } from "../middleware/isAuth";


const router = express.Router();

router.use("/", authRoutes);
router.use("/users", isAuth, usersRoutes);
router.use("/projects", projectsRoutes);
router.use("/skills", isAuth, skillsRoutes);

export default router;
