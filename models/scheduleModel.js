const db = require("../config/db");

const setSchedule = async (arrivalTime, departureTime) => {
  await db.query(
    "INSERT INTO schedules (id, arrival_time, departure_time) VALUES (1, ?, ?) ON DUPLICATE KEY UPDATE arrival_time=?, departure_time=?",
    [arrivalTime, departureTime, arrivalTime, departureTime]
  );
};

const getScheduleByUserId = async (userId) => {
  const [schedule] = await db.query("SELECT arrival_time, departure_time FROM schedules WHERE user_id = ?", [userId]);
  return schedule[0];
};

module.exports = { setSchedule, getScheduleByUserId };