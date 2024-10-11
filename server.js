const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());

// Serve static files from the 'static' directory
app.use('/static', express.static(path.join(__dirname, 'static')));

// Serve index.html for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.get('/api/bitcoin-price', async (req, res) => {
  try {
    const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Bitcoin price' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
