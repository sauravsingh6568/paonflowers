import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, index: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 }, // verification attempts
    sentAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// TTL index for auto-expiration
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("OtpToken", otpSchema);
