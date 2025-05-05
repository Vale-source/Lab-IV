import { Router } from "express";
import { addBook, deleteBook, editBook, getAllBooks, getBookById } from "../controllers/book.controller.js";

export const bookRoute = Router();

bookRoute.get("/books", getAllBooks, async (req, res) => {
	try {
		res
			.status(200)
			.json({ message: "Libros mostrados correctamente", books: res.book });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

bookRoute.get("/booksbyid", getBookById, async (req, res) => { //el Id va como query
	try {
		res
			.status(200)
			.json({ message: "Libro obtenido correctamente", books: res.book });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

bookRoute.post("/addbook", addBook, async (req, res) => {
    try {
        res
			.status(200)
			.json({ message: "Libro creado correctamente", books: res.book });
    } catch (error) {
		res.status(500).json({ message: error.message });
    }
})

bookRoute.put("/editbook", editBook, async (req, res) => { //el Id va como query
    try {
        res
			.status(200)
			.json({ message: "Libro editado correctamente", books: res.book });
    } catch (error) {
		res.status(500).json({ message: error.message });
    }
})

bookRoute.delete("/deletebook", deleteBook, async (req, res) => {// el Id va como query
    try {
        res
			.status(200)
			.json({ message: `Libro ${res.book.titulo} eliminado correctamente`, books: res.book });
    } catch (error) {
		res.status(500).json({ message: error.message });
    }
} )