const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const FRONTEND_URL = process.env.FRONTEND_URL || '*';
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

app.post('/api/submit', (req, res) => {
  const data = req.body;
  console.log('Received form submission:', data);
  // Simple processing example: echo back with a timestamp
  res.json({ success: true, received: data, timestamp: Date.now() });
});

app.get('/api', (req, res) => {
  res.json({ status: 'ok', message: 'Express backend is running' });
});

app.listen(PORT, '0.0.0.0', () => console.log(`Backend listening on http://0.0.0.0:${PORT}, allowed origin: ${FRONTEND_URL}`));
