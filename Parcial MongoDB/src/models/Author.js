import mongoose, { Schema, Types } from "mongoose";

const AuthorSchema = new Schema({
	nombre: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
	},
	fechaNacimiento: {
		type: Date,
		required: true,
	},
	nacionalidad: {
		type: String,
		required: true,
	},
	libros: [
		{
			type: Types.ObjectId,
			ref: "Book",
			default: [],
		},
	],
});

export const Author = mongoose.model("Author", AuthorSchema)