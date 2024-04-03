import express from "express";

import { isAuthenticated } from "../middleware/isAuth.js";
import { verifyIsAdmin } from "../middleware/isAdmin.js";

import {
  createOrder,
  getAdminOrders,
  getAllOrder,
  getOrder,
  getThreeDayOldOrders,
  putCancelOrder,
  putReturnOrder,
  putUpdateOrderStatus,
} from "../controllers/order.js";

export const orderRouter = express.Router();

orderRouter.get("/find/:userId", isAuthenticated, getOrder);

orderRouter.get(
  "/threeDayOldOrders/:userId",
  isAuthenticated,
  getThreeDayOldOrders
);

orderRouter.get("/adminOrder/:adminId", verifyIsAdmin, getAdminOrders);
orderRouter.put("/update-order-status", verifyIsAdmin, putUpdateOrderStatus);

orderRouter.put("/cancel-order", isAuthenticated, putCancelOrder);
orderRouter.put("/return-order", isAuthenticated, putReturnOrder);

orderRouter.get("/all", verifyIsAdmin, getAllOrder);

orderRouter.post("/add", isAuthenticated, createOrder);
