const express = require('express');
const dbMedication = require('../db/medDatabase');
const router = express.Router();

// Add medication (Caretaker adds for patient)
router.post("/medications/add", (req, res) => {
  const { patient_id, name, dosage, frequency } = req.body;

  console.log("🟡 Received medication form:", req.body);

  if (!patient_id || !name || !dosage || !frequency) {
    console.error("🔴 Validation failed: Missing fields");
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `
    INSERT INTO medication (patient_id, name, dosage, frequency)
    VALUES (?, ?, ?, ?)
  `;

  dbMedication.run(query, [patient_id, name, dosage, frequency], function (err) {
    if (err) {
      console.error("🔴 DB Error:", err.message);
      return res.status(500).json({ error: err.message }); // 🔴 Shows in frontend
    }

    console.log("🟢 Medication inserted with ID:", this.lastID);
    res.status(201).json({
      success: true,
      message: "Medication added successfully",
      medicationId: this.lastID,
    });
  });
});

// Get all medications
router.get("/medications/list", (req, res) => {
  const query = `SELECT * FROM medication`;

  dbMedication.all(query, [], (err, rows) => {
    if (err) {
      console.error("🔴 Error fetching medications:", err.message);
      return res.status(500).json({ error: "Failed to fetch medications" });
    }

    res.status(200).json(rows);
  });
});


module.exports = router;
