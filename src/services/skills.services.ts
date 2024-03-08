import Skill from "../models/skill.model";

const getSkillById = async (_id: string) => {
  try {
    const skill = await Skill.findOne({ _id });
    return skill;
  } catch (error: any) {
    throw error;
  }
};

const getAllSkills = async (query : Record<any, any>) => {
  try {
    const skills = await Skill.find()
      .sort({
        createdAt: query.order === "desc" ? "desc" : "asc",
      })
      .limit(query.limit || 0)
      .lean();
    return skills;
  } catch (error: any) {
    throw error;
  }
};

const createSkill = async (data: any) => {
  try {
    const newSkill = new Skill(data).save();
    return newSkill;
  } catch (error: any) {
    throw error;
  }
};

const updateSkillById = async (_id: string, data: Record<any, any>) => {
  try {
    const updatedSkill = await Skill.findOneAndUpdate({ _id }, data, {
      new: true,
    });
    return updatedSkill;
  } catch (error: any) {
    throw error;
  }
};

const deleteSkillById = async (_id: string) => {
  try {
    const deletedSkill = await Skill.findOneAndDelete({ _id });
    return deletedSkill;
  } catch (error: any) {
    throw error;
  }
};

const skillsServices = {
  getSkillById,
  getAllSkills,
  updateSkillById,
  createSkill,
  deleteSkillById,
};

export default skillsServices;
