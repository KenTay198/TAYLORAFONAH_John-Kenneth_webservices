import express from "express";
import skillsController from "../controllers/skills.controller";
import { isAdmin } from "../middleware/isAuth";
import { cache } from "../middleware/cache";

const skillsRoutes = express.Router();

skillsRoutes.get("/",cache, skillsController.getAllSkills);
skillsRoutes.get("/:id",cache, skillsController.getSkillById);
skillsRoutes.post("/", isAdmin, skillsController.createSkill);
skillsRoutes.put("/:id", isAdmin, skillsController.updateSkillById);
skillsRoutes.delete("/:id", isAdmin,skillsController.deleteSkillById);

export default skillsRoutes;
