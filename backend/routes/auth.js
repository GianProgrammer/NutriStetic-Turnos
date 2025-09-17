import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Auth from "../models/Authen.js";

dotenv.config();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Register
router.post('/register', async (req, res) => {
  try {
    const { dni, nombre, password, role } = req.body;

    const existingUser = await Auth.findOne({ dni });
    if (existingUser) return res.status(400).json({ msg: 'Usuario ya existe' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Auth({
      dni,
      nombre,
      password: hashedPassword,
      role
    });

    await newUser.save();
    res.status(201).json({ msg: 'Usuario creado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  try {
    const { dni, password } = req.body;

    // Buscar usuario
    const user = await Auth.findOne({ dni });
    if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });
    // Crear token con datos del usuario
    const token = jwt.sign(
      { id: user._id, dni: user.dni, role: user.role, nombre: user.nombre},
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Enviar token al frontend
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el login" });
  }
});

router.post("/verify", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // Verificar el token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Devolver los datos del usuario que estén en el payload
    return res.json({
      user: {
        dni: payload.dni,
        role: payload.role,
        nombre: user.nombre,
      },
    });
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
});

export default router;
