import mongoose, { Schema, Types } from "mongoose";

const ResearcherSchema = new Schema({
	nombre: {
		type: String,
		require: true,
	},
	especialidad: {
		type: String,
	},
	email: {
		type: String,
		require: true,
	},
	proyectos: [
		{
			type: Types.ObjectId,
			ref: "Project",
			default: [],
		},
	],
});

export const Researcher = mongoose.model("Researcher", ResearcherSchema);
