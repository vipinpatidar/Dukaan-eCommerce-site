import express from "express";

import { isAuthenticated } from "../middleware/isAuth.js";
import { verifyIsAdmin } from "../middleware/isAdmin.js";

import { createOrder, getAllOrder, getOrder } from "../controllers/order.js";

export const orderRouter = express.Router();

orderRouter.get("/find/:userId", isAuthenticated, getOrder);

orderRouter.get("/all", verifyIsAdmin, getAllOrder);

orderRouter.post("/add", isAuthenticated, createOrder);
