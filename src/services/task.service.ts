import Task, { ITask } from "../models/task.model";
import User, { IUser } from "../models/user.model";

// Get all Tasks service
export const getAllTasksData = async (id?: string) => {
	return new Promise((resolve, reject) => {
		if (id) {
			Task.find({ _id: id })
				.then((data: any) => {
					resolve(data);
				})
				.catch((err: any) => {
					reject(err);
				});
		} else {
			Task.find({})
				.then((data: any) => {
					resolve(data);
				})
				.catch((err: any) => {
					reject(err);
				});
		}
	});
};

// Create a new Task service
export const createTaskData = async (taskData: ITask) => {
	return new Promise((resolve, reject) => {
		const data = new Task(taskData);

		data
			.save()
			.then((data: any) => {
				resolve(data);
			})
			.catch((err: any) => {
				reject(err);
			});
	});
};

export const updateTaskData = async (taskData: ITask, id: string) => {
	return new Promise((resolve, reject) => {
		Task.updateOne({ _id: id }, taskData)
			.then((data: any) => {
				resolve(data);
			})
			.catch((err: any) => {
				reject(err);
			});
	});
};

export const deleteTaskData = async (id: string) => {
	return new Promise((resolve, reject) => {
		Task.deleteOne({ _id: id })
			.then((data: any) => {
				resolve(data);
			})
			.catch((err: any) => {
				reject(err);
			});
	});
};
