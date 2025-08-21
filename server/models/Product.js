import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, index: true },
    images: [{ url: String }], // for local uploads: /uploads/<file>
    stock: { type: Number, default: 100 },
    category: { type: String, index: true },
    occasion: { type: String, index: true }, // Birthday, Eid, Valentine day, etc.
    tags: [String],
    isFeatured: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text", tags: "text" });

export default mongoose.model("Product", productSchema);
