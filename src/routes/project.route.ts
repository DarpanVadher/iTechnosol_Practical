import { Router } from "express";
import {
	createProject,
	getProjects,
	updateProject,
	deleteProject,
	getTaskByProjects,
} from "../controllers/project.controller";

const projectRouter = Router();

projectRouter.get("/", getProjects);
projectRouter.get("/:id", getProjects);
projectRouter.get("/:id/tasks", getTaskByProjects);
projectRouter.post("/", createProject);
projectRouter.put("/:id", updateProject);
projectRouter.delete("/:id", deleteProject);

export default projectRouter;
