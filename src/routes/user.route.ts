import { Router } from "express";
import {
	createUser,
	getUsers,
	updateUser,
	deleteUser,
	getProjectsByUser,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUsers);
userRouter.get("/:id/projects", getProjectsByUser);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
