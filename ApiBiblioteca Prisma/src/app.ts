import express from "express";
import { usuarioRoute } from "../src/routes/usuario.route"
import { errorRequestHandler } from "./middlewares/errorRequestHandler";

const app = express()

app.use(express.json())
app.use("/api", usuarioRoute)
app.use(errorRequestHandler)
console.log("App iniciada");
export default app