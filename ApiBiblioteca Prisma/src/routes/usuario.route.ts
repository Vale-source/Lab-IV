import { Router } from "express";
import * as usuarioController from "../controllers/usuario.controller";

export const usuarioRoute = Router();

usuarioRoute
	.get("/usuarios", usuarioController.getUsuariosController)
	.get("/usuario-by-id", usuarioController.getUsuarioByIdController)
	.post("/usuarios/register", usuarioController.createUsuarioController)
	.put("/edit-usuario", usuarioController.updateUsuarioController)
	.delete("/delete-usuario", usuarioController.deleteUsuarioController);
