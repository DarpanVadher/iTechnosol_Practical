import Project, { IProject } from "../models/project.model";
import User, { IUser } from "../models/user.model";
import Task, { ITask } from "../models/task.model";

// Get all users service
export const getAllProjectsData = async (id?: string) => {
	return new Promise((resolve, reject) => {
		if (id) {
			Project.find({ _id: id })
				.then((data: any) => {
					resolve(data);
				})
				.catch((err: any) => {
					reject(err);
				});
		} else {
			Project.find({})
				.then((data: any) => {
					resolve(data);
				})
				.catch((err: any) => {
					reject(err);
				});
		}
	});
};

export const getProjectWithTasksData = async (id: string) => {
	return new Promise((resolve, reject) => {
		Project.find({ _id: id })
			.populate("tasks")
			.then((data: any) => {
				resolve(data);
			})
			.catch((err: any) => {
				reject(err);
			});
	});
};

// Create a new user service
export const createProjectData = async (projectData: IProject) => {
	return new Promise((resolve, reject) => {
		const project = new Project(projectData);

		project
			.save()
			.then((data: any) => {
				resolve(data);
			})
			.catch((err: any) => {
				reject(err);
			});
	});
};

export const updateProjectData = async (projectData: IUser, id: string) => {
	return new Promise((resolve, reject) => {
		Project.updateOne({ _id: id }, projectData)
			.then((data: any) => {
				resolve(data);
			})
			.catch((err: any) => {
				reject(err);
			});
	});
};

export const deleteProjectData = async (id: string) => {
	return new Promise((resolve, reject) => {
		Project.deleteOne({ _id: id })
			.then((data: any) => {
				resolve(data);
			})
			.catch((err: any) => {
				reject(err);
			});
	});
};
