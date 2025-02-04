const db = require("../config/db");

// Inserta un nuevo usuario con su rol
const createUser = async (name, email, password, role) => {
  // Asegúrate de que la tabla 'users' tenga la columna 'role'
  // y que las columnas tengan los mismos nombres (name, email, password, role).
  await db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role]
  );
};

const getUserByEmail = async (email) => {
  const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  // Devuelve el primer registro o undefined si no existe.
  return users[0];
};

module.exports = { createUser, getUserByEmail };
