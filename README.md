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

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed correctly.
2. Check the console for any error messages.
3. Ensure the CoinDesk API is accessible and responding.

## Contributing

Feel free to submit issues and pull requests to improve the project.

## License

This project is open-source and available under the MIT License.
