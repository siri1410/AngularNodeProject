Prompt:
I need you to guide me through creating an Angular project with a Node.js backend, both within an Nx monorepo. The Angular frontend should fetch data from the CoinDesk API endpoint https://api.coindesk.com/v1/bpi/currentprice.json and display it.
Here's a sample JSON response from the API:
{
  "time": {
    "updated": "Oct 11, 2024 17:51:49 UTC",
    "updatedISO": "2024-10-11T17:51:49+00:00",
    "updateduk": "Oct 11, 2024 at 18:51 BST"
  },
  "disclaimer": "This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org",
  "chartName": "Bitcoin",
  "bpi": {
    "USD": {
      "code": "USD",
      "symbol": "&#36;",
      "rate": "62,749.979",
      "description": "United States Dollar",
      "rate_float": 62749.9787
    },
    "GBP": {
      "code": "GBP",
      "symbol": "&pound;",
      "rate": "48,001.851",
      "description": "British Pound Sterling",
      "rate_float": 48001.8512
    },
    "EUR": {
      "code": "EUR",
      "symbol": "&euro;",
      "rate": "57,332.648",
      "description": "Euro",
      "rate_float": 57332.6475
    }
  }
}

Specific Steps:
 * Nx Workspace Setup: Provide the command to create a new Nx workspace with Angular and Node.js capabilities.
 * Angular Application:  Give instructions on how to generate an Angular application within the workspace.
 * Node.js Backend: Explain how to create a simple Node.js Express application within the same workspace.
 * Proxy Configuration: Detail how to set up a proxy in the Angular application to forward API requests to the Node.js backend.
 * Backend API Route:  Show how to create an API endpoint in the Node.js application that fetches data from the provided CoinDesk API URL.
 * Angular Service: Guide me in creating an Angular service to make HTTP requests to the backend API endpoint.
 * Angular Component:  Explain how to create an Angular component that uses the service to fetch and display the Bitcoin price information in a user-friendly format (e.g., a table).
Bonus:
 * If possible, suggest a way to share TypeScript interfaces between the frontend and backend to maintain type consistency.
 * Provide commands for building and serving both the Angular and Node.js applications.
I'm looking forward to building this project with your help!
 * https://help.noteplan.co/article/146-add-a-webservice-to-templates
 * https://www.fop2.com/docs/tutorials/ivrflow-simpleapi/
