import { z } from "zod";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import User from "../models/User.js";
import OtpToken from "../models/OtpToken.js";
import { sendSMS } from "../config/sms.js";

const phoneSchema = z.object({
  phone: z
    .string()
    .regex(/^\+\d{10,15}$/, "Phone must be E.164, e.g., +9715xxxxxxx"),
});

const verifySchema = z.object({
  phone: z.string().regex(/^\+\d{10,15}$/),
  code: z.string().length(6),
});

function jwtFor(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "7d",
  });
}

// Step 1: Send OTP
export const sendOtp = async (req, res, next) => {
  try {
    const { phone } = phoneSchema.parse(req.body);

    // Rate-limiting handled by middleware; here we issue OTP
    const code = ("" + Math.floor(100000 + Math.random() * 900000)).slice(-6);
    const ttlMin = +process.env.OTP_TTL_MINUTES || 10;
    const expiresAt = new Date(Date.now() + ttlMin * 60 * 1000);

    await OtpToken.create({ phone, code, expiresAt });
    await sendSMS({
      to: phone,
      body: `Paon Flowers OTP: ${code}. Valid ${ttlMin} min.`,
    });

    res.json({ message: "OTP sent" });
  } catch (e) {
    next(e);
  }
};

// Step 2: Verify OTP (create or login user)
export const verifyOtp = async (req, res, next) => {
  try {
    const { phone, code } = verifySchema.parse(req.body);
    const tokenDoc = await OtpToken.findOne({ phone }).sort("-createdAt");

    if (
      !tokenDoc ||
      tokenDoc.expiresAt < new Date() ||
      tokenDoc.code !== code
    ) {
      return res.status(400).json({ message: "Invalid/expired OTP" });
    }

    await OtpToken.deleteMany({ phone }); // cleanup

    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({
        phone,
        role: phone === process.env.ADMIN_PHONE ? "admin" : "user",
        profileComplete: false,
      });
    }

    const token = jwtFor(user);
    res.json({
      token,
      user: {
        id: user._id,
        phone: user.phone,
        name: user.name,
        role: user.role,
        profileComplete: user.profileComplete,
      },
    });
  } catch (e) {
    next(e);
  }
};

// Step 3: Complete / Update profile (name, location, etc.)
export const updateProfile = async (req, res, next) => {
  try {
    const schema = z.object({
      name: z.string().min(2),
      email: z.string().email().optional().or(z.literal("")),
      location: z.string().min(2).optional().or(z.literal("")),
    });
    const body = schema.parse(req.body);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { ...body, profileComplete: true },
      { new: true }
    );

    res.json({
      user: {
        id: user._id,
        phone: user.phone,
        name: user.name,
        email: user.email,
        location: user.location,
        role: user.role,
        profileComplete: user.profileComplete,
      },
    });
  } catch (e) {
    next(e);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).lean();
    res.json({
      user: user
        ? {
            id: user._id,
            phone: user.phone,
            name: user.name,
            email: user.email,
            location: user.location,
            role: user.role,
            profileComplete: user.profileComplete,
          }
        : null,
    });
  } catch (e) {
    next(e);
  }
};
