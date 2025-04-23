import mongoose from 'mongoose';
import { Sprint } from '../models/sprint.model.js';

export const getSprints = async (req, res, next) => {
	const sprint = await Sprint.find();
	res.sprint = sprint
	next()
}

export const getSprintById = async (req, res, next) => {
	let sprint;

	const { id } = req.query;

	if (!id || !mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({ messsage: 'No se encuentra task con ese id' });
	}

	sprint = await Sprint.findById(id);
	res.sprint = sprint;
	next();
};

export const addSprint = async (req, res, next) => {
	let newSprint;

	if (!req.body) {
		return res.status(400).json({ message: 'Faltan parametros' });
	}

	const { fechaInicio, fechaCierre, tareas, color } = req.body;
	const sprint = {
		fechaInicio,
		fechaCierre,
		tareas,
		color,
	};

	newSprint = await Sprint.create(sprint);
	res.sprint = newSprint;
	next();
};

export const editSprint = async (req, res, next) => {
	if (!req.body) {
		return res
			.status(400)
			.json({ message: 'No se han enviado datos para actualizar' });
	}

	const { id } = req.query;
	const updateSprint = await Sprint.findByIdAndUpdate(id, req.body, {
		new: true,
	});

	if (!updateSprint) {
		return res.status(404).json({
			message: 'No se encontro sprint con ese ID para actualizar',
		});
	}

	res.sprint = updateSprint;
	next();
};

export const deleteSprint = async (req, res, next) => {
	const { id } = req.query;

	if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).json({
			message: 'ID no válido o no proporcionado',
		});
	}

	const deletedSprint = await Sprint.findByIdAndDelete(id);

	if (!deletedSprint) {
		return res.status(404).json({
			message: 'No se encontró un sprint con ese ID para eliminar',
		});
	}

	res.deleted = true;
	res.deletedSprint = deletedSprint;
	next();
};


export const createTaskInSprint = async (req, res, next) => {
	const { id, taskId } = req.query;

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

	res.sprint = addTaskToSprint;
	next();
};
