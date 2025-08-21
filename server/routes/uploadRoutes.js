import { Router } from "express";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
import { upload } from "../middleware/multer.js";
import { uploadDone } from "../controllers/uploadController.js";

const r = Router();

r.post("/", auth, isAdmin, upload.single("file"), uploadDone);

export default r;
