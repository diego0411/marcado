const db = require("../config/db");

// ✅ Función para obtener el horario general
const getSchedule = async () => {
  try {
    const [schedule] = await db.query("SELECT arrival_time, departure_time FROM schedules LIMIT 1");

    if (schedule.length === 0) {
      console.log("⚠️ No se encontró un horario registrado.");
      return null;
    }

    console.log("📌 Horario obtenido:", schedule[0]);
    return schedule[0];
  } catch (error) {
    console.error("❌ Error al obtener el horario:", error);
    throw error;
  }
};

// ✅ Exportamos la función correctamente
module.exports = { getSchedule };
