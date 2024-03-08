import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils/jwt";

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers["authorization"];

  if (!accessToken) {
    return res.status(401).send("Unauthorized");
  }

  if (accessToken.startsWith("Bearer ")) {
    const cleanAccess = accessToken.slice(7, accessToken.length);

    try {
      const user = verifyJwt(cleanAccess);
      if (!user || !user.role) return res.status(401).send("Unauthorized");
      req.role = user.role;
      return next();
    } catch (error: any) {
      console.log(error?.message);
      return res.status(401).send("Unauthorized");
    }
  }

  return res.sendStatus(400);
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.role || req.role !== "admin")
    return res.status(403).send("Unauthorized");

  next();
};
