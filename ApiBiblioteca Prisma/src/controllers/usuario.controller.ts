import { NextFunction, Request, Response } from 'express';
import * as usuarioService from '../services/usuario.service';
import { UsuarioType, UsuarioInterface } from 'src/models/usuario.types';

export const getUsuariosController = async (
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const usuario = await usuarioService.getUsuarios();
		res.json(usuario);
	} catch (error: any) {
		next(error);
	}
};

export const getUsuarioByIdController = async (
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { usuarioId } = _req.query;

		if (typeof usuarioId !== 'string') {
			throw new Error();
		}

		const usuario = await usuarioService.getUsuarioById(usuarioId);
		res.status(200).json({ data: usuario });
	} catch (error: any) {
		next(error);
	}
};

export const createUsuarioController = async (
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { nombre, email, password } = _req.body as UsuarioType;

		const data: UsuarioType = { nombre, email, password };

		const newUsuario = await usuarioService.createUsuario(data);

		res.status(201).json({ message: 'Usuario creado', data: newUsuario });
	} catch (error: any) {
		next(error);
	}
};

export const updateUsuarioController = async (
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { nombre, email, password } =
			_req.body as Partial<UsuarioInterface>;

		const data: Partial<UsuarioInterface> = { nombre, email, password };

		const { usuarioId } = _req.query;

		if (typeof usuarioId !== 'string') {
			throw new Error();
		}

		const findUsuario = await usuarioService.getUsuarioById(usuarioId);

		const updateUsuario: UsuarioInterface =
			await usuarioService.editUsuario(findUsuario.id, data);

		res
			.status(200)
			.json({ message: 'Usuario actualizado', data: updateUsuario });
	} catch (error: any) {
		next(error);
	}
};

export const deleteUsuarioController = async (
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { usuarioId } = _req.query;

		if (typeof usuarioId !== 'string') {
			throw new Error();
		}

		const findUsuario: UsuarioInterface =
			await usuarioService.getUsuarioById(usuarioId);

		const deleteUsuario: UsuarioInterface =
			await usuarioService.deleteUsuario(findUsuario.id);

		res
			.status(200)
			.json({
				message: 'Usuario eliminado con éxito',
				data: deleteUsuario,
			});
	} catch (error: any) {
		next(error);
	}
};
