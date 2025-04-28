import mongoose, { Schema, Types } from "mongoose";

const PublicationSchema = new Schema({
	titulo: {
		type: String,
		require: true,
	},
	resumen: {
		type: String,
	},
	fechaPublicacion: {
		type: Date,
		require: true,
	},
	proyectoRelacionado: {
		type: Types.ObjectId,
		ref: "Project",
		default: null,
	},
	autores: [
		{
			type: Types.ObjectId,
			ref: "Researcher",
			default: [],
		},
	],
});

export const Publication = mongoose.model("Publication", PublicationSchema)
