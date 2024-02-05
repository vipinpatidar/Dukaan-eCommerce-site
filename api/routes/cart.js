import express from "express";
import { isAuthenticated } from "../middleware/isAuth.js";
import { verifyIsAdmin } from "../middleware/isAdmin.js";

import {
  addOneProduct,
  createAndUpdateCart,
  deleteCartProduct,
  deleteCartProductWithProduct,
  deleteClearCart,
  getAllCart,
  removeOneProduct,
} from "../controllers/cart.js";

export const cartRouter = express.Router();

cartRouter.get("/find/:userId", isAuthenticated, getAllCart);

cartRouter.post("/add", isAuthenticated, createAndUpdateCart);

cartRouter.put("/addOneProduct", isAuthenticated, addOneProduct);
cartRouter.put("/removeOneProduct", isAuthenticated, removeOneProduct);

cartRouter.delete(
  "/delete/:userId/:prodCartId",
  isAuthenticated,
  deleteCartProduct
);
cartRouter.delete(
  "/deleteCartProductWithProduct/:userId/:prodId",
  isAuthenticated,
  deleteCartProductWithProduct
);

cartRouter.delete("/clearCart/:userId", isAuthenticated, deleteClearCart);
