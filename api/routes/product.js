import express from "express";
import { verifyIsAdmin } from "../middleware/isAdmin.js";
import {
  createProducts,
  deleteProduct,
  getAdminProducts,
  getAllProduct,
  getProduct,
  getWishListProduct,
  updateProduct,
} from "../controllers/product.js";
import { isAuthenticated } from "../middleware/isAuth.js";

export const productRouter = express.Router();

productRouter.get("/find/:prodId", getProduct);

productRouter.get("/all", getAllProduct);

productRouter.get("/adminProducts/:adminId", verifyIsAdmin, getAdminProducts);

productRouter.get("/wishlist/:userId", isAuthenticated, getWishListProduct);

productRouter.post("/add", verifyIsAdmin, createProducts);

productRouter.put("/update/:prodId", verifyIsAdmin, updateProduct);

productRouter.delete("/delete/:prodId", verifyIsAdmin, deleteProduct);
