const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

// Registrar un usuario (asigna el rol)
router.post("/register", register);

// Iniciar sesión
router.post("/login", login);

module.exports = router;
