import { Router } from "express";
import {
	addAuthor,
	addBookToAuthorList,
	deleteAuthor,
	editAuthor,
	getAllAuthors,
	getAuthorById,
} from "../controllers/author.controller.js";

export const authorRoute = Router();

authorRoute.get("/authors", getAllAuthors, async (req, res) => {
	try {
		res
			.status(200)
			.json({ message: "Autores mostrados correctamente", author: res.author });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

authorRoute.get("/authorbyid", getAuthorById, async (req, res) => {
	//el Id va como query
	try {
		res
			.status(200)
			.json({ message: "Autor obtenido correctamente", author: res.author });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

authorRoute.post("/addauthor", addAuthor, async (req, res) => {
	//el Id va como query
	try {
		res
			.status(200)
			.json({ message: "Autor creado correctamente", author: res.author });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

authorRoute.put("/editauthor", editAuthor, async (req, res) => {
	//el Id va como query
	try {
		res
			.status(200)
			.json({ message: "Autor editado correctamente", author: res.author });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

authorRoute.delete("/deleteauthor", deleteAuthor, async (req, res) => {
	try {
		res
			.status(200)
			.json({
				message: `Autor: ${res.author.nombre} eliminado correctamente`,
				author: res.author,
			});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

authorRoute.put("/authors/addBook", addBookToAuthorList, async (req, res) => {
	try {
		res
			.status(200)
			.json({
				message: `El libro ${res.book.titulo} a la lista de: ${res.author.nombre}`,
				author: res.author,
				book: res.book,
			});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
