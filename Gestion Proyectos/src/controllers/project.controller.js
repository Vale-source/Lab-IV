import { Schema } from "mongoose";
import { Project } from "../models/Project";
import { Researcher } from "../models/Researcher";

export const getAllProjects = async (req, res, next) => {
	const projects = await Project.find().populate("investigadores");

	res.project = projects;
	next();
};

export const getProjectsById = async (req, res, next) => {
	const { projectId } = req.query;

	const projects = await Project.findById(projectId);

	res.project = projects;
	next();
};

export const addProject = async (req, res, next) => {
	const projectBody = (({
		nombre,
		descripcion,
		fechaInicio,
		fechaFinal,
		estado,
		investigadores,
	}) => ({
		nombre,
		descripcion,
		fechaInicio,
		fechaFinal,
		estado,
		investigadores,
	}))(req.body);

	const newProject = await Project.create(projectBody);
	res.project = newProject;
	next();
};

export const editProject = async (req, res, next) => {
	const { projectId } = req.query;

	const projectBody = (({
		nombre,
		descripcion,
		fechaInicio,
		fechaFinal,
		estado,
		investigadores,
	}) => ({
		nombre,
		descripcion,
		fechaInicio,
		fechaFinal,
		estado,
		investigadores,
	}))(req.body);

	const updateProject = await Project.findByIdAndUpdate(
		projectId,
		projectBody,
		{
			new: true,
		}
	);

	res.project = updateProject;
	next();
};

export const addResearcherToProject = async (req, res, next) => {
	const { researcherId, projectId } = req.query;

	const addResearcher = await Project.findByIdAndUpdate(
		projectId,
		{ $push: { tareas: researcherId } },
		{ new: true }
	);

	const addProject = await Researcher.findByIdAndUpdate(
		researcherId,
		{ $push: { proyectos: projectId } },
		{ new: true }
	);

	res.project = addResearcher;
	res.researcher = addProject;
	next();
};

export const deleteProject = async (req, res, next) => {
	const projects = res.project;

	const delProject = await Project.deleteOne({ _id: projects._id });

	await Researcher.updateMany(
		{ proyectos: projects._id },
		{ $pull: { proyectos: projects._id } }
	);

	res.project = delProject;
};
