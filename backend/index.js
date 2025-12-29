const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.post('/submit', (req, res) => {
  const data = req.body;
  console.log('Received form submission:', data);
  // Simple processing example: echo back with a timestamp
  res.json({ success: true, received: data, timestamp: Date.now() });
});

app.get('/', (req, res) => {
  res.send('Express backend is running');
});

app.listen(PORT, '0.0.0.0', () => console.log(`Backend listening on http://0.0.0.0:${PORT}`));
