import { z } from "zod";
import Product from "../models/Product.js";

const createSchema = z.object({
  name: z.string().min(2),
  slug: z.string().optional(),
  description: z.string().optional().default(""),
  price: z.number().positive(),
  stock: z.number().int().nonnegative().optional().default(100),
  category: z.string().optional(),
  occasion: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  isFeatured: z.boolean().optional().default(false),
});

export const listProducts = async (req, res, next) => {
  try {
    const {
      q,
      category,
      occasion,
      min,
      max,
      sort = "-createdAt",
      page = "1",
      limit = "12",
    } = req.query;

    const filter = {};
    if (q) filter.$text = { $search: q };
    if (category) filter.category = category;
    if (occasion) filter.occasion = occasion;
    if (min || max)
      filter.price = {
        ...(min ? { $gte: +min } : {}),
        ...(max ? { $lte: +max } : {}),
      };

    const skip = (+page - 1) * +limit;
    const [items, total] = await Promise.all([
      Product.find(filter)
        .sort(sort.replace(",", " "))
        .skip(skip)
        .limit(+limit),
      Product.countDocuments(filter),
    ]);

    res.json({ items, total, page: +page, pages: Math.ceil(total / +limit) });
  } catch (e) {
    next(e);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const item = await Product.findOne({ slug: req.params.slug });
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    next(e);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const body = createSchema.parse({
      ...req.body,
      price: Number(req.body.price),
      stock: req.body.stock ? Number(req.body.stock) : undefined,
    });

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
        "-" +
        Date.now().toString(36);

    const images = [];
    if (req.file) images.push({ url: `/uploads/${req.file.filename}` });

    const created = await Product.create({ ...body, slug, images });
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.$push = { images: { url: `/uploads/${req.file.filename}` } };
    }
    if (data.price) data.price = Number(data.price);
    if (data.stock) data.stock = Number(data.stock);

    const updated = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (e) {
    next(e);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
};
