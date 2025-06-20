const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db/database');
const dbMedications = require('../db/database');
const router = express.Router();

//Signup
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) return res.status(400).json({ error: 'All fields are required' });

  const hashedPassword = bcrypt.hashSync(password, 10);
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

  db.run(query, [name, email, hashedPassword], function (err) {
    if (err) return res.status(500).json({ error: 'User already exists or DB error' });
    return res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
  });
});



// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });

    res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
  });
});

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

module.exports = router;
