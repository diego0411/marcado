require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const markRoutes = require("./routes/markRoutes");
const exportRoutes = require("./routes/exportRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// ✅ Rutas
app.use("/auth", authRoutes);
app.use("/marking", markRoutes);
app.use("/export", exportRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
