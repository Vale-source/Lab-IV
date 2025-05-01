import mongoose from "mongoose";
import { Sprint } from "../models/sprint.model.js";
import { Backlog } from "../models/backlog.model.js";

export const getSprints = async (req, res, next) => {
	const sprint = await Sprint.find().populate("tareas");
	res.sprint = sprint;
	next();
};

export const getSprintById = async (req, res, next) => {
	let sprint;

	const { id } = req.query;

	if (!id || !mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({ messsage: "No se encuentra task con ese id" });
	}

	sprint = await Sprint.findById(id);
	res.sprint = sprint;
	next();
};

export const addSprint = async (req, res, next) => {
	let newSprint;

	if (!req.body) {
		return res.status(400).json({ message: "Faltan parametros" });
	}

	const { nombre, fechaInicio, fechaCierre, tareas } = req.body;
	const sprint = {
		nombre,
		fechaInicio,
		fechaCierre,
		tareas,
	};

	newSprint = await Sprint.create(sprint);
	res.sprint = newSprint;
	return res.status(201).json(newSprint);
};

export const editSprint = async (req, res, next) => {
	if (!req.body) {
		return res
			.status(400)
			.json({ message: "No se han enviado datos para actualizar" });
	}

	const { id } = req.query;
	const updateSprint = await Sprint.findByIdAndUpdate(id, req.body, {
		new: true,
	});

	if (!updateSprint) {
		return res.status(404).json({
			message: "No se encontro sprint con ese ID para actualizar",
		});
	}

	res.sprint = updateSprint;
	next();
};

export const deleteSprint = async (req, res, next) => {
	const { id } = req.query;

	if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).json({
			message: "ID no válido o no proporcionado",
		});
	}

	const deletedSprint = await Sprint.findByIdAndDelete(id);

	if (!deletedSprint) {
		return res.status(404).json({
			message: "No se encontró un sprint con ese ID para eliminar",
		});
	}

	res.deleted = true;
	res.deletedSprint = deletedSprint;
	next();
};

export const createTaskInSprint = async (req, res, next) => {
	try {
		const { id, taskId } = req.query;

		if (!id || !taskId) {
			return res.status(400).json({
				message: "Faltan parámetros: id de sprint o id de tarea",
			});
		}

		const searchBacklog = await Backlog.findOne();
		if (searchBacklog?.tareas.includes(taskId)) {
			await Backlog.updateOne(
				{ _id: searchBacklog._id },
				{ $pull: { tareas: taskId } }
			);
		}

		const updatedSprint = await Sprint.findByIdAndUpdate(
			id,
			{ $push: { tareas: taskId } },
			{ new: true }
		);

		if (!updatedSprint) {
			return res.status(404).json({
				message: "No se encontró sprint con ese ID",
			});
		}

		res.sprint = updatedSprint;
		next();
	} catch (error) {
		console.error("Error en createTaskInSprint:", error);
		res.status(500).json({ message: "Error interno del servidor" });
	}
};


export const showTaskInSprint = async (req, res, next) => {
	const { sprintId } = req.query;

	if (!sprintId) {
		return res.status(404).json({
			message: "No se encontro sprint con ese ID",
		});
	}

	const getTasksbySprintId = await Sprint.findById(sprintId).populate("tareas");

	res.sprint = getTasksbySprintId;
	next();
};
