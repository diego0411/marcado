const db = require("../config/db");

// ✅ Función para insertar un nuevo marcado en la base de datos
const createMark = async (userId, name, lat, lng, status) => {
  await db.query(
    "INSERT INTO marks (user_id, name, timestamp, lat, lng, status) VALUES (?, ?, NOW(), ?, ?, ?)",
    [userId, name, lat, lng, status]
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
