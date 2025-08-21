import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: String,
  qty: Number,
  price: Number,
  image: String,
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [itemSchema],
    shippingAddress: {
      name: String,
      phone: String,
      line1: String,
      line2: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    pricing: {
      subtotal: Number,
      discount: Number,
      delivery: Number,
      total: Number,
    },
    payment: {
      method: {
        type: String,
        enum: ["COD", "Razorpay", "Stripe"],
        default: "COD",
      },
      status: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending",
      },
    },
    status: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "preparing",
        "out-for-delivery",
        "delivered",
        "cancelled",
        "refunded",
      ],
      default: "placed",
      index: true,
    },
    deliveryDate: Date,
    notes: String,
  },
  { timestamps: true }
);

orderSchema.index({ user: 1, status: 1, createdAt: -1 });

export default mongoose.model("Order", orderSchema);
