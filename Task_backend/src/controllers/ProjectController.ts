import type { Request, Response } from 'express'
import Project from '../models/Project'

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body)

    // asignar un manager
    project.manager = req.user.id

    try {
      await project.save()
      res.send('Proyecto creado correctamente')
    } catch (error) {
      console.log(error)
      res.status(500).send('Hubo un error al crear el proyecto')
    }
  }

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      console.log("Intentando obtener todos los proyectos...");
      const projects = await Project.find({
        $or: [
          {manager: {$in:req.user.id}},
          {team: {$in: req.user.id}}
        ]
      })
      console.log("Proyectos obtenidos:", projects);
      console.log("Enviando respuesta JSON...");
      res.json(projects)
    } catch (error) {
      console.error("Error en getAllProjects:", error)
      res.status(500).json({ error: "Hubo un error al obtener los proyectos" })
    }
  }

  static getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params
    console.log(id)
    try {

      const project = await (await Project.findById(id)).populate('tasks')
      if (!project) {
        const error = new Error('Proyecto no encontrado')
        return res.status(404).json({ error: error.message })
      }
      if(project.manager.toString() !== req.user.id.toString() && !project.team.includes(req.user.id)){
        const error = new Error('Acción no válida')
        return res.status(404).json({ error: error.message })
      }
      res.json(project)
    } catch (error) {

      res.status(500).json({ error: "Hubo un error al obtener los proyectos" })
    }
  }

  static updateProject = async (req: Request, res: Response) => {
    const { id } = req.params
    console.log(id)
    try {

      const project = await Project.findById(id)

      if (!project) {
        const error = new Error('Proyecto no encontrado')
        return res.status(404).json({ error: error.message })
      }
      
      if(project.manager.toString() !== req.user.id.toString() ){
        const error = new Error('Sólo el manager puede actualizar un proyecto')
        return res.status(404).json({ error: error.message })
      }
      project.clientName = req.body.clientName
      project.projectName = req.body.projectName
      project.description = req.body.description

      await project.save()
      res.send('Poryecto actualizado')
    } catch (error) {

      res.status(500).json({ error: "Hubo un error al obtener los proyectos" })
    }
  }
  static deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params
    console.log(id)
    try {
      const project = await Project.findById(id)
      if (!project) {
        const error = new Error('Proyecto no encontrado')
        return res.status(404).json({ error: error.message })
      }
      if(project.manager.toString() !== req.user.id.toString() ){
        const error = new Error('Sólo el manager puede eliminar un proyecto')
        return res.status(404).json({ error: error.message })
      }
      await project.deleteOne()
      res.send('Proyecto eliminado')
    } catch (error) {

      res.status(500).json({ error: "Hubo un error al obtener los proyectos" })
    }
  }
}
