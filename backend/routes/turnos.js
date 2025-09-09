import express from "express";
import Turno from "../models/Turno.js";

const router = express.Router();

// Obtener todos los turnos
router.get("/", async (req, res) => {
  try {
    const turnos = await Turno.find().sort({ fecha: 1, hora: 1 });
    res.json(turnos);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los turnos" });
  }
});

// Crear un turno
router.post("/", async (req, res) => {
  try {
    const nuevoTurno = new Turno(req.body);
    await nuevoTurno.save();
    res.json(nuevoTurno);
  } catch (err) {
    res.status(500).json({ error: "Error al crear el turno" });
  }
});

// (Opcional) Eliminar un turno
router.delete("/:id", async (req, res) => {
  try {
    await Turno.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Turno eliminado" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar el turno" });
  }
});

export default router;
