import { Router } from 'express';
import { Sprint } from '../models/sprint.model';

export const sprintRoute = Router();

sprintRoute.get('/', async (req, res) => {
	try {
		const sprint = await Sprint.find();
		res.json(sprint);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

sprintRoute.get('/sprint/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const sprintID = await Sprint.findById(id);

		if (!sprintID) {
			return res
				.status(400)
				.json({ message: 'No se encuentra Sprint con ese ID' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

sprintRoute.post('/addsprint', async (req, res) => {
	try {
		if (!req.body) {
			return res.status(400).json({ message: 'Faltan parametros' });
		}

		const { fechaInicio, fechaCierre, tareas, color } = req.body;
		const sprint = new Sprint({
			fechaInicio,
			fechaCierre,
			tareas,
			color,
		});
		sprint.save();
		res.json(sprint);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

sprintRoute.put('/editsprint/:id', async (req, res) => {
	try {
		if (!req.body) {
			return res
				.status(400)
				.json({ message: 'No se han enviado datos para actualizar' });
		}

		const { id } = req.params;
		const editSprint = await Sprint.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		if (!editSprint) {
			return res.status(404).json({
				message: 'No se encontro sprint con ese ID para actualizar',
			});
		}

		res.json(editSprint);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

sprintRoute.delete('/deletesprint/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const deleteSprint = await Sprint.findByIdAndDelete(id);

		if (!deleteSprint) {
			return res.status(404).json({
				message: 'No se encontro sprint con ese ID para eliminar',
			});
		}
		res.status(200).json({ message: 'Tarea eliminada exitosamente' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

sprintRoute.put('/sprints/:id/addtask/:taskId', async (req, res) => {
	try {
		const { id, taskId } = req.params;

		const addTaskToSprint = await Sprint.findByIdAndUpdate(
			id,
			{ $push: { tareas: taskId } },
			{ new: true },
		);

		if (!addTaskToSprint) {
			return res
				.status(404)
				.json({ message: 'No se encotro sprint con ese ID' });
		}

		if (!taskId) {
			return res
				.status(404)
				.json({ message: 'No se encontro tarea con ese ID' });
		}
		res.status(200).json({ message: 'Tarea eliminada exitosamente' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
