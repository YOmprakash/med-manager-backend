const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth');
const medRoutes = require('./routes/medication')
const medTaken = require('./routes/medicationTaken')

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/med',medRoutes)
app.use('/api/medTaken',medTaken)

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
