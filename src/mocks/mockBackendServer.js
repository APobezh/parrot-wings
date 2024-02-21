const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

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

// Generate random transaction
const generateTransaction = () => ({
  id: Math.floor(Math.random() * 1000),
  date: new Date().toUTCString(),
  amount: Math.random() * 100,
  sender: 'john@example.com',
  receiver: 'bob@example.com',
});

// Mocked user list
const mockedUserList = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    balance: Math.random() * 100,
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob@example.com',
    balance: Math.random() * 100,
  },
  {
    id: 3,
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie@example.com',
    balance: Math.random() * 100,
  },
  {
    id: 4,
    firstName: 'David',
    lastName: 'Lee',
    email: 'david@example.com',
    balance: Math.random() * 100,
  },
  {
    id: 5,
    firstName: 'Emma',
    lastName: 'Davis',
    email: 'emma@example.com',
    balance: Math.random() * 100,
  },
  {
    id: 6,
    firstName: 'Frank',
    lastName: 'Garcia',
    email: 'frank@example.com',
    balance: Math.random() * 100,
  },
  {
    id: 7,
    firstName: 'Grace',
    lastName: 'Martinez',
    email: 'grace@example.com',
    balance: Math.random() * 100,
  },
  {
    id: 8,
    firstName: 'Henry',
    lastName: 'Young',
    email: 'henry@example.com',
    balance: Math.random() * 100,
  },
  {
    id: 9,
    firstName: 'Isabella',
    lastName: 'Lopez',
    email: 'isabella@example.com',
    balance: Math.random() * 100,
  },
  {
    id: 10,
    firstName: 'Jack',
    lastName: 'Hernandez',
    email: 'jack@example.com',
    balance: Math.random() * 100,
  },
];

// Mocked API endpoints
app.get('/api/User', (req, res) => {
  res.json(mockedUserList.find(user => user.id === 1));
});

app.get('/api/Users', (req, res) => {
  res.json(mockedUserList.filter(user => user.id !== 1));
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
  const transactions = Array.from({ length: 100 }, generateTransaction);
  const page = req.body.page || 1;
  const pageSize = 5;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTransactions = transactions.slice(startIndex, endIndex);
  const totalPages = Math.ceil(transactions.length / pageSize);

  res.json({
    transactions: paginatedTransactions,
    totalPages,
  });
});

// Mocked API endpoint to get list of users
app.get('/api/Users', (req, res) => {
  res.json(mockedUserList);
});

app.listen(port, () => {
  console.log(`Mock server is running at http://localhost:${port}`);
});
