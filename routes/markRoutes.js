const express = require("express");
const { markAttendance, getRecords, getAllRecords } = require("../controllers/markController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Ruta para registrar asistencia
router.post("/mark", authMiddleware, markAttendance);

// ✅ Ruta para obtener registros de UN usuario
router.get("/records", authMiddleware, getRecords);

// ✅ Ruta para obtener TODOS los registros (solo ADMIN)
router.get("/all-records", authMiddleware, getAllRecords);

module.exports = router;
