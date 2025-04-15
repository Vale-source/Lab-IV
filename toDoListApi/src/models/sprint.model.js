import mongoose, { Schema, Types } from 'mongoose';

const sprintSchema = new Schema({
	fechaInicio: {
		type: String,
		required: true,
	},
	fechaCierre: {
		type: String,
		required: true,
	},
	tareas: [
		{
			type: Types.ObjectId,
			ref: 'Task',
			default: [],
		},
	],
	color: {
		type: String,
	},
});

export const Sprint = mongoose.model("Sprint", sprintSchema)