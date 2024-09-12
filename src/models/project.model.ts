import mongoose, { Schema, model, Types, Document } from "mongoose";

export interface IProject extends Document {
	name: string;
	description: string;
	userId: Types.ObjectId;
}

// Project Schema
// Define the Mongoose schema for the Project model
const projectSchema = new Schema<IProject>({
	name: {
	  type: String,
	  required: [true, 'Project name is required.'], // Custom error message for required name
	  minlength: [3, 'Project name must be at least 3 characters long.'], // Custom error message for minlength
	},
	description: {
	  type: String,
	  required: [true, 'Project description is required.'], // Custom error message for required description
	  minlength: [10, 'Project description must be at least 10 characters long.'], // Custom error message for minlength
	},
	userId: {
	  type: Schema.Types.ObjectId,  // Correct type for referencing another document
	  required: [true, 'User ID is required.'], // Custom error message for missing user ID
	  ref: 'User', // Reference to the User model
	},
  }, { timestamps: true });

// Virtual populate to get all projects related to the user
projectSchema.virtual("tasks", {
	ref: "Task", // The model to use
	localField: "_id", // The field in User model
	foreignField: "projectId", // The field in Project model
});

// Ensure virtual fields are included when converting to JSON or objects
projectSchema.set("toObject", { virtuals: true });
projectSchema.set("toJSON", { virtuals: true });

const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;
