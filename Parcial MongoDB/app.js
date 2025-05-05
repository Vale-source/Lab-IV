import bodyParser from "body-parser";
import express from "express";
import { authorRoute } from "./src/routes/author.route.js";
import { bookRoute } from "./src/routes/book.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();

dotenv.config()

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/author", authorRoute);
app.use("/book", bookRoute);

mongoose.connect(DB_URL).then(console.log("Conectado a la base de datos")).catch((err) => console.error(err))

app.listen(PORT,()=> console.log("Escuchando al puerto 3000"));
