import mongoose, { Schema } from "mongoose";

const BookSchema = new Schema({
	titulo: {
		type: String,
		required: true,
	},
	resumen: {
		type: String,
		required: true,
	},
	genero: {
		type: String,
		required: true,
	},
	publicacion: {
		type: Date,
		required: true,
	},
	disponible: {
		type: Boolean,
	},
});

export const Book = mongoose.model("Book", BookSchema);
