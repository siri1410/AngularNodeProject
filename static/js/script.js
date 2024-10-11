console.log('Script started loading');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  const { fromEvent, interval, merge } = rxjs;
  const { switchMap, startWith, catchError, tap } = rxjs.operators;

  const currentPriceElement = document.getElementById('current-price');
  const historicalPricesElement = document.getElementById('historical-prices');
  const errorMessage = document.getElementById('error-message');
  const refreshBtn = document.getElementById('refresh-btn');

  console.log('DOM elements:', {
    currentPriceElement,
    historicalPricesElement,
    errorMessage,
    refreshBtn
  });

  if (!refreshBtn) {
    console.error('Refresh button not found!');
    return;
  }

  const fetchBitcoinPrice = () => {
    const apiUrl = '/api/bitcoin-price';
    console.log('Fetching Bitcoin price from:', apiUrl);
    return fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Received data:', data);
        return data;
      })
      .catch(error => {
        console.error('Error in fetchBitcoinPrice:', error);
        throw error;
      });
  };

  const formatPrice = (price) => {
    return `${price.code} ${price.symbol} ${price.rate}`;
  };

  const updateUI = (data) => {
    console.log('Updating UI with data:', data);
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
      <div class="historical-price-card card mb-3">
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">Timestamp ${index + 1}: ${new Date(item.timestamp).toLocaleString()}</h6>
          <p><strong>USD:</strong> ${formatPrice(item.data.bpi.USD)}</p>
          <p><strong>GBP:</strong> ${formatPrice(item.data.bpi.GBP)}</p>
          <p><strong>EUR:</strong> ${formatPrice(item.data.bpi.EUR)}</p>
        </div>
      </div>
    `).join('');
  };

  const handleError = (error) => {
    console.error('Error fetching Bitcoin price:', error);
    errorMessage.textContent = `Error fetching Bitcoin price: ${error.message}. Please try again later.`;
    errorMessage.classList.remove('d-none');
  };

  const refreshClick$ = fromEvent(refreshBtn, 'click');
  const autoRefresh$ = interval(60000); // Auto refresh every 60 seconds

  console.log('Setting up RxJS observables...');

  merge(refreshClick$, autoRefresh$)
    .pipe(
      startWith(null),
      tap(() => {
        console.log('Refresh triggered');
        refreshBtn.disabled = true;
        refreshBtn.textContent = 'Refreshing...';
      }),
      switchMap(() => fetchBitcoinPrice()),
      tap(updateUI),
      catchError((error) => {
        handleError(error);
        return rxjs.EMPTY;
      }),
      tap(() => {
        refreshBtn.disabled = false;
        refreshBtn.textContent = 'Refresh Prices';
      })
    )
    .subscribe();

  console.log('Script fully loaded and running');
});

console.log('Script finished loading');
