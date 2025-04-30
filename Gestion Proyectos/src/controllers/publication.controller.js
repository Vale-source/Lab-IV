
import { Publication } from "../models/Publication"

export const getPublications = async (req, res, next) => {

    const publication = await Publication.find().populate("proyectoRelacionado").populate("autores")

    res.publications = publication
    next()
}

export const getPublicationsById = async (req, res, next) => {
    const { publicationId } = req.query

    const publication = await Publication.findById(publicationId)

    res.publications = publication
    next()
}

export const addPublication = async (req, res, next) => {
    const publicationBody = (({
        titulo,
        resumen,
        fechaPublicacion,
        proyectoRelacionado,
        autores,
    }) => ({
        titulo,
        resumen,
        fechaPublicacion,
        proyectoRelacionado,
        autores,
    })(req.body))

    const newPublication = await Publication.create(publicationBody)
    res.publications = newPublication
    next()
}

export const deletePublication = async (req, res, next) => {
    const publication = res.publications

    const delPublication = await Publication.deleteOne({ _id: publication._id })

    res.publications = delPublication
    next()
}
