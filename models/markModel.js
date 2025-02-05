const db = require("../config/db");

// ✅ Función para obtener la hora local ajustada correctamente (Bolivia UTC-4)
const getLocalTime = () => {
  const now = new Date();
  now.setUTCHours(now.getUTCHours() - 4); // 🔹 Ajuste manual para UTC -4 (Bolivia)
  return now.toISOString().slice(0, 19).replace("T", " "); // 🔹 "YYYY-MM-DD HH:MM:SS"
};

// ✅ Función para obtener los horarios de la jornada actual
const getSchedule = async (horaActual) => {
  const [rows] = await db.query("SELECT * FROM schedules");
  return rows.find(schedule => {
    return horaActual >= schedule.entrada && horaActual <= schedule.salida;
  });
};

// ✅ Función para insertar un nuevo marcado en la base de datos con `status`
const createMark = async (userId, name, lat, lng) => {
  const horaActual = new Date().toLocaleTimeString("es-ES", { hour12: false }); // "HH:mm:ss"
  const jornada = await getSchedule(horaActual);
  const timestamp = getLocalTime(); // ⏰ Hora corregida

  let status = "A tiempo";
  if (jornada) {
    if (horaActual > jornada.entrada) {
      status = "Tarde";
    } else if (horaActual < jornada.salida) {
      status = "Salida temprana";
    }
  } else {
    status = "Fuera de horario";
  }

  await db.query(
    "INSERT INTO marks (user_id, name, timestamp, lat, lng, status) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, name, timestamp, lat, lng, status]
  );
};

// ✅ Función para obtener los registros de un usuario específico
const getMarksByUserId = async (userId) => {
  const [records] = await db.query(
    "SELECT * FROM marks WHERE user_id = ? ORDER BY timestamp DESC",
    [userId]
  );
  return records;
};

// ✅ Función para obtener TODOS los registros (solo para ADMIN)
const getAllMarks = async () => {
  const [records] = await db.query("SELECT * FROM marks ORDER BY timestamp DESC");
  return records;
};

// ✅ Exportamos todas las funciones correctamente
module.exports = { createMark, getMarksByUserId, getAllMarks };
