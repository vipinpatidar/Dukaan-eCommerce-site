import express from "express";
import { isAuthenticated } from "../middleware/isAuth.js";
import { verifyIsAdmin } from "../middleware/isAdmin.js";

import {
  deleteUser,
  getAllUser,
  getUser,
  getUserStats,
  updateUser,
} from "../controllers/user.js";

export const userRouter = express.Router();

userRouter.get("/find/:userId", isAuthenticated, getUser);

userRouter.get("/all", verifyIsAdmin, getAllUser);

userRouter.get("/stats", verifyIsAdmin, getUserStats);

userRouter.put("/update/:userId", isAuthenticated, updateUser);

userRouter.delete("/delete/:userId", isAuthenticated, deleteUser);
