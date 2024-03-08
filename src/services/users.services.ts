import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { IUser } from "../types/tables";
import { getSkillsFromQuery } from "../utils/functions";

const getAllUsers = async (query: Record<any, any>): Promise<IUser[]> => {
  try {
    const skillsIds = await getSkillsFromQuery(query);

    const users: IUser[] = await User.find(
      query.skills ? { skills: { $in: skillsIds } } : {}
    )
      .sort({
        createdAt: query.order === "desc" ? "desc" : "asc",
      })
      .limit(query.limit || 0)
      .lean();

    return users;
  } catch (error: any) {
    throw error;
  }
};

const getUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    const user: IUser | null = await User.findOne({ email });
    return user;
  } catch (error: any) {
    throw error;
  }
};

const getUserByRefreshToken = async (
  refreshToken: string
): Promise<IUser | null> => {
  try {
    const user: IUser | null = await User.findOne({ refreshToken });
    return user;
  } catch (error: any) {
    throw error;
  }
};

const getUserById = async (_id: string): Promise<IUser | null> => {
  try {
    const user: IUser | null = await User.findOne({ _id });
    return user;
  } catch (error: any) {
    throw error;
  }
};

const createUser = async (data: any) => {
  const { password } = data;
  const salt = bcrypt.genSaltSync(4);
  const hash = bcrypt.hashSync(password, salt);

  const newUserData = {
    ...data,
    password: hash,
  };

  try {
    const newUser = new User(newUserData).save();
    return newUser;
  } catch (error: any) {
    throw error;
  }
};

const updateUserById = async (_id: string, data: any) => {
  try {
    const updatedUser = await User.findOneAndUpdate({ _id }, data, {
      new: true,
    });
    return updatedUser;
  } catch (error: any) {
    throw error;
  }
};

const updateUserRefreshToken = async (_id: string, refreshToken: string) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id },
      { refreshToken },
      {
        new: true,
      }
    );
    return updatedUser;
  } catch (error: any) {
    throw error;
  }
};

const deleteUserById = async (_id: string) => {
  try {
    const deletedUser = await User.findOneAndDelete({ _id });
    return deletedUser;
  } catch (error: any) {
    throw error;
  }
};

const usersServices = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByRefreshToken,
  createUser,
  updateUserRefreshToken,
  updateUserById,
  deleteUserById,
};

export default usersServices;
