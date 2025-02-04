const db = require("../config/db");
const PDFDocument = require("pdfkit");
const excelJS = require("exceljs");
const { Parser } = require("json2csv");

// 📌 Función para exportar a PDF
const exportPDF = async (req, res) => {
  try {
    const [records] = await db.query("SELECT * FROM marks WHERE user_id = ?", [req.user.userId]);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=records.pdf");

    const doc = new PDFDocument();
    doc.pipe(res);

    doc.fontSize(20).text("Registros de Marcado", { align: "center" });
    doc.moveDown();

    if (records.length === 0) {
      doc.fontSize(14).text("No hay registros disponibles", { align: "center" });
    } else {
      records.forEach(record => {
        doc.fontSize(12).text(`ID: ${record.id}`);
        doc.text(`Nombre: ${record.name}`);
        doc.text(`Fecha: ${new Date(record.timestamp).toLocaleString()}`);
        doc.text(`Ubicación: ${record.lat}, ${record.lng}`);
        doc.text(`Estado: ${record.status}`);
        doc.moveDown();
      });
    }

    doc.end();
  } catch (err) {
    res.status(500).json({ message: "Error al exportar datos en PDF" });
  }
};

// 📌 Función para exportar a Excel
const exportExcel = async (req, res) => {
  try {
    const [records] = await db.query("SELECT * FROM marks WHERE user_id = ?", [req.user.userId]);
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Registros de Marcado");

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Nombre", key: "name", width: 20 },
      { header: "Fecha", key: "timestamp", width: 20 },
      { header: "Latitud", key: "lat", width: 15 },
      { header: "Longitud", key: "lng", width: 15 },
      { header: "Estado", key: "status", width: 15 }
    ];

    records.forEach((record) => {
      worksheet.addRow({
        id: record.id,
        name: record.name,
        timestamp: new Date(record.timestamp).toLocaleString(),
        lat: record.lat,
        lng: record.lng,
        status: record.status,
      });
    });

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=records.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).json({ message: "Error al exportar datos en Excel" });
  }
};

// 📌 Función para exportar a CSV
const exportCSV = async (req, res) => {
  try {
    const [records] = await db.query("SELECT * FROM marks WHERE user_id = ?", [req.user.userId]);
    const parser = new Parser({ fields: ["id", "user_id", "name", "timestamp", "lat", "lng", "status"] });
    const csv = parser.parse(records);

    res.header("Content-Type", "text/csv");
    res.attachment("records.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: "Error al exportar datos en CSV" });
  }
};

module.exports = { exportPDF, exportCSV, exportExcel }; // ✅ Asegúrate de exportar todas las funciones
