const express = require("express");
const { exportPDF, exportCSV, exportExcel } = require("../controllers/exportController"); 
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/pdf", authMiddleware, exportPDF);
router.get("/csv", authMiddleware, exportCSV);
router.get("/excel", authMiddleware, exportExcel);

module.exports = router; // ✅ Asegúrate de exportar correctamente el router
