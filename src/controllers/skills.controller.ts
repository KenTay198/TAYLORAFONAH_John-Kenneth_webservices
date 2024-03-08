import { Request, Response } from "express";
import skillsServices from "../services/skills.services";
import client from "../config/redis";

const getAllSkills = async (req: Request, res: Response) => {
  const allSkills = await skillsServices.getAllSkills(req.query);
  await client.SETEX(req.originalUrl, 60 * 1000, JSON.stringify(allSkills));

  return res.json(allSkills);
};

const getSkillById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const skill = await skillsServices.getSkillById(id);
  await client.SETEX(req.originalUrl, 60 * 1000, JSON.stringify(skill));

  return res.json(skill);
};

const createSkill = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const newSkill = await skillsServices.createSkill(body);
    return res.status(201).json(newSkill);
  } catch (error: any) {
    return res.status(400).send(error?.message);
  }
};

const updateSkillById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const updatedSkill = await skillsServices.updateSkillById(id, body);
    return res.json(updatedSkill);
  } catch (error: any) {
    return res.status(400).send(error?.message);
  }
};

const deleteSkillById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await skillsServices.deleteSkillById(id);
    return res.json({ message: "La compétence a été supprimée." });
  } catch (error: any) {
    return res.status(400).send(error?.message);
  }
};

const skillsController = {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkillById,
  deleteSkillById,
};

export default skillsController;
