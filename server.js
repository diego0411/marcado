require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const markRoutes = require("./routes/markRoutes");
const exportRoutes = require("./routes/exportRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ CORS actualizado para producción
app.use(cors({
  origin: ["http://localhost:3000", "https://marcadof.vercel.app","https://marcadof-diegos-projects-dd0d649f.vercel.app:"], // 🔹 Agrega la URL del frontend en Vercel
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Endpoint de prueba para Railway
app.get("/", (req, res) => {
  res.send("API funcionando correctamente en Railway");
});

// ✅ Rutas principales
app.use("/auth", authRoutes);
app.use("/marking", markRoutes);
app.use("/export", exportRoutes);

// ✅ Manejo de errores globales para evitar que Railway cierre el proceso
process.on("uncaughtException", (err) => {
  console.error("❌ Error inesperado:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Promesa rechazada sin manejar:", err);
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
