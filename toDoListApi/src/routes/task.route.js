import { Router } from "express";
import {
	addTask,
	deleteTaskById,
	editTask,
	getTaskByEstado,
	getTaskByFecha,
	getTaskId,
	getTasks,
} from "../controller/task.controller.js";
import { addTaskToBacklog } from "../controller/backlog.controller.js";

export const taskRoute = Router();

taskRoute.get("/", getTasks, async (req, res) => {
	try {
		res.json(res.task);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

taskRoute.get("/taskbyid", getTaskId, async (req, res) => {
	try {
		res.status(200).json(res.task);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

taskRoute.post("/addtask", addTask, addTaskToBacklog, async (req, res) => {
	try {
		res.status(200).json({
			task: res.task
		}); 
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

taskRoute.put("/edittask", editTask, async (req, res) => {
	try {
		res.status(200).json({
			message: "Tarea editada correctamente",
			task: res.task,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

taskRoute.delete("/deletetask", deleteTaskById, async (req, res) => {
	try {
		if (!res.deleted) {
			res.json(400).json({
				message: "No se puede eliminar tarea porque esta asignada a un Sprint",
			});
		}

		res.status(200).json({
			message: "Tarea eliminada correctamente",
			task: res.task,
		});
	} catch (error) {
		res.status(500).json({ error: message.error });
	}
});

taskRoute.get("/taskbyestado", getTaskByEstado, async (req, res) => {
	try {
		res.status(200).json({
			message: `Tareas ${req.query.estado}`,
			task: res.task,
		});
	} catch (error) {
		res.status(500).json({ error: message.error });
	}
});

taskRoute.get("/tasksdate", getTaskByFecha, async (req, res) => {
	try {
		res.status(200).json({
			message: "Tareas ordenadas por fecha (descendente)",
			task: res.task,
		});
	} catch (error) {
		res.status(500).json({ error: message.error });
	}
});
