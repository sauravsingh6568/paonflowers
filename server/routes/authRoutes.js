import { Router } from "express";
import auth from "../middleware/auth.js";
import { otpSendLimiter } from "../middleware/rateLimit.js";
import {
  sendOtp,
  verifyOtp,
  updateProfile,
  me,
} from "../controllers/authController.js";

const r = Router();
r.post("/send-otp", otpSendLimiter, sendOtp);
r.post("/verify-otp", verifyOtp);
r.get("/me", auth, me);
r.patch("/profile", auth, updateProfile);

export default r;
