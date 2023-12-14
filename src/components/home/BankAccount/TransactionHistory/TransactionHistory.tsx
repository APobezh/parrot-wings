// TransactionHistory.tsx
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import './TransactionHistory.css';
import LoadingSpinner from '../../common/Spinner/LoadingSpinner';


interface Transaction {
  id: number;
  date: string;
  sum: number;
  sender: string;
  receiver: string;
}

const fetchTransactionHistory = async (page: number) => {
  const response = await axios.get(`YOUR_BACKEND_API_ENDPOINT?page=${page}`);
  return response.data;
};

const TransactionHistory: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery(['transactions', currentPage], () =>
    fetchTransactionHistory(currentPage)
  );

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error fetching transaction history</div>;

  const { transactions, totalPages } = data;

  return (
    <div className="transaction-history-container">
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((transaction: Transaction) => (
          <li key={transaction.id} className={transaction.sum < 0 ? 'withdrawal' : 'deposit'}>
            <span>Date: {transaction.date}</span>
            <span>Sum: ${Math.abs(transaction.sum)}</span>
            <span>Sender: {transaction.sender}</span>
            <span>Receiver: {transaction.receiver}</span>
          </li>
        ))}
      </ul>

      <div className="pagination-container">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
