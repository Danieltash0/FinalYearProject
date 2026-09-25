require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'DairyDan backend is running', timestamp: new Date().toISOString() });
});

app.use('/api/auth', require('./routes/authRoutes'));

// Mount other feature routes here as they're built, e.g.:
// app.use('/api/cattle', require('./routes/cattleRoutes'));

module.exports = app;
