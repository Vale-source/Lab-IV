import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { backlogRoute } from './routes/backlog.route.js';
import { sprintRoute } from './routes/sprint.route.js';
import { taskRoute } from './routes/task.route.js';
import bodyParser from 'body-parser';
import dotenvExpand from 'dotenv-expand';

const env = dotenv.config();
dotenvExpand.expand(env)

const app = express();

const port = process.env.PORT;
const mongoDB = process.env.DB_URL;

mongoose
	.connect(mongoDB)
	.then(() => console.log('Conexion a la base de datos exitosa'))
	.catch((err) => console.error('Fallo al conectarse', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/backlog', backlogRoute);
app.use('/sprint', sprintRoute);
app.use('/task', taskRoute);

app.listen(port, () => {
	console.log(`Servidor corriendo en el puerto ${port}`);
});
