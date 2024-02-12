import { FC, useState, useEffect } from "react";
import { fetchTransactionHistory, Transaction } from "../../../api/api";
import "./TransactionHistory.css";
import LoadingSpinner from "../../common/Spinner/LoadingSpinner";

interface TransactionHistoryProps {
  onTransactionClick: (transaction: Transaction) => void;
}

const TransactionHistory: FC<TransactionHistoryProps> = ({ onTransactionClick }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async (page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const recordsPerPage = 5;
      const data = await fetchTransactionHistory({ page, recordsPerPage });
      setTransactions(data.transactions);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError("Error fetching transaction history");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  if (isLoading || error) {
    return isLoading ? <LoadingSpinner /> : <div>{error}</div>;
  }

  return (
    <div className="transaction-history-container">
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((transaction: Transaction) => (
          <li
            key={transaction.id}
            className={transaction.amount < 0 ? "negative" : "positive"}
            onClick={() => onTransactionClick(transaction)}
          >
            <div>Date: {transaction.date}</div>
            <div>Amount: {Math.abs(transaction.amount)} PW</div>
            <div>Sender: {transaction.sender}</div>
            <div>Receiver: {transaction.receiver}</div>
          </li>
        ))}
      </ul>

      <div className="pagination-container">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
