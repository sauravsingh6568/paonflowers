function isAdmin(req, res, next) {
  if (req.user?.role !== "admin")
    return res.status(403).json({ message: "Admins only" });
  next();
}
export default isAdmin; // <-- default
