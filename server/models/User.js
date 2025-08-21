import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  label: String,
  line1: String,
  line2: String,
  city: String,
  state: String,
  zip: String,
  country: String,
  isDefault: Boolean,
});

const userSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true, index: true }, // E.164 format
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    location: { type: String, default: "" }, // e.g., city or area
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true,
    },
    profileComplete: { type: Boolean, default: false },
    addresses: [addressSchema],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
