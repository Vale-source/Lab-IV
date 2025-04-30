import { Backlog } from "../models/backlog.model.js";

export const getBacklogs = async (req, res, next) => {
	const backlog = await Backlog.findOne().populate("tareas");

	if (!backlog) {
		res.status(404).json({
			message: "No existe backlog",
		});
	}

	res.backlog = backlog;
	next();
};

export const addBacklog = async (req, res, next) => {
	let backlog;

	if (!req.body) {
		return res.status(400).json({ message: "Faltan parametros" });
	}

	const { tareas } = req.body;

	backlog = await Backlog.create({ tareas });

	res.backlog = backlog;

	next();
};

export const addTaskToBacklog = async (req, res, next) => {
	const task = res.task

	if (!task) {
		return res.status(400).json({ message: "No hay tarea para agregar" });
	}

	const getBacklogTask = await Backlog.findOneAndUpdate(
		{},
		{ $push: { tareas: task._id } },
		{ new: true }
	);

	res.backlog = getBacklogTask;
	next();
};

export const initialBacklog = async () => {
	try {
		const backlog = await Backlog.findOne();
		if (!backlog) {
			await Backlog.create({ tareas: [] });
			console.log("Backlog creado correctamente");
		} else {
			console.log("Ya exisita un backlog anteriormente");
		}
	} catch (error) {
		console.error(
			"No se pudo crear el backlog al levantar la base de datos",
			error
		);
	}
};

