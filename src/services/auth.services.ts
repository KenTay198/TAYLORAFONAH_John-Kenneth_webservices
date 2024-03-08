import bcrypt from "bcryptjs";

const comparePassword = async (password: string, hashedPassword: string) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};

const authServices = {
  comparePassword,
};

export default authServices;
