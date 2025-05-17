import prisma from "../../prisma/client"

import { UsuarioInterface, UsuarioType } from "src/models/usuario.types";

export const getUsuarios = () => {
	return prisma.usuario.findMany();
}

export const getUsuarioById = (usuarioId: string) => {
	return prisma.usuario.findUniqueOrThrow({
		where: {
			id: usuarioId,
		}
	})
}

export const createUsuario = (data: UsuarioType) => {
	return prisma.usuario.create({ data })
}

export const editUsuario = (usuarioId: string, dataToUpdate: Partial<UsuarioInterface>) => {
	return prisma.usuario.update({
		where: {
			id: usuarioId,
		},
		data: dataToUpdate
	})
}

export const deleteUsuario = (usuarioId: string) => {
	return prisma.usuario.delete({
		where: {
			id: usuarioId
		}
	})
}