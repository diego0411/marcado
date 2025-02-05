const { setSchedule, getScheduleByUserId } = require("../models/scheduleModel");

const configureSchedule = async (req, res) => {
  try {
    // ✅ Verificar si el usuario tiene permisos de ADMIN
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "⚠️ Solo los administradores pueden configurar horarios." });
    }

    const { arrivalTime, departureTime } = req.body;

    // ✅ Validar que los datos estén presentes
    if (!arrivalTime || !departureTime) {
      return res.status(400).json({ message: "⚠️ arrivalTime y departureTime son requeridos." });
    }

    await setSchedule(arrivalTime, departureTime);
    res.json({ message: "✅ Horario actualizado con éxito" });
  } catch (err) {
    console.error("❌ Error al configurar horario:", err);
    res.status(500).json({ message: "❌ Error al configurar horario" });
  }
};

module.exports = { configureSchedule };