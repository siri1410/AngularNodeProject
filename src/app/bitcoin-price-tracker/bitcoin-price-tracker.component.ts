import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bitcoin-price-tracker',
  templateUrl: './bitcoin-price-tracker.component.html',
  styleUrls: ['./bitcoin-price-tracker.component.css']
})
export class BitcoinPriceTrackerComponent implements OnInit {
  currentPrice: number | null = null;
  historicalPrices: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.refreshPrices();
  }

  refreshPrices() {
    // Fetch current price
    this.http.get<any>('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
      .subscribe(
        (data) => {
          this.currentPrice = data.bitcoin.usd;
        },
        (error) => {
          console.error('Error fetching current price:', error);
        }
      );

    // Fetch historical prices (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const fromDate = sevenDaysAgo.toISOString().split('T')[0];
    const toDate = new Date().toISOString().split('T')[0];

    this.http.get<any>(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${fromDate}&to=${toDate}`)
      .subscribe(
        (data) => {
          this.historicalPrices = data.prices.map((price: any) => ({
            date: new Date(price[0]),
            price: price[1]
          }));
        },
        (error) => {
          console.error('Error fetching historical prices:', error);
        }
      );
  }
}
