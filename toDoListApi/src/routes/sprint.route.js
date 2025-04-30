import { Router } from 'express';
import {
	addSprint,
	createTaskInSprint,
	deleteSprint,
	editSprint,
	getSprintById,
	getSprints,
	showTaskInSprint,
} from '../controller/sprint.controller.js';

export const sprintRoute = Router();

sprintRoute.get('/', getSprints, async (req, res) => {
	try {
		res.json(res.sprint);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

sprintRoute.get('/sprintbyid', getSprintById, async (req, res) => {
	try {
		res.status(200).json(res.sprint);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

sprintRoute.post('/addsprint', addSprint, async (req, res) => {
	try {
		res.status(200).json({
			message: 'Sprint creado correctamente',
			sprint: res.sprint,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

sprintRoute.put('/editsprint', editSprint, async (req, res) => {
	try {
		res.status(200).json({
			message: 'Sprint editado correctamente',
			sprint: res.sprint,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

sprintRoute.delete('/deletesprint', deleteSprint, async (req, res) => {
	try {
		res.status(200).json({
			message: 'Sprint eliminado correctamente',
			sprintEliminado: res.deletedSprint,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

sprintRoute.put(
	'/sprints/addtask',
	createTaskInSprint,
	async (req, res) => {
		try {
			res.status(200).json({
				message: 'Tarea agregada al sprint correctamente',
				sprint: res.sprint,
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
);

sprintRoute.get('/taskbysprintid', showTaskInSprint, async (req,res) => {
	try {
		res.status(200).json({
			message: "Tareas del sprint traidas correctamente",
			sprint: res.sprint,
		})
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
})
