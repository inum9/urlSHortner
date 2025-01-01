import mongoose from "mongoose";
const URLSchema = new mongoose.Schema({
    shortCode: { type: String, unique: true },
    originalURL: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
const urlUser= mongoose.model("Url",URLSchema);
export{urlUser};  