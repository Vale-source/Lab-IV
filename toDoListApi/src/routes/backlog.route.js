import { Router } from "express";
import {
	addBacklog,
	deleteTaskFromBacklog,
	getAllTasksFromBacklog,
	getBacklogs,
} from "../controller/backlog.controller.js";

export const backlogRoute = Router();

backlogRoute.get("/", getBacklogs, async (req, res) => {
	try {
		res.json(res.backlog);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

backlogRoute.post("/addbacklog", addBacklog, async (req, res) => {
	try {
		res.status(200).json({
			message: "Backlog creado correctamente",
			backlog: res.backlog,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

backlogRoute.get(
	"/getalltasksfrombacklog",
	getAllTasksFromBacklog,
	async (req, res) => {
		try {
			res.status(200).json({
				tasks: res.backlog,
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
);

backlogRoute.delete(
	"/deletetaskfrombacklog",
	deleteTaskFromBacklog,
	async (req, res) => {
		try {
			res.status(200).json({
				message: "Tarea eliminada correctamente",
				backlog: res.backlog,
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
);
