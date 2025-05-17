import { Prisma } from '@prisma/client';
import {
	ErrorRequestHandler,
} from 'express';

export const errorRequestHandler: ErrorRequestHandler = (
	err,
	req,
	res,
	next,
) => {
	console.error(err);

	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		switch (err.code) {
			case 'P2001':
				res.status(404).json({ error: 'El recurso no fue encontrado' });
				return;
			case 'P2002':
				res.status(409).json({ error: 'Valor único duplicado' });
				return;
			case 'P2004':
				res.status(400).json({ error: 'Tipo de dato incorrecto' });
				return;
			case 'P2007':
				res.status(400).json({ error: 'Campo mal tipado' });
				return;
			case 'P2011':
				res.status(400).json({ error: 'Campo obligatorio no definido' });
				return;
			case 'P2012':
				res.status(400).json({ error: 'Valor nulo en campo obligatorio' });
				return;
			case 'P2025':
				res.status(404).json({ error: 'No se encontró el recurso' });
				return;
			default:
				res.status(400).json({ error: `Error de Prisma: ${err.message}` });
				return;
		}
	}

	res.status(500).json({ error: 'Error interno del servidor' });
};
