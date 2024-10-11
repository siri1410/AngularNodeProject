// Simple JavaScript server (to be run in the browser)
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());

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
