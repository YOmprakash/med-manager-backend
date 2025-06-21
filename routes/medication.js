const express = require('express');
const dbMedication = require('../db/medDatabase');
const router = express.Router();


// Mark medication as taken
router.post("/medications/taken", (req, res) => {
  const { medication_id, date, proof_image } = req.body;
  dbMedications.run(`INSERT INTO medication_logs (medication_id, date, taken, proof_image) VALUES (?, ?, ?, ?)`,
    [medication_id, date, 1, proof_image || null],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    });
});
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


module.exports = router;
