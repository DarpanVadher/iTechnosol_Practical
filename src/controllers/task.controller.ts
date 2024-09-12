import { Request, Response, NextFunction } from "express";

import {
	successResponse,
	errorResponse,
	successCreateResponse,
	successDeleteResponse,
} from "../utils/responseHandler";

import {
	createTaskData,
	getAllTasksData,
	updateTaskData,
	deleteTaskData,
} from "../services/task.service";

/**
 * Get all tasks or a specific task by id
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 * @param {NextFunction} next - The express next function
 *
 * @returns {Promise<Response>} - The response with the task data or an error
 */
export const getTasks = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		const Tasks = await getAllTasksData(id);

		if (!Tasks) {
			return errorResponse(res, "Task data not found", 404);
		}

		return successResponse(res, "Data fetched successfully", Tasks);
	} catch (error) {
		next(error);
	}
};

/**
 * Create a new task
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 * @param {NextFunction} next - The express next function
 *
 * @returns {Promise<Response>} - The response with the created task data or an error
 */
export const createTask = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const Task = await createTaskData(req.body);
		return successCreateResponse(res, "Task created successfully", Task);
	} catch (error) {
		next(error);
	}
};

/**
 * Update an existing task
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 * @param {NextFunction} next - The express next function
 *
 * @returns {Promise<Response>} - The response with the updated task data or an error
 */
export const updateTask = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		if (!id) {
			return errorResponse(res, "Task id is required", 400);
		}

		const Task = await updateTaskData(req.body, id);

		if (!Task) {
			return errorResponse(res, "Task not found", 404);
		}

		return successCreateResponse(res, "Task updated successfully", Task);
	} catch (error) {
		next(error);
	}
};

/**
 * Delete an existing task
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 * @param {NextFunction} next - The express next function
 *
 * @returns {Promise<Response>} - The response with the success message or an error
 */
export const deleteTask = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		if (!id) {
			return errorResponse(res, "Task id is required", 400);
		}
		const Task = await deleteTaskData(id);
		
		if (!Task) {
			return errorResponse(res, "Task not found", 404);
		}

		return successDeleteResponse(res, "Task deleted successfully");
	} catch (error) {
		next(error);
	}
};
