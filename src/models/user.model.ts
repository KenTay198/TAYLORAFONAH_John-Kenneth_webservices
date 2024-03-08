import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    lastName: String,
    firstName: String,
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    password: { type: String, required: true },
    refreshToken: String,
    skills: [
      {
        type: Schema.Types.ObjectId,
        ref: "skills",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
