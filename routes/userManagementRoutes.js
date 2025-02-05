const express = require("express");
const {
  getUsersController,
  updateUserRoleController,
  deleteUserController
} = require("../controllers/userManagementController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Obtener lista de usuarios (Solo ADMIN)
router.get("/", authMiddleware, getUsersController);

// ✅ Modificar el rol de un usuario (Solo ADMIN)
router.put("/:id/role", authMiddleware, updateUserRoleController);

// ✅ Eliminar un usuario (Solo ADMIN)
router.delete("/:id", authMiddleware, deleteUserController);

module.exports = router;
