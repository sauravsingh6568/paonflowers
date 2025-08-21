import { Router } from "express";
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { upload } from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";

const r = Router();

r.get("/", listProducts);
r.get("/:slug", getProduct);

// admin-only mutations
r.post("/", auth, isAdmin, upload.single("file"), createProduct);
r.put("/:id", auth, isAdmin, upload.single("file"), updateProduct);
r.delete("/:id", auth, isAdmin, deleteProduct);

export default r;
