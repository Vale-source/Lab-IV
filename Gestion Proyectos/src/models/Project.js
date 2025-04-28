import mongoose, { Schema, Types } from "mongoose";

const ProjectSchema = new Schema({
	nombre: {
		type: String,
		required: true,
	},
	descripcion: {
		type: String,
	},
	fechaInicio: {
		type: Date,
		required: true,
	},
	fechaFinal: {
		type: Date,
		require: true,
	},
	estado: {
		type: String,
		enum: ["propuesta", "en_curso", "finalizado"],
		require: true,
	},
	investigadores: [
		{
			type: Types.ObjectId,
			ref: "Researcher",
			default: [],
		},
	],
});

export const Project = mongoose.model("Project", ProjectSchema);
