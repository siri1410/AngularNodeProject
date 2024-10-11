from flask import Flask, render_template, jsonify
import requests
from datetime import datetime, timedelta
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)

# Store historical data
historical_data = []

def fetch_bitcoin_price():
    try:
        response = requests.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        data = response.json()
        logging.debug(f"CoinDesk API response: {data}")
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        historical_data.append({"timestamp": timestamp, "data": data})
        
        # Keep only the last 3 data points
        if len(historical_data) > 3:
            historical_data.pop(0)
        
        return data
    except requests.RequestException as e:
        logging.error(f"Error fetching Bitcoin price: {str(e)}")
        return {"error": str(e)}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/bitcoin-price')
def bitcoin_price():
    current_data = fetch_bitcoin_price()
    response_data = {
        "current": current_data,
        "historical": historical_data
    }
    logging.debug(f"API response: {response_data}")
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
