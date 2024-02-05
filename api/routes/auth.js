import express from "express";
import {
  postLoginUser,
  postRegisterUser,
  putLogout,
} from "../controllers/auth.js";

export const authRouter = express.Router();

authRouter.post("/login", postLoginUser);

authRouter.post("/register", postRegisterUser);

authRouter.put("/logout", putLogout);
