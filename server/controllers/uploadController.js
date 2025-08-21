export const uploadDone = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    res.json({ url: `/uploads/${req.file.filename}` });
  } catch (e) {
    next(e);
  }
};
