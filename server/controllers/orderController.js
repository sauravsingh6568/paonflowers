import { z } from "zod";
import Order from "../models/Order.js";

const placeSchema = z.object({
  items: z.array(
    z.object({
      product: z.string(),
      name: z.string(),
      qty: z.number().int().min(1),
      price: z.number().positive(),
      image: z.string().optional(),
    })
  ),
  shippingAddress: z.object({
    name: z.string(),
    phone: z.string(),
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string().optional(),
    zip: z.string().optional(),
    country: z.string(),
  }),
  notes: z.string().optional(),
  paymentMethod: z.enum(["COD", "Razorpay", "Stripe"]).default("COD"),
  deliveryDate: z.string().optional(),
});

export const placeOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, notes, paymentMethod, deliveryDate } =
      placeSchema.parse(req.body);

    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const delivery = subtotal >= 999 ? 0 : 79;
    const total = Math.max(0, subtotal + delivery);

    const order = await Order.create({
      user: req.user.id,
      items,
      shippingAddress,
      pricing: { subtotal, discount: 0, delivery, total },
      payment: {
        method: paymentMethod,
        status: paymentMethod === "COD" ? "pending" : "pending",
      },
      deliveryDate: deliveryDate ? new Date(deliveryDate) : undefined,
      notes,
    });

    res.status(201).json({ order });
  } catch (e) {
    next(e);
  }
};

export const myOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort("-createdAt");
    res.json(orders);
  } catch (e) {
    next(e);
  }
};

// Admin controls delivery workflow
export const listAll = async (_req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "phone name")
      .sort("-createdAt");
    res.json(orders);
  } catch (e) {
    next(e);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { status } = z
      .object({
        status: z.enum([
          "placed",
          "confirmed",
          "preparing",
          "out-for-delivery",
          "delivered",
          "cancelled",
          "refunded",
        ]),
      })
      .parse(req.body);

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Not found" });

    res.json(order);
  } catch (e) {
    next(e);
  }
};
