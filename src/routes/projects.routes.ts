import express from "express";
import projectsController from "../controllers/projects.controller";
import { isAdmin, isAuth } from "../middleware/isAuth";
import { cache } from "../middleware/cache";

const projectsRoutes = express.Router();

projectsRoutes.get("/", cache, projectsController.getAllProjects);
projectsRoutes.get("/:id", cache, projectsController.getProjectById);
projectsRoutes.post("/", isAuth, isAdmin, projectsController.createProject);
projectsRoutes.put(
  "/:id",
  isAuth,
  isAdmin,
  projectsController.updateProjectById
);
projectsRoutes.delete(
  "/:id",
  isAuth,
  isAdmin,
  projectsController.deleteProjectById
);

export default projectsRoutes;
