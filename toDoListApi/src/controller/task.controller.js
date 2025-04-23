import mongoose from 'mongoose';
import { Task } from '../models/task.model.js';
import { Sprint } from '../models/sprint.model.js';

export const getTasks = async (req, res, next) => {
	const task = await Task.find();
	res.task = task;
	next();
};

export const getTaskId = async (req, res, next) => {
	let task;
	const { id } = req.query;

	if (!id || !mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ messsage: 'No se encuentra task con ese id' });
	}

	task = await Task.findById(id);
	res.task = task;
	next();
};

export const addTask = async (req, res, next) => {
	let newTask;

	if (!req.body) {
		return res.status(400).json({ message: 'Faltan parametros' });
	}

	const { titulo, descripcion, estado, fechaLimite, color } = req.body;
	const task = {
		titulo,
		descripcion,
		estado,
		fechaLimite,
		color,
	};

	newTask = await Task.create(task);
	res.task = newTask;
	next();
};

export const editTask = async (req, res, next) => {
	let task;

	if (!req.body) {
		return res
			.status(400)
			.json({ message: 'No se han enviados datos para actualizar' });
	}
	const updateTask = await Task.findByIdAndUpdate(
		req.query.id,
		req.body,
		{
			new: true,
		},
	);

	if (!updateTask) {
		return res
			.status(404)
			.json({ message: 'No se encontro tarea para actualizar' });
	}

	task = updateTask;
	res.task = task;
	next();
};

export const deleteTaskById = async (req, res, next) => {
	const { id } = req.query;

	const taskInSprint = await Sprint.findOne({ tareas: id });

	if (taskInSprint) {
		return (res.deleted = false);
	}

	const deletetask = await Task.findByIdAndDelete(id);

	if (!deletetask) {
		return res
			.status(404)
			.json({ message: 'No se encontro tarea para eliminar' });
	}

	res.deleted = true;
	res.task = deletetask
	next();
};

export const getTaskByEstado = async (req, res, next) => {
	let task;

	const state = req.query.estado;

	const filterState = await Task.find({ estado: state });

	task = filterState;
	res.task = task;
	next();
};

export const getTaskByFecha = async (req, res, next) => {

	const filterDate = await Task.find().sort({ fechaLimite: -1 });

	const newArrayDate = filterDate.map((e) => {
		return {
			...e.toObject(),
			fechaLimite: e.fechaLimite.toLocaleDateString('es-AR')
		}
	})

	res.task = newArrayDate
	next();
};
