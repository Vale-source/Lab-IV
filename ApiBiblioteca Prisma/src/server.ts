import prisma from '../prisma/client';
import { errorDatabaseHandler } from './middlewares/errorDatabaseHandler';
import app from './app';
import { config as configDotenv } from 'dotenv';


configDotenv();

const startServer = async () => {
	const PORT = process.env.PORT || 3000;

	try {
		await prisma.$connect();
		console.log('Base de datos conectada correctamente');

		app.listen(PORT, () => {
			console.log(`Servidor escuchando en http://localhost:${PORT}`);
		});
	} catch (error: any) {
		const { status, message } = errorDatabaseHandler(error);
		console.error(
			`Error conectando DB - Status: ${status} - Mensaje: ${message}`,
		);
		process.exit(1);
	}
};


startServer();
