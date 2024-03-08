export interface IDocument {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends IDocument {
  email: string;
  role: "user" | "admin";
  password: string;
  lastName?: string;
  firstName?: string;
  skills?: string[];
}

export interface IProject extends IDocument {
  name: string;
  team?: string[];
}

export interface ISkill extends IDocument {
  name: string;
}
