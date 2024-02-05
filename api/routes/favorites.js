import express from "express";
import { isAuthenticated } from "../middleware/isAuth.js";
// import { verifyIsAdmin } from "../middleware/isAdmin.js";

import {
  postAddFavorite,
  deleteRemoveFavorite,
} from "../controllers/favorites.js";

export const favoritesRouter = express.Router();

favoritesRouter.post("/add/:prodId", isAuthenticated, postAddFavorite);

favoritesRouter.delete(
  "/remove/:prodId",
  isAuthenticated,
  deleteRemoveFavorite
);
