// Import required modules
const http = require("http");
const url = require("url");

// Create a HTTP server
const server = http.createServer((req, res) => {
  // Parse the URL
  const { pathname, query } = url.parse(req.url, true);

  // If the request is for the root path
  if (pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <html>
      <head>
        <title>Simple Calculator</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
          }
          h1 {
            text-align: center;
            margin-top: 20px;
          }
          form {
            width: 300px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          label {
            display: block;
            margin-bottom: 5px;
          }
          input[type="text"],
          select {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 3px;
            box-sizing: border-box;
          }
          button {
            width: 100%;
            padding: 10px;
            background-color: #4caf50;
            color: #fff;
            border: none;
            border-radius: 3px;
            cursor: pointer;
          }
          button:hover {
            background-color: #45a049;
          }
          .result {
            width: 300px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
        </style>
      </head>
      <body>
        <h1>Simple Calculator</h1>
        <form action="/calculate" method="get">
          <label for="firstNumber">First number:</label>
          <input type="text" name="firstNumber" id="firstNumber" required><br>
          <label for="secondNumber">Second number:</label>
          <input type="text" name="secondNumber" id="secondNumber" required><br>
          <label for="method">Method:</label>
          <select name="method" id="method">
            <option value="add"> + </option>
            <option value="subtract"> - </option>
            <option value="multiply"> * </option>
            <option value="divide">  / </option>
          </select><br>
          <button type="submit">Calculate</button>
        </form>
      </body>
      </html>
    `);
  }

  // If the request is for the calculate path
  else if (pathname === "/calculate") {
    // Extract parameters from query string
    const { method, firstNumber, secondNumber } = query;
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    // Calculate result based on the method
    const operations = {
      add: (n1, n2) => n1 + n2,
      subtract: (n1, n2) => n1 - n2,
      multiply: (n1, n2) => n1 * n2,
      divide: (n1, n2) => (n2 !== 0 ? n1 / n2 : "Error: Division by zero"),
    };

    const operation = operations[method];
    const result = operation ? operation(num1, num2) : "Invalid method";

    // Display the result
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <html>
      <head>
        <title>Simple Calculator</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
          }
          h1 {
            text-align: center;
            margin-top: 20px;
          }
          .result {
            width: 300px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
        </style>
      </head>
      <body>
        <h1>Simple Calculator Result</h1>
        <div class="result">
          <p>${num1} ${method} ${num2} = ${result}</p>
          <a href="/">Back to Calculator</a>
        </div>
      </body>
      </html>
    `);
  }

  // If the request is for an unknown path
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
