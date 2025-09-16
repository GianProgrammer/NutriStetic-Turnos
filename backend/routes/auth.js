import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Auth from "../models/Authen.js";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Registro
router.post("/register", async (req, res) => {
  try {
    const { dni, password, role } = req.body;

    // Validar si ya existe
    const existingUser = await Auth.findOne({ dni });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Auth({
      dni,
      password: hashedPassword,
      role
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el registro" });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  try {
    const { dni, password } = req.body;

    // Buscar usuario
    const user = await Auth.findOne({ dni });
    if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Credenciales inválidas" });

    // Crear token
    const token = jwt.sign(
      { id: user._id, dni: user.dni, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el login" });
  }
});

export default router;
