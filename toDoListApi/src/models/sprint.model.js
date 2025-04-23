import mongoose, { Schema, Types } from 'mongoose';

const sprintSchema = new Schema({
	fechaInicio: {
		type: Date,
		required: true,
	},
	fechaCierre: {
		type: Date,
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