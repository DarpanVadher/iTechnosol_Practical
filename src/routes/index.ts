import express from "express";
import userRouter from "./user.route";
import projectRouter from "./project.route";
import taskRouter from "./task.route";

const router = express.Router();

router.use("/users", userRouter);
router.use("/projects", projectRouter);
router.use("/tasks", taskRouter);

export default router;
