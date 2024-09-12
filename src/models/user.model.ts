import mongoose, { Schema, model, Types, Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
}

// User Schema
const userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		minlength: [3, 'Name must be at least 3 characters long'],
	  },
	  email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
		match: [
		  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
		  'Please provide a valid email address',
		],
	  },
});

// Custom error handler for unique email constraint (since Mongoose doesn't provide a built-in custom message)
userSchema.post('save', function(error: any, doc: any, next: (err?: any) => void) {
	if (error.name === 'MongoServerError' && error.code === 11000) {
	  next(new Error('Email already exists. Please use a different email.'));
	} else {
	  next(error);
	}
  });

// Virtual populate to get all projects related to the user
userSchema.virtual("projects", {
	ref: "Project", // The model to use
	localField: "_id", // The field in User model
	foreignField: "userId", // The field in Project model
});

// Ensure virtual fields are included when converting to JSON or objects
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model<IUser>("User", userSchema);

export default User;
