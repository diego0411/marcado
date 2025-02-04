const { setSchedule, getScheduleByUserId } = require("../models/scheduleModel");

const configureSchedule = async (req, res) => {
  const { arrivalTime, departureTime } = req.body;
  try {
    await setSchedule(req.user.userId, arrivalTime, departureTime);
    res.json({ message: "Horario actualizado con éxito" });
  } catch (err) {
    res.status(500).json({ message: "Error al configurar horario" });
  }
};

module.exports = { configureSchedule };
