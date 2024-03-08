import express from "express";
import usersController from "../controllers/users.controller";
import { isAdmin } from "../middleware/isAuth";
import { cache } from "../middleware/cache";
const usersRoutes = express.Router();

usersRoutes.get("/", cache, usersController.getAllUsers);
usersRoutes.get("/:id", cache, usersController.getUserById);
usersRoutes.post("/", isAdmin, usersController.createUser);
usersRoutes.put("/:id", isAdmin, usersController.updateUserById);
usersRoutes.delete("/:id", isAdmin, usersController.deleteUserById);

export default usersRoutes;
