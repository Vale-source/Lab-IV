import { Router } from "express";

export const projectRoute = Router()

projectRoute.get("/projects")
projectRoute.get("/projects") //id
projectRoute.post("/addproject")
projectRoute.put("/editproject") //id
projectRoute.delete("/deleteproject") //id
projectRoute.put("/projects/add-researcher") //projectId, researcherId