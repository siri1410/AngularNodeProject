document.addEventListener('DOMContentLoaded', function() {
    const priceTableBody = document.getElementById('price-table-body');
    const lastUpdated = document.getElementById('last-updated');
    const errorMessage = document.getElementById('error-message');
    const refreshBtn = document.getElementById('refresh-btn');

    function fetchBitcoinPrice() {
        fetch('/api/bitcoin-price')
            .then(response => response.json())
            .then(data => {
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
            })
            .catch(error => {
                console.error('Error fetching Bitcoin price:', error);
                errorMessage.textContent = 'Error fetching Bitcoin price. Please try again later.';
                errorMessage.classList.remove('d-none');
            });
    }

    fetchBitcoinPrice();

    refreshBtn.addEventListener('click', fetchBitcoinPrice);
});
