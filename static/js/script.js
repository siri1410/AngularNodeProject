const { fromEvent, interval, merge } = rxjs;
const { switchMap, startWith, catchError, tap } = rxjs.operators;

const currentPriceElement = document.getElementById('current-price');
const historicalPricesElement = document.getElementById('historical-prices');
const errorMessage = document.getElementById('error-message');
const refreshBtn = document.getElementById('refresh-btn');

const fetchBitcoinPrice = () => {
  return fetch('/api/bitcoin-price')
    .then(response => response.json());
};

const formatPrice = (price) => {
  return `${price.code} ${price.symbol} ${price.rate}`;
};

const updateUI = (data) => {
  errorMessage.classList.add('d-none');
  
  // Update current price
  const currentPrice = data.current.bpi;
  currentPriceElement.innerHTML = `
    <p><strong>USD:</strong> ${formatPrice(currentPrice.USD)}</p>
    <p><strong>GBP:</strong> ${formatPrice(currentPrice.GBP)}</p>
    <p><strong>EUR:</strong> ${formatPrice(currentPrice.EUR)}</p>
    <p class="text-muted">Last updated: ${data.current.time.updated}</p>
  `;

  // Update historical prices
  historicalPricesElement.innerHTML = data.historical.map((item, index) => `
    <div class="card mb-3">
      <div class="card-body">
        <h6 class="card-subtitle mb-2 text-muted">Timestamp ${index + 1}: ${item.timestamp}</h6>
        <p><strong>USD:</strong> ${formatPrice(item.data.bpi.USD)}</p>
        <p><strong>GBP:</strong> ${formatPrice(item.data.bpi.GBP)}</p>
        <p><strong>EUR:</strong> ${formatPrice(item.data.bpi.EUR)}</p>
      </div>
    </div>
  `).join('');
};

const handleError = (error) => {
  console.error('Error fetching Bitcoin price:', error);
  errorMessage.textContent = 'Error fetching Bitcoin price. Please try again later.';
  errorMessage.classList.remove('d-none');
};

const refreshClick$ = fromEvent(refreshBtn, 'click');
const autoRefresh$ = interval(60000); // Auto refresh every 60 seconds

merge(refreshClick$, autoRefresh$)
  .pipe(
    startWith(null),
    switchMap(() => fetchBitcoinPrice()),
    tap(updateUI),
    catchError((error) => {
      handleError(error);
      return rxjs.EMPTY;
    })
  )
  .subscribe();
