import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET;

const signJwt = (payload: any, expiresIn: string) => {
  return jwt.sign(payload, secretKey!, { expiresIn });
};

const verifyJwt = (refreshToken: string): any => {
  return jwt.verify(refreshToken, secretKey!);
};

export { signJwt, verifyJwt };
