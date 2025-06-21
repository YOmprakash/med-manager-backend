const sqlite3 = require('sqlite3').verbose();
const dbMedication = new sqlite3.Database('./medication.db');


dbMedication.serialize(() => {
dbMedication.run(`
  CREATE TABLE IF NOT EXISTS medication (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER,
    name TEXT NOT NULL,
    dosage TEXT NOT NULL,
    frequency TEXT NOT NULL
  );
`);

});


module.exports = dbMedication;