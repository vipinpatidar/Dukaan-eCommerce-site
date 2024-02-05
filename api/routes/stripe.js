import express from "express";
import { verifyIsAdmin } from "../middleware/isAdmin.js";
import { postStipeCharges } from "../controllers/stripe.js";

export const stripeRoute = express.Router();

stripeRoute.post("/payment", postStipeCharges);
