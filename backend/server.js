import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import turnosRoutes from "./routes/turnos.js";

dotenv.config()
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/turnos", turnosRoutes);

mongoose.connect(process.env.RESTREVIEWS_DB_URI)
.then(() => {
  console.log("Conectado a MongoDB");
  app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
})
.catch((err) => console.error("Error al conectar a MongoDB:", err));
