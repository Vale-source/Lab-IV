import mongoose, { Schema, Types } from 'mongoose';

const sprintSchema = new Schema({
	nombre: {
		type: String,
		required: true,
	},
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
	
});

export const Sprint = mongoose.model("Sprint", sprintSchema)