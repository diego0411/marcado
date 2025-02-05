require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const markRoutes = require("./routes/markRoutes");
const exportRoutes = require("./routes/exportRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ CORS actualizado para producción
app.use(cors({
  origin: ["http://localhost:3000", "https://marcadof.vercel.app"], // 🔹 Agrega la URL de Vercel correctamente
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // 🔹 Asegura que todos los métodos HTTP estén permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // 🔹 Permite estos headers en las solicitudes
  credentials: true // 🔹 Habilita el envío de cookies y sesiones
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Endpoint de prueba para Railway
app.get("/", (req, res) => {
  res.send("API funcionando correctamente con CORS configurado");
});

// ✅ Rutas principales
app.use("/auth", authRoutes);
app.use("/marking", markRoutes);
app.use("/export", exportRoutes);
app.use("/schedule", scheduleRoutes);

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
