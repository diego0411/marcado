const { getUsers, updateUserRole, deleteUser } = require("../models/userManagementModel");

// ✅ Obtener la lista de usuarios (Solo ADMIN)
const getUsersController = async (req, res) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "⚠️ Solo los administradores pueden ver la lista de usuarios." });
  }

  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error);
    res.status(500).json({ message: "❌ Error en el servidor." });
  }
};

// ✅ Modificar el rol de un usuario (Solo ADMIN)
const updateUserRoleController = async (req, res) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "⚠️ Solo los administradores pueden modificar roles." });
  }

  const { id } = req.params;
  const { role } = req.body;

  if (!["ADMIN", "PLANILLA", "CONTRATISTA"].includes(role)) {
    return res.status(400).json({ message: "⚠️ Rol no válido." });
  }

  try {
    await updateUserRole(id, role);
    res.json({ message: "✅ Rol actualizado correctamente." });
  } catch (error) {
    console.error("❌ Error al modificar rol:", error);
    res.status(500).json({ message: "❌ Error en el servidor." });
  }
};

// ✅ Eliminar un usuario (Solo ADMIN)
const deleteUserController = async (req, res) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "⚠️ Solo los administradores pueden eliminar usuarios." });
  }

  const { id } = req.params;

  try {
    await deleteUser(id);
    res.json({ message: "✅ Usuario eliminado correctamente." });
  } catch (error) {
    console.error("❌ Error al eliminar usuario:", error);
    res.status(500).json({ message: "❌ Error en el servidor." });
  }
};

module.exports = { getUsersController, updateUserRoleController, deleteUserController };
