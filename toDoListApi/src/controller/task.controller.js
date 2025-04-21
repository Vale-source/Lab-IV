import { Task } from "../models/task.model";

export const getTaskId = async (req, res, next) => {
	let task;
	const { id } = req.params;

	if (!id || id.match(/^[0-9a-fA-F]{24}$/)) {
		res.status(400).json({ messsage: "No se encuentra task con ese id" });
	}

    task = Task.findById(id)
    res.task = task
    next()
};
