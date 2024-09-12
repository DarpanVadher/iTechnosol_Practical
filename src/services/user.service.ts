import User, { IUser } from "../models/user.model";

// Get all users service
export const getAllUsersData = async (id?: string) => {
	return new Promise((resolve, reject) => {
		if (id) {
			User.find({ _id: id })
				.then((data: any) => {
					resolve(data);
				})
				.catch((err: any) => {
					reject(err);
				});
		} else {
			User.find({})
				.then((data: any) => {
					resolve(data);
				})
				.catch((err: any) => {
					reject(err);
				});
		}
	});
};

// Create a new user service
export const createUserData = async (userData: IUser) => {
	return new Promise((resolve, reject) => {
		const user = new User(userData);

		user
			.save()
			.then((data: any) => {
				resolve(data);
			})
			.catch((err: any) => {
				reject(err);
			});
	});
};

export const updateUserData = async (userData: IUser, id: string) => {
	return new Promise((resolve, reject) => {
		User.updateOne({ _id: id }, userData)
			.then((data: any) => {
				resolve(data);
			})
			.catch((err: any) => {
				reject(err);
			});
	});
};

export const deleteUserData = async (id: string) => {
	return new Promise((resolve, reject) => {
		User.deleteOne({ _id: id })
			.then((data: any) => {
				resolve(data);
			})
			.catch((err: any) => {
				reject(err);
			});
	});
};

export const getUserWithProjectsData = async (id: string) => {
	return new Promise((resolve, reject) => {
		User.findById(id)
			.populate("projects")
			.then((data: any) => {
				resolve(data);
			})
			.catch((err: any) => {
				reject(err);
			});
	});
};
