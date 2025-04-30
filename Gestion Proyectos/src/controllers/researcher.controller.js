import { Project } from "../models/Project";
import { Researcher } from "../models/Researcher";

export const getResearchers = async (req, res, next) => {
	const researchers = await Researcher.find().populate("proyectos");

	res.researcher = researchers;
	next();
};

export const getResearchersById = async (req, res, next) => {
	const { researcherId } = req.query;
	const researchers = await Researcher.findById(researcherId);

	res.researcher = researchers;
	next();
};

export const addResearcher = async (req, res, next) => {
	const researcherBody = ({ nombre, especialidad, email, proyectos }) =>
		({
			nombre,
			especialidad,
			email,
			proyectos,
		}(req.body));

	const researchers = await Researcher.create(researcherBody);
	res.researcher = researchers;
	next();
};

export const editResearcher = async (req, res, next) => {
	const { researcherId } = req.query;

	const researcherBody = ({ nombre, especialidad, email, proyectos }) =>
		({
			nombre,
			especialidad,
			email,
			proyectos,
		}(req.body));

	const researchers = await Researcher.findByIdAndUpdate(
		researcherId,
		researcherBody,
		{ new: true }
	);

	res.researcher = researchers;
	next();
};

export const deleteResearcher = async (req, res, next) => {
	const researchers = res.researcher;

	const delResearcher = await Researcher.deleteOne({ _id: researchers._id });

	// await Researcher.updateOne({}, { $set: { activo: false } });

	res.researcher = delResearcher;
	next();
};
