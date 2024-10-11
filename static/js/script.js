const { fromEvent, interval, merge } = rxjs;
const { switchMap, startWith, catchError, tap } = rxjs.operators;

const priceTableBody = document.getElementById('price-table-body');
const lastUpdated = document.getElementById('last-updated');
const errorMessage = document.getElementById('error-message');
const refreshBtn = document.getElementById('refresh-btn');

const fetchBitcoinPrice = () => {
  return fetch('/api/bitcoin-price')
    .then(response => response.json());
};

const updateUI = (data) => {
  errorMessage.classList.add('d-none');
  priceTableBody.innerHTML = '';
  
  for (const [currency, details] of Object.entries(data.bpi)) {
    const row = `
      <tr>
        <td>${details.code} (${details.description})</td>
        <td>${details.rate} ${details.symbol}</td>
      </tr>
    `;
    priceTableBody.innerHTML += row;
  }

  lastUpdated.textContent = `Last updated: ${data.time.updated}`;
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
