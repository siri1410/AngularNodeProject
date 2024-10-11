from flask import Flask, render_template, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/bitcoin-price')
def bitcoin_price():
    try:
        response = requests.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        data = response.json()
        return jsonify(data)
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
