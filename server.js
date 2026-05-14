const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const PORT = process.env.PORT || 3000;
const CONFIG_PATH = path.join(__dirname, 'config', 'report-config.json');
const DATA_PATH = path.join(__dirname, 'public', 'data.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/config', async (req, res) => {
  try {
    const text = await fs.readFile(CONFIG_PATH, 'utf8');
    res.json(JSON.parse(text));
  } catch (err) {
    res.status(500).json({ error: 'Unable to read config', detail: err.message });
  }
});

app.post('/api/config', async (req, res) => {
  try {
    const payload = req.body;
    const text = JSON.stringify(payload, null, 2);
    await fs.writeFile(CONFIG_PATH, text, 'utf8');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Unable to save config', detail: err.message });
  }
});

app.get('/api/data', async (req, res) => {
  try {
    const text = await fs.readFile(DATA_PATH, 'utf8');
    res.json(JSON.parse(text));
  } catch (err) {
    res.status(500).json({ error: 'Unable to read data', detail: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Light report demo running at http://localhost:${PORT}`);
});
