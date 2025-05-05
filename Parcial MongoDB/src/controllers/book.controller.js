import { Author } from "../models/Author.js";
import { Book } from "../models/Book.js";

export const getAllBooks = async (req, res, next) => {
	const books = await Book.find();

	res.book = books;
	next();
};

export const getBookById = async (req, res, next) => {
	const { bookId } = req.query;
	const books = await Book.findById(bookId);

	res.book = books;
	next();
};

export const addBook = async (req, res, next) => {
	const { titulo, resumen, genero, publicacion, disponible } = req.body;
	const bookBody = { titulo, resumen, genero, publicacion, disponible }

    if (!bookBody) {
        return res.status(400).json({ message: "No se puede crear el libro porque faltan parametro" })
    }

	const newBook = await Book.create(bookBody);
	res.book = newBook;
	next();
};

export const editBook = async (req, res, next) => {
	const { bookId } = req.query;

	const { titulo, resumen, genero, publicacion, disponible } = req.body;
	const bookBody = { titulo, resumen, genero, publicacion, disponible }

    if (!bookBody) {
        return res.status(400).json({ message: "Parametro editado de forma erronea o faltan campos" })
    }

	const books = await Book.findByIdAndUpdate(bookId, bookBody, { new: true });

	res.book = books;
	next();
};

export const deleteBook = async (req, res, next) => {
	const { bookId } = req.query;

	const findBookInAuthorList = await Author.findOne({ books: { $in: bookId } });

	if (findBookInAuthorList) {
		return res.status(400).json({ message: "El libro no se puede eliminar porque pertenece a la lista de un autor" });
	}

	const books = await Book.findByIdAndDelete(bookId);

	if (!books) {
		return res.status(404).json({ message: "Libro no encontrado" });
	}

	res.book = books;
	next();
};
