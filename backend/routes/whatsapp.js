import express from "express";
import axios from "axios";

const router = express.Router();

const TOKEN = process.env.WHATSAPP_TOKEN;           
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID; 

// POST /whatsapp/send
router.post("/send", async (req, res) => {
  const { to, message } = req.body; // Ej: { "to": "5491123456789", "message": "Tu turno fue cancelado" }

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ Respuesta de Meta WhatsApp:", response.status, response.data);
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error("❌ Error enviando mensaje:", error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.response?.data || error.message });
  }
});

export default router;
