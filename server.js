const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Dummy data
let fleetData = [
  { type: 'Trucks', count: 12 },
  { type: 'Vans', count: 19 },
  { type: 'Bikes', count: 7 },
  { type: 'Cars', count: 5 }
];

let trackingData = [
  { id: 1, vehicle: 'Truck #12', status: 'On Route', lastUpdate: new Date() },
  { id: 2, vehicle: 'Van #19', status: 'Idle', lastUpdate: new Date() }
];

// API routes
app.get('/api/fleet', (req, res) => {
  res.json(fleetData);
});

app.get('/api/tracking', (req, res) => {
  trackingData = trackingData.map(t => ({
    ...t,
    lastUpdate: new Date()
  }));
  res.json(trackingData);
});

app.post('/api/support', (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message required' });
  }
  console.log(`Support message from ${name}: ${message}`);
  res.json({ success: true, msg: 'Support request received' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
