import Skill from "../models/skill.model";
import { ISkill } from "../types/tables";

export const getSkillsFromQuery = async (query?: Record<any, any>) => {
  if (!query) return [];
  let values: string[] = query.skills;
  if (!values) return [];
  if (!Array.isArray(values)) values = [values];

  const skills: ISkill[] = await Skill.find({
    name: { $in: values.map((value) => new RegExp(`${value}`, "i")) },
  });

  return skills.map(({ _id }) => _id);
};
