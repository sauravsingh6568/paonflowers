import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";

const UPLOAD_DIR = "uploads"; // ensure path from project root
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, UPLOAD_DIR),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const name = crypto.randomBytes(12).toString("hex") + ext;
    cb(null, name);
  },
});

function fileFilter(_, file, cb) {
  const ok = /jpeg|jpg|png|webp/.test(file.mimetype);
  ok ? cb(null, true) : cb(new Error("Only images allowed"), false);
}

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter,
});
