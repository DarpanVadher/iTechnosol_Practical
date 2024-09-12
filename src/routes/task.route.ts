import { Router } from "express";
import {
	createTask,
	getTasks,
	updateTask,
	deleteTask,
} from "../controllers/task.controller";

const taskRouter = Router();

taskRouter.get("/", getTasks);
taskRouter.get("/:id", getTasks);
taskRouter.post("/", createTask);
taskRouter.put("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);

export default taskRouter;
