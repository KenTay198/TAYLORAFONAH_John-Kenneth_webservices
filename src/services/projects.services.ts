import Project from "../models/project.model";
import { IProject } from "../types/tables";

const getProjectById = async (_id: string) => {
  try {
    const project = await Project.findOne({ _id });
    return project;
  } catch (error: any) {
    throw error;
  }
};

const getAllProjects = async (query: Record<any, any>): Promise<IProject[]> => {
  try {
    const projects: IProject[] = await Project.find()
      .sort({
        createdAt: query.order === "desc" ? "desc" : "asc",
      })
      .limit(query.limit || 0)
      .lean();

    return projects;
  } catch (error: any) {
    throw error;
  }
};

const createProject = async (data: any) => {
  try {
    const newProject = new Project(data).save();
    return newProject;
  } catch (error: any) {
    throw error;
  }
};

const updateProjectById = async (_id: string, data: Record<any, any>) => {
  try {
    const updatedProject = await Project.findOneAndUpdate({ _id }, data, {
      new: true,
    });
    return updatedProject;
  } catch (error: any) {
    throw error;
  }
};

const deleteProjectById = async (_id: string) => {
  try {
    const deletedProject = await Project.findOneAndDelete({ _id });
    return deletedProject;
  } catch (error: any) {
    throw error;
  }
};

const projectsServices = {
  getProjectById,
  getAllProjects,
  updateProjectById,
  createProject,
  deleteProjectById,
};

export default projectsServices;
