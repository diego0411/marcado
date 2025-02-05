const db = require("../config/db");

// ✅ Obtener todos los usuarios
const getUsers = async () => {
  try {
    const [users] = await db.query("SELECT id, name, email, role FROM users");
    return users;
  } catch (error) {
    console.error("❌ Error al obtener la lista de usuarios:", error);
    throw error;
  }
};

// ✅ Modificar el rol de un usuario
const updateUserRole = async (userId, role) => {
  try {
    await db.query("UPDATE users SET role = ? WHERE id = ?", [role, userId]);
    console.log(`✅ Rol actualizado: Usuario ${userId} -> ${role}`);
  } catch (error) {
    console.error("❌ Error al modificar el rol:", error);
    throw error;
  }
};

// ✅ Eliminar un usuario
const deleteUser = async (userId) => {
  try {
    await db.query("DELETE FROM users WHERE id = ?", [userId]);
    console.log(`✅ Usuario eliminado: ID ${userId}`);
  } catch (error) {
    console.error("❌ Error al eliminar usuario:", error);
    throw error;
  }
};

module.exports = { getUsers, updateUserRole, deleteUser };
