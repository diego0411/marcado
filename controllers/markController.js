const { createMark, getMarksByUserId, getAllMarks } = require("../models/markModel");

// ✅ Función para registrar la asistencia con cálculo automático del `status`
const markAttendance = async (req, res) => {
  const { lat, lng } = req.body;
  console.log("📌 markAttendance - user:", req.user, "body:", req.body);
  
  try {
    await createMark(req.user.userId, req.user.name, lat, lng); // 🔹 El status se calcula dentro de `createMark()`
    res.json({ message: "✅ Marcado registrado correctamente" });
  } catch (err) {
    console.error("❌ Error al registrar marcado:", err);
    res.status(500).json({ message: "❌ Error al registrar marcado" });
  }
};

// ✅ Función para obtener registros de UN SOLO usuario
const getRecords = async (req, res) => {
  try {
    console.log("📌 getRecords - user:", req.user);
    const records = await getMarksByUserId(req.user.userId);
    res.json(records);
  } catch (err) {
    console.error("❌ Error al obtener registros:", err);
    res.status(500).json({ message: "❌ Error al obtener registros" });
  }
};

// ✅ Función para obtener TODOS los registros (solo ADMIN)
const getAllRecords = async (req, res) => {
  try {
    if (req.user.role !== "ADMIN") {
      console.warn("⚠️ Acceso denegado - Usuario sin permisos de ADMIN");
      return res.status(403).json({ message: "⚠️ Acceso denegado" });
    }

    console.log("📌 getAllRecords - ADMIN request");
    const records = await getAllMarks();
    res.json(records);
  } catch (err) {
    console.error("❌ Error al obtener todos los registros:", err);
    res.status(500).json({ message: "❌ Error al obtener registros" });
  }
};

// ✅ Exportamos correctamente todas las funciones
module.exports = { markAttendance, getRecords, getAllRecords };
