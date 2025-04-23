import mongoose, { Schema } from 'mongoose';

const taskSchema = new Schema({
	titulo: {
		type: String,
		required: true,
	},
	descripcion: {
		type: String,
	},
	estado: {
		type: String,
		enum: ['pendiente', 'en_progreso', 'completado'],
		require: true
	},
	fechaLimite: {
		type: Date,
		require: true,
	},
	color: {
		type: String
	}
});

export const Task = mongoose.model("Task", taskSchema)