import mongoose from "mongoose";

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("MONGO_URI missing");

mongoose
  .connect(uri, { autoIndex: true })
  .then(() => console.log("MongoDB connected"))
  .catch((e) => {
    console.error("MongoDB error:", e);
    process.exit(1);
  });

export default mongoose;
