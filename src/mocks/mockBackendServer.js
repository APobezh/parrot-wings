const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Mocked user data
const mockedUserData = {
  firstName: 'John',
  balance: Math.random() * 100,
};

// Mocked login response
const mockedLoginResponse = {
  message: 'Login successful',
};

// Mocked register response
const mockedRegisterResponse = {
  message: 'Register and Login successful',
};

// Mocked transaction response
const mockedTransactionResponse = {
  transactionStatus: 'success',
  transactionMessage: 'Transaction completed successfully',
  newBalance: Math.random() * 100,
};

// Mocked transaction response
const generateTransaction = () => ({
  id: Math.floor(Math.random() * 1000),
  date: new Date().toUTCString(),
  sum: Math.random() * 100,
  sender: 'johndoe@example.com',
  receiver: 'johndoejunior@example.com',
});

// Mocked API endpoints
app.get('/api/User', (req, res) => {
  res.json(mockedUserData);
});

app.post('/api/Login', (req, res) => {
  res.status(200).json(mockedLoginResponse);
});

app.post('/api/Register', (req, res) => {
  res.status(200).json(mockedRegisterResponse);
});

app.post('/api/Transaction/SendMoney', (req, res) => {
  res.json(mockedTransactionResponse);
});

app.post('/api/Transaction/TopUpMoney', (req, res) => {
  res.json(mockedTransactionResponse);
});

app.post('/api/Transactions/History', (req, res) => {
  let transactions = [];
  
  transactions.push(generateTransaction());
  transactions.push(generateTransaction());
  transactions.push(generateTransaction());
  transactions.push(generateTransaction());
  transactions.push(generateTransaction());
  transactions.push(generateTransaction());
  transactions.push(generateTransaction());
  transactions.push(generateTransaction());
  transactions.push(generateTransaction());
  transactions.push(generateTransaction());
  transactions.push(generateTransaction());
  transactions.push(generateTransaction());

  const totalPages = 2;
  const page = 1;
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTransactions = transactions.slice(startIndex, endIndex);

  res.json({
    transactions: paginatedTransactions,
    totalPages,
  });
});


app.listen(port, () => {
  console.log(`Mock server is running at http://localhost:${port}`);
});
