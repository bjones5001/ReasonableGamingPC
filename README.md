# ReasonableGamingPC

# Reasonable CPU/GPU Comparison App

This is a simple web application that allows you to compare the price-performance ratios of CPUs and GPUs. It provides information about the best CPU/GPU based on the lowest price per performance (PPD) and allows you to view the details of individual CPUs/GPUs and their performance compared to the best option.

## Features

- Fetches data from a MySQL database to display CPU/GPU information
- Calculates the price increase and performance increase of each CPU/GPU compared to the best option
- Allows selection of individual CPUs/GPUs for detailed comparison
- Provides a dropdown list to select CPUs/GPUs for comparison

## Technologies Used

- Node.js with Express for the server-side code
- React.js for the front-end user interface
- MySQL for the database
- Axios for making HTTP requests

## Getting Started

To get started with the Reasonable CPU/GPU Comparison App, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies by running `npm install`.
3. Set up a MySQL database and import the necessary tables and data.
4. Update the MySQL database configuration in `server.js` to match your setup.
5. Start the server by running `node server.js` or `npm start`.
6. Access the application in your web browser at `http://localhost:3000`.

## API Endpoints

- `GET /best-cpu`: Fetches the best CPU based on the lowest price per performance (PPD).
- `GET /cpus`: Fetches all CPUs and their comparison with the best CPU.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to modify and adapt this code for your own use. However, please note that while this code provides a starting point, it may require additional modifications and enhancements to suit your specific needs.

