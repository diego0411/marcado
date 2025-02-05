const express = require("express");
const { configureSchedule } = require("../controllers/scheduleController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Solo los ADMIN pueden configurar el horario
router.post("/set", authMiddleware, (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "⚠️ Solo los administradores pueden configurar horarios." });
  }
  configureSchedule(req, res, next);
});

module.exports = router;
