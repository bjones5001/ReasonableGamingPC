const express = require('express');
const path = require('path');
const mysql = require('mysql');

const app = express();
const port = 3001;

// MySQL database connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'brian',
  password: 'rgpc',
  database: 'rgpc'
};

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Serve the static files from the React build
app.use(express.static(path.join(__dirname, 'client/build')));

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Define a route to fetch the best CPU based on price-performance ratio
app.get('/best-cpu', (req, res) => {
  // Query to fetch the best CPU based on price-performance
  const query = `
    SELECT CPU, RP, Price, PPD
    FROM cpu
    ORDER BY PPD ASC
    LIMIT 1
  `;

  // Execute the query using the connection pool
  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Send the result as JSON
    res.json(results[0]);
  });
});

// Define a route to fetch all CPUs and their comparison with the best CPU
app.get('/cpus', (req, res) => {
  // Query to fetch all CPUs and their comparison with the best CPU
  const query = `
    SELECT CPU, RP, Price, PPD, ((Price - (SELECT Price FROM cpu ORDER BY PPD ASC LIMIT 1)) / (SELECT Price FROM cpu ORDER BY PPD ASC LIMIT 1)) * 100 AS Price_increase, ((RP - (SELECT RP FROM cpu ORDER BY PPD ASC LIMIT 1)) / (SELECT RP FROM cpu ORDER BY PPD ASC LIMIT 1)) * 100 AS Performance_increase
    FROM cpu
    ORDER BY PPD ASC
  `;

  // Execute the query using the connection pool
  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Send the result as JSON
    res.json(results);
  });
});

// Serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

