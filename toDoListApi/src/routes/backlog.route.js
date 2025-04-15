import { Router } from 'express';
import { Backlog } from '../models/backlog.model.js';

export const backlogRoute = Router();

backlogRoute.get('/', async (req, res) => {
	try {
		const backlog = await Backlog.find();
		res.json(backlog);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

backlogRoute.post('/addbacklog', async (req, res) => {
	try {
		if (!req.body) {
			return res.status(400).json({ message: 'Faltan parametros' });
		}

		const { tareas } = req.body;
		const addBacklog = new Backlog({
			tareas,
		});
		addBacklog.save();
		res.json(addBacklog);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

backlogRoute.put('/backlog/addtask/:taskId', async (req, res) => {
	try {
		if (!addTaskToBacklog) {
			return res.status(404).json({ message: 'No existe backlog' });
		}

		const { taskId } = req.params;

		const addTaskToBacklog = await Backlog.findOne();

		if (!taskId) {
			return res
				.status(400)
				.json({ message: 'No se encuentra tarea con ese ID' });
		}

		if (!addTaskToBacklog.tareas.includes(taskId)) {
			addTaskToBacklog.tareas.push(taskId);
			await addTaskToBacklog.save();
		}

		res.json(addTaskToBacklog);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
