const express = require("express");
const { configureSchedule } = require("../controllers/scheduleController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/schedule", authMiddleware, configureSchedule);

module.exports = router;
