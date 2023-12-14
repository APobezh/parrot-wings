import { FC, useState, useEffect } from "react";
import { fetchTransactionHistory, Transaction } from "../../../api/api";
import "./TransactionHistory.css";
import LoadingSpinner from "../../common/Spinner/LoadingSpinner";

const TransactionHistory: FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // TODO: Fix the issue with the expanded history component and not rewrited page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTransactionHistory({ page: currentPage });
        setTransactions(data.transactions);
        setTotalPages(data.totalPages);
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching transaction history");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <div className="transaction-history-container">
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((transaction: Transaction) => (
          <li
            key={transaction.id}
            className={transaction.sum < 0 ? "withdrawal" : "deposit"}
          >
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
