import { Types } from "mongoose";
import { Author } from "../models/Author.js";
import { Book } from "../models/Book.js";

export const getAllAuthors = async (req, res, next) => {
	const auth = await Author.find().populate("books");

	res.author = auth;
	next();
};

export const getAuthorById = async (req, res, next) => {
	const { authorId } = req.query;

	const auth = await Author.findById(authorId).populate("books");
	res.author = auth;
	next();
};

export const addAuthor = async (req, res, next) => {
	const { nombre, bio, fechaNacimiento, nacionalidad, libros } = req.body;
	const authorBody = { nombre, bio, fechaNacimiento, nacionalidad, libros };

	const auth = await Author.create(authorBody);
	res.author = auth;
	next();
};

export const editAuthor = async (req, res, next) => {
	const { authorId } = req.query;
	const { nombre, bio, fechaNacimiento, nacionalidad, libros } = req.body;
	const authorBody = { nombre, bio, fechaNacimiento, nacionalidad, libros };

	const auth = await Author.findByIdAndUpdate(authorId, authorBody, { new: true });
	res.author = auth;
	next();
};

export const deleteAuthor = async (req, res, next) => {
	const { authorId } = req.query;

	const auth = await Author.findByIdAndDelete(authorId);
	res.author = auth;
	next();
};

export const addBookToAuthorList = async (req, res, next) => {
	const { authorId, bookId } = req.query;

    if (!bookId || Types.ObjectId.isValid(bookId) ) {
        return res.status(404).json({ message: "No existe o no se encontro ese libro" })
    }

	const auth = await Author.findOneAndUpdate(
		{ _id: authorId },
		{ $push: { books: { bookId } } },
		{ new: true }
	);

    const books = await Book.findById(bookId)

    res.author = auth
    res.book = books
    next()
};

