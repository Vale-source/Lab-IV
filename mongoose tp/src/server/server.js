import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import { User } from '../Schemas/User.js';
import dotenv from 'dotenv';

dotenv.config();

const userDB = process.env.MONGO_USER;
const passwordDB = process.env.MONGO_PASS;
const port = process.env.PORT;

export const createServer = () => {
	const app = express();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	mongoose
		.connect(
			`mongodb://${userDB}:${passwordDB}@localhost:27017/aplicacion?authSource=admin`,
		)
		.then('Conexion exitosa')
		.catch('Error al conectarse');

	app.get('/user', async (req, res) => {
		const data = await User.find();
		res.send(data);
	});

	app.post('/adduser', async (req, res) => {
		try {
			const user = new User({
				name: req.body.name,
				age: req.body.age,
				email: req.body.email,
			});

			await user
				.save()
				.then('Usuario creado con exito')
				.catch((err) => {
					console.error(err);
				});

			res.send(user);
		} catch (err) {
			console.error(err);
			res.status(500).send('Error interno');
		}
	});

	app.listen(port, () => {
		console.log(`Servidor levantado en el puerto ${port}`);
	});
};
