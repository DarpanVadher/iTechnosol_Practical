import { Request, Response, NextFunction } from "express";
import {
	successResponse,
	errorResponse,
	successCreateResponse,
	successDeleteResponse,
} from "../utils/responseHandler";

import {
	createProjectData,
	getAllProjectsData,
	updateProjectData,
	deleteProjectData,
	getProjectWithTasksData,
} from "../services/project.service";

/**
 * Get all projects or a specific project by id
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 * @param {NextFunction} next - The express next function
 *
 * @returns {Promise<Response>} - The response with the project data or an error
 */
export const getProjects = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;
		const Projects = await getAllProjectsData(id);

		if (!Projects) {
			return errorResponse(res, "Project data not found", 404);
		}

		return successResponse(res, "Data fetched successfully", Projects);
	} catch (error) {
		next(error);
	}
};

/**
 * Create a new project
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 * @param {NextFunction} next - The express next function
 *
 * @returns {Promise<Response>} - The response with the created project data or an error
 */
export const createProject = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const Project = await createProjectData(req.body);
		return successCreateResponse(res, "Project created successfully", Project);
	} catch (error) {
		next(error);
	}
};

/**
 * Update an existing project
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 * @param {NextFunction} next - The express next function
 *
 * @returns {Promise<Response>} - The response with the updated project data or an error
 */
export const updateProject = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;

		if (!id) {
			return errorResponse(res, "Project id is required", 400);
		}

		const Project = await updateProjectData(req.body, id);

		if (!Project) {
			return errorResponse(res, "Project data not found", 404);
		}

		return successCreateResponse(res, "Project updated successfully", Project);
	} catch (error) {
		next(error);
	}
};

/**
 * Delete an existing project
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 * @param {NextFunction} next - The express next function
 *
 * @returns {Promise<Response>} - The response with the success message or an error
 */
export const deleteProject = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;

		if (!id) {
			return errorResponse(res, "Project id is required", 400);
		}

		const Project = await deleteProjectData(id);

		if (!Project) {
			return errorResponse(res, "Project data not found", 404);
		}

		return successDeleteResponse(res, "Project deleted successfully");
	} catch (error) {
		next(error);
	}
};

/**
 * Get all tasks related to a specific project by id
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 * @param {NextFunction} next - The express next function
 *
 * @returns {Promise<Response>} - The response with the task data or an error
 */
export const getTaskByProjects = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;

		if (!id) {
			return errorResponse(res, "Project id is required", 400);
		}

		const Projects = await getProjectWithTasksData(id);

		if (!Projects) {
			return errorResponse(res, "Project data not found", 404);
		}

		return successResponse(res, "Data fetched successfully", Projects);
	} catch (error) {
		next(error);
	}
};
