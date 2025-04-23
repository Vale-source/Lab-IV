import { Backlog } from '../models/backlog.model.js';

export const getBacklogs = async (req, res, next) => {
	const backlog =  await Backlog.find()
	res.backlog = backlog
	next()
}

export const addBacklog = async (req, res, next) => {
	let backlog;

	if (!req.body) {
		return res.status(400).json({ message: 'Faltan parametros' });
	}

	const { tareas } = req.body;

	backlog = await Backlog.create({ tareas });

	res.backlog = backlog;

	next();
};

export const addTaskToBacklog = async (req, res, next) => {
	const { taskId } = req.query;

	if (!taskId) {
		return res
			.status(400)
			.json({ message: 'No se encuentra tarea con ese ID' });
	}

	const getBacklogTask = await Backlog.findOne();

	if (!getBacklogTask) {
		return res.status(404).json({ message: 'No existe backlog' });
	}

	let wasAdded = false;

	if (!getBacklogTask.tareas.includes(taskId)) {
		getBacklogTask.tareas.push(taskId);
		await getBacklogTask.save();
		wasAdded = true;
	}

	res.backlog = getBacklogTask;
	res.taskAdded = wasAdded;
	next();
};
