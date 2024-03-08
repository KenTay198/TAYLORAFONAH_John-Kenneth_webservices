import mongoose, { Schema } from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    team: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model("projects", projectSchema);

export default Project;
