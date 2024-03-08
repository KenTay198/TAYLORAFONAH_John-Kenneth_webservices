import { NextFunction, Request, Response } from "express";
import client from "../config/redis";

export const cache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cache = await client.get(req.originalUrl);

  if (!cache) {
    return next();
  }

  res.status(200).send(JSON.parse(cache));
};
