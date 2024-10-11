# Bitcoin Price Tracker

This project is a simple Bitcoin Price Tracker that displays the current and historical Bitcoin prices in USD, GBP, and EUR. It uses Node.js for the backend and vanilla JavaScript with RxJS for the frontend.

## Features

- Real-time Bitcoin price updates
- Historical price tracking (last 3 updates)
- Automatic refresh every 60 seconds
- Manual refresh option

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm (usually comes with Node.js)

## Setup

1. Clone the repository or download the project files.

2. Navigate to the project directory in your terminal.

3. Install the required dependencies:
   ```
   npm install
   ```

4. Start the server:
   ```
   node server.js
   ```

5. Open your web browser and go to `http://localhost:3000` to view the application.

## Project Structure

- `server.js`: Node.js backend server
- `static/js/script.js`: Frontend JavaScript code
- `templates/index.html`: HTML template for the web page
- `package.json`: Project dependencies and scripts

## How It Works

1. The Node.js server fetches Bitcoin price data from the CoinDesk API.
2. The server stores the last 3 price updates as historical data.
3. The frontend uses RxJS to manage data flow and updates.
4. The UI displays the current price and the last 3 historical prices.
5. Prices are automatically refreshed every 60 seconds.
6. Users can manually refresh prices using the "Refresh Prices" button.

## Local Testing

To test the application locally:

1. Make sure you have completed the setup steps mentioned above.
2. Open a terminal and navigate to the project directory.
3. Start the server by running:
   ```
   node server.js
   ```
4. Open a web browser and go to `http://localhost:3000`.
5. You should see the Bitcoin Price Tracker interface.
6. Test the following functionalities:
   - Initial load of current and historical prices
   - Manual refresh using the "Refresh Prices" button
   - Automatic refresh every 60 seconds
   - Error handling (e.g., disconnecting from the internet temporarily)

## Troubleshooting TLS/SSL Errors

If you encounter TLS/SSL errors when fetching data from the CoinDesk API, try the following steps:

1. Update Node.js: Ensure you're using the latest stable version of Node.js, as older versions might have outdated SSL certificates.

2. Check your system time: Incorrect system time can cause SSL certificate validation failures. Make sure your system clock is set correctly.

3. Verify your internet connection: An unstable or restricted internet connection might cause SSL handshake failures.

4. Disable SSL verification (not recommended for production):
   If the above steps don't work, you can temporarily disable SSL verification for testing purposes. Add the following option to the axios request in `server.js`:

   ```javascript
   const https = require('https');
   const httpsAgent = new https.Agent({ rejectUnauthorized: false });
   const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json', { 
     httpsAgent,
     timeout: 5000 
   });
   ```

   Note: This is not secure and should only be used for local testing. Never use this in a production environment.

5. Use a proxy: If your network has strict security policies, you might need to use a proxy to access external APIs. Configure the axios instance to use a proxy:

   ```javascript
   const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json', {
     proxy: {
       host: 'proxy.example.com',
       port: 8080
     },
     timeout: 5000
   });
   ```

6. Check for antivirus interference: Some antivirus software might interfere with SSL connections. Temporarily disable your antivirus to check if it's causing the issue.

If you're still experiencing issues after trying these steps, please check the console for specific error messages and seek help from the project maintainers or the Node.js community.

## Contributing

Feel free to submit issues and pull requests to improve the project.

## License

This project is open-source and available under the MIT License.
