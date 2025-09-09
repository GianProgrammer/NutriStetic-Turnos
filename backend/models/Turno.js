import mongoose from "mongoose";

const turnoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  servicio: { type: String, required: true },
  fecha: { type: String, required: true }, // lo podés guardar como String o Date
  hora: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Turno", turnoSchema);
