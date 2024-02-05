import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// Components
import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/user.js";
import { productRouter } from "./routes/product.js";
import { cartRouter } from "./routes/cart.js";
import { orderRouter } from "./routes/order.js";
import { stripeRoute } from "./routes/stripe.js";
import { favoritesRouter } from "./routes/favorites.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://dukaan-ecommerce-vipin.netlify.app",
    ],
    credentials: true,
  })
);
// http://localhost:5173

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

// API ENDPOINTS
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/favorites", favoritesRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/checkout", stripeRoute);

// DATABASE CONNECTIONS
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((err) => console.log(err));
