import { Request, Response } from "express";
import usersServices from "../services/users.services";
import client from "../config/redis";

const getAllUsers = async (req: Request, res: Response) => {
  const allUsers = await usersServices.getAllUsers(req.query);
  await client.SETEX(req.url, 60 * 1000, JSON.stringify(allUsers));

  return res.json(allUsers);
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await usersServices.getUserById(id);
  await client.SETEX(req.url, 60 * 1000, JSON.stringify(user));

  return res.json(user);
};

const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const newUser = await usersServices.createUser(body);
    return res.status(201).json(newUser);
  } catch (error: any) {
    return res.status(400).send(error?.message);
  }
};

const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const updatedUser = await usersServices.updateUserById(id, body);
    return res.json(updatedUser);
  } catch (error: any) {
    return res.status(400).send(error?.message);
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await usersServices.deleteUserById(id);
    return res.json({ message: "L'utilisateur a été supprimé." });
  } catch (error: any) {
    return res.status(400).send(error?.message);
  }
};

const usersController = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};

export default usersController;
