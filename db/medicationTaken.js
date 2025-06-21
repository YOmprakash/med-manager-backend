const sqlite3 = require('sqlite3').verbose();

const dbMedicationTaken = new sqlite3.Database('./medicationTaken.db');

dbMedicationTaken.serialize(() => {
dbMedicationTaken.run(`
CREATE TABLE IF NOT EXISTS medication_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  medication_id INTEGER,
  date TEXT,
  taken INTEGER DEFAULT 0,
  proof_image TEXT,
  FOREIGN KEY(medication_id) REFERENCES medication(id)
);
    `);
})

module.exports = dbMedicationTaken;
