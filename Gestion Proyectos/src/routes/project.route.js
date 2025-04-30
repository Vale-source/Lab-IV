import { Router } from "express";
import { getAllProjects } from "../controllers/project.controller";

export const projectRoute = Router();

projectRoute.get("/projects", getAllProjects, async (req, res) => {
	try {
		res.status(200).json({ message: "Tarea creada correctamente" }, proyecto = res.project);
	} catch (error) {}
});
projectRoute.get("/projects"); //id
projectRoute.post("/addproject");
projectRoute.put("/editproject"); //id
projectRoute.delete("/deleteproject"); //id
projectRoute.put("/projects/add-researcher"); //projectId, researcherId
