import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { backlogRoute } from './routes/backlog.route';
import { sprintRoute } from './routes/sprint.route';
import { taskRoute } from './routes/task.route';

dotenv.config();
const app = express();

const port = process.env.PORT;
const mongoDB = process.env.DB_URL;

mongoose
	.connect(mongoDB)
	.then(() => console.log('Conexion a la base de datos exitosa'))
	.catch((err) => console.error('Fallo al conectarse', err));

app.use("/backlog", backlogRoute)
app.use("/sprint", sprintRoute)
app.use("/task", taskRoute)

app.listen(port,() => {
	console.log(`Servidor corriendo en el puerto ${port}`);
})
