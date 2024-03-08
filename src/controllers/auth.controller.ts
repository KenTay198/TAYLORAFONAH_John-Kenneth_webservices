import { Request, Response } from "express";
import { signJwt, verifyJwt } from "../utils/jwt";
import usersServices from "../services/users.services";
import authServices from "../services/auth.services";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await usersServices.getUserByEmail(email);

  if (!user)
    return res.status(401).send("Nom d'utilisateur ou mot de passe incorrect.");

  const isPasswordValid = await authServices.comparePassword(
    password,
    user.password
  );

  if (!isPasswordValid) {
    return res.status(401).send("Nom d'utilisateur ou mot de passe incorrect.");
  }

  const tokenPayload = {
    lastName: user.lastName,
    firstName: user.firstName,
    email: user.email,
    role: user.role,
  };

  const token = signJwt(tokenPayload, "30min");
  const refreshToken = signJwt(tokenPayload, "7d");
  const accessToken = { access_token: token, token_type: "Bearer" };
  await usersServices.updateUserRefreshToken(user._id, refreshToken);

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
    })
    .json(accessToken);
};

const refreshToken = async (req: Request, res: Response) => {
  const { cookies } = req;

  if (!cookies?.refreshToken) return res.sendStatus(401);

  const refreshToken = cookies.refreshToken;
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: false,
    secure: true,
  });

  const foundUser = await usersServices.getUserByRefreshToken(refreshToken);

  if (!foundUser) return res.sendStatus(403);

  try {
    const decoded = verifyJwt(refreshToken);

    const tokenPayload = {
      lastName: foundUser.lastName,
      firstName: foundUser.firstName,
      email: foundUser.email,
      role: foundUser.role,
    };

    if (decoded.email !== foundUser.email) return res.sendStatus(403);

    const accessToken = signJwt(tokenPayload, "1d");
    return res.json({ accessToken, token_type: "Bearer" });
  } catch (error : any) {
    console.log(error);
    return res.sendStatus(401);
  }
};

const authController = {
  login,
  refreshToken,
};

export default authController;
