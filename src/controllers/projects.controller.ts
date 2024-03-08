import { Request, Response } from "express";
import projectsServices from "../services/projects.services";
import client from "../config/redis";

const getAllProjects = async (req: Request, res: Response) => {
  const allProjects = await projectsServices.getAllProjects(req.query);
  await client.SETEX(req.originalUrl, 60 * 1000, JSON.stringify(allProjects));
  return res.json(allProjects);
};

const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const project = await projectsServices.getProjectById(id);
  await client.SETEX(req.originalUrl, 60 * 1000, JSON.stringify(project));

  return res.json(project);
};

const createProject = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const newProject = await projectsServices.createProject(body);
    return res.status(201).json(newProject);
  } catch (error: any) {
    return res.status(400).send(error?.message);
  }
};

const updateProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const updatedProject = await projectsServices.updateProjectById(id, body);
    return res.json(updatedProject);
  } catch (error: any) {
    return res.status(400).send(error?.message);
  }
};

const deleteProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await projectsServices.deleteProjectById(id);
    return res.json({ message: "Le projet a été supprimé." });
  } catch (error: any) {
    return res.status(400).send(error?.message);
  }
};

const projectsController = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProjectById,
  deleteProjectById,
};

export default projectsController;
