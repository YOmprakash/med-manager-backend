// backend/routes/medication.js
const express = require("express");
const router = express.Router();
const db = require("../db/medicationTaken"); // should export both medication and log DBs if separate

// Mark medication as taken (with optional image)
router.post("/medications/taken", (req, res) => {
  const { medication_id, date, proof_image } = req.body;

  if (!medication_id || !date) {
    return res.status(400).json({ error: "medication_id and date are required" });
  }

  const query = `
    INSERT INTO medication_logs (medication_id, date, taken, proof_image)
    VALUES (?, ?, ?, ?)
  `;

  db.run(query, [medication_id, date, 1, proof_image || null], function (err) {
    if (err) {
      console.error("🔴 Failed to mark medication as taken:", err.message);
      return res.status(500).json({ error: err.message });
    }

    console.log("🟢 Marked medication as taken:", medication_id, "on", date);
    res.status(201).json({ success: true, logId: this.lastID });
  });
});

module.exports = router;
