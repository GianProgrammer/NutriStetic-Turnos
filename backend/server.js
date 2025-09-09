import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import turnosRoutes from "./routes/turnos.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/turnos", turnosRoutes);

mongoose.connect("mongodb+srv://gianferreyra2014_db_user:lozkfiIHrZutYYwk@bdturnos.as5xw9i.mongodb.net/?retryWrites=true&w=majority&appName=bdTurnos", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Conectado a MongoDB");
  app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
})
.catch((err) => console.error("Error al conectar a MongoDB:", err));
