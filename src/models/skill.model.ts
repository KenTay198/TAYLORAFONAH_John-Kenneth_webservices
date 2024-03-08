import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

const Skill = mongoose.model("skills", skillSchema);

export default Skill;
