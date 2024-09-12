import mongoose, { Schema, model, Types, Document } from "mongoose";

export interface ITask extends Document {
	title: string;
	description: string;
	status: string;
	projectId: Types.ObjectId;
	createdAt: Date;
}

// Task Schema
const taskSchema = new Schema<ITask>({
	title: {
	  type: String,
	  required: [true, 'Title is required.'], // Custom message for required title
	  minlength: [5, 'Title must be at least 5 characters long.'], // Custom message for minlength
	},
	description: {
	  type: String,
	  required: [true, 'Description is required.'], // Custom message for required description
	  minlength: [10, 'Description must be at least 10 characters long.'], // Custom message for minlength
	},
	status: {
	  type: String,
	  enum: {
		values: ['pending', 'in-progress', 'completed'], // Enum for valid status values
		message: 'Status must be either "pending", "in-progress", or "completed".', // Custom message for invalid enum value
	  },
	  required: [true, 'Status is required.'], // Custom message for required status
	},
	projectId: {
	  type: Schema.Types.ObjectId,
	  required: [true, 'Project ID is required.'], // Custom message for required projectId
	  ref: 'Project', // Reference to Project model
	},
	createdAt: {
	  type: Date,
	  default: Date.now, // Automatically set to current date if not provided
	},
  });

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
