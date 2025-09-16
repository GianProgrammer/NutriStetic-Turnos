import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
  dni: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["user", "admin"] }
});

export default mongoose.model("Auth", AuthSchema);