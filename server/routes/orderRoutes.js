import { Router } from "express";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
import {
  placeOrder,
  myOrders,
  listAll,
  updateStatus,
} from "../controllers/orderController.js";

const r = Router();

// user
r.post("/", auth, placeOrder);
r.get("/mine", auth, myOrders);

// admin
r.get("/", auth, isAdmin, listAll);
r.patch("/:id/status", auth, isAdmin, updateStatus);

export default r;
