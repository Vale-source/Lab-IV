import { Router } from 'express';
import { addBacklog, addTaskToBacklog, getBacklogs } from '../controller/backlog.controller.js';

export const backlogRoute = Router();

backlogRoute.get('/', getBacklogs, async (req, res) => {
	try {
		res.json(res.backlog);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

backlogRoute.post('/addbacklog', addBacklog, async (req, res) => {
	try {
		res.status(200).json({
			message: 'Backlog creado correctamente',
			backlog: res.backlog,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

backlogRoute.put('/taskinbacklog/addtask/', addTaskToBacklog, async (req, res) => {
	try {
		if (res.taskAdded) {
			res.status(200).json({
				message: 'Tarea agregada correctamente',
				backlog: res.backlog,
			});
		} else {
			res.status(200).json({
				message: 'La tarea ya estaba en el backlog',
				backlog: res.backlog,
			});
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
