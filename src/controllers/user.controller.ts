import { Request, Response, NextFunction } from "express";
import {
	successResponse,
	errorResponse,
	successCreateResponse,
	successDeleteResponse,
} from "../utils/responseHandler";

import {
	createUserData,
	getAllUsersData,
	updateUserData,
	deleteUserData,
	getUserWithProjectsData,
} from "../services/user.service";

/**
 * Get all users or a specific user by id
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 * @param {NextFunction} next - The express next function
 *
 * @returns {Promise<Response>} - The response with the user data or an error
 */
export const getUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;
		const users = await getAllUsersData(id);

		if (!users) {
			return errorResponse(res, "User data not found", 404);
		}

		return successResponse(res, "Data fetched successfully", users);
	} catch (error) {
		next(error);
	}
};

/**
 * Get all projects related to a specific user by id
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 * @param {NextFunction} next - The express next function
 *
 * @returns {Promise<Response>} - The response with the project data or an error
 */

export const getProjectsByUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;

		if (!id) {
			return errorResponse(res, "User id is required", 400);
		}

		const users = await getUserWithProjectsData(id);

		if (!users) {
			return errorResponse(res, "User not found", 404);
		}

		return successResponse(res, "Data fetched successfully", users);
	} catch (error) {
		next(error);
	}
};

/**
 * Create a new user
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 * @param {NextFunction} next - The express next function
 *
 * @returns {Promise<Response>} - The response with the user data or an error
 */
export const createUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await createUserData(req.body);
		return successCreateResponse(res, "User created successfully", user);
	} catch (error) {
		next(error);
	}
};

/**
 * Update an existing user
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 * @param {NextFunction} next - The express next function
 *
 * @returns {Promise<Response>} - The response with the updated user data or an error
 */
export const updateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;

		if (!id) {
			return errorResponse(res, "User id is required", 400);
		}

		const user = await updateUserData(req.body, id);

		if (!user) {
			//Data not updated
			return errorResponse(res, "User data not found", 409);
		}

		return successCreateResponse(res, "User updated successfully", user);
	} catch (error) {
		next(error);
	}
};

/**
 * Delete an existing user
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 * @param {NextFunction} next - The express next function
 *
 * @returns {Promise<Response>} - The response with the success message or an error
 */
export const deleteUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;

		if (!id) {
			return errorResponse(res, "User id is required", 400);
		}

		const user = await deleteUserData(id);

		if (!user) {
			//Data not deleted
			return errorResponse(res, "User data not deleted", 409);
		}

		return successDeleteResponse(res, "User deleted successfully");
	} catch (error) {
		next(error);
	}
};
