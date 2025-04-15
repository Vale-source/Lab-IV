import mongoose, { Schema, Types } from 'mongoose';

const backlogSchema = new Schema({
	tareas: [
		{
			type: Types.ObjectId,
			ref: 'Task',
			default: [],
		},
	],
});

export const Backlog = mongoose.model("Backlog", backlogSchema)