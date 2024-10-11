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

// Store historical prices
let historicalPrices = [];

const fetchBitcoinPrice = async (retries = 3) => {
  try {
    const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json', { timeout: 5000 });
    return response.data;
  } catch (error) {
    console.error(`Error fetching Bitcoin price (attempt ${4 - retries}):`, error.message);
    if (retries > 0) {
      console.log(`Retrying... (${retries} attempts left)`);
      return fetchBitcoinPrice(retries - 1);
    }
    throw error;
  }
};

app.get('/api/bitcoin-price', async (req, res) => {
  try {
    const currentPrice = await fetchBitcoinPrice();

    // Add current price to historical prices
    historicalPrices.push({
      timestamp: new Date().toISOString(),
      data: currentPrice
    });

    // Keep only the last 3 historical prices
    if (historicalPrices.length > 3) {
      historicalPrices = historicalPrices.slice(-3);
    }

    res.json({
      current: currentPrice,
      historical: historicalPrices
    });
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error.message);
    res.status(500).json({ 
      error: 'Error fetching Bitcoin price. Please try again later.',
      details: error.message
    });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
