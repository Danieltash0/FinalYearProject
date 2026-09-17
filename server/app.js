require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'DairyDan backend is running', timestamp: new Date().toISOString() });
});

// Mount feature routes here as they're built, e.g.:
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/cattle', require('./routes/cattleRoutes'));

module.exports = app;
