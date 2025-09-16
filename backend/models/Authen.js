import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
  dni: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["usuario", "admin"] }
});

export default mongoose.model("Auth", AuthSchema);