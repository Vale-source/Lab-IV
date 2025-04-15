import express from 'express';
import { Router } from 'express';
import { Task } from '../models/task.model';
import { Sprint } from '../models/sprint.model';

export const taskRoute = Router();

taskRoute.get('/', async (req, res) => {
	try {
		const task = await Task.find();
		res.json(task);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

taskRoute.get('/tasks/:id', async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);

		if (!task) {
			return res.status(400).json({ message: 'No se encontro tarea con ese ID' });
		}

		res.json(task);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

taskRoute.post('/addtask', async (req, res) => {
	try {
		if (!req.body) {
			return res.status(400).json({ message: 'Faltan parametros' });
		}
		const { titulo, descripcion, estado, fechaLimite, color } = req.body;
		const task = new Task({
			titulo,
			descripcion,
			estado,
			fechaLimite,
			color,
		});

		task.save();
		res.json(task);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

taskRoute.put('/edittask/:id', async (req, res) => {
	try {
		if (!req.body) {
			return res
				.status(400)
				.json({ message: 'No se han enviados datos para actualizar' });
		}
		const edittask = await Task.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			},
		);

		if (!edittask) {
			return res
				.status(404)
				.json({ message: 'No se encontro tarea para actualizar' });
		}

		res.json(edittask);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

taskRoute.delete('/deletetask/:id', async (req, res) => {
	try {
		const taskInSprint = Sprint.findOne({ tareas: id });

		if (taskInSprint) {
			return res
				.json(400)
				.json({
					message:
						'No se puede eliminar tarea porque esta asignada a un Sprint',
				});
		}

		const { id } = req.params;
		const deletetask = await Task.findByIdAndDelete(id);

		if (!deletetask) {
			return res
				.status(404)
				.json({ message: 'No se encontro tarea para eliminar' });
		}

		res.status(200).json({ message: 'Tarea eliminada correctamente', task: deletedTask });
	} catch (error) {
		res.status(500).json({ error: message.error });
	}
});

taskRoute.get("/tasks", async (req, res) => {
	try {
		const state = req.query.estado

		const filterState = await Task.find({ estado: state })

		res.json(filterState)
	} catch (error) {
		res.status(500).json({ error: message.error });
	}
})

taskRoute.get("/tasksdate", async (req, res) => {
	try {
		const filterDate = await Task.find().sort({ fechaLimite: -1})

		res.json(filterDate)

	} catch (error) {
		res.status(500).json({ error: message.error });

	}
})