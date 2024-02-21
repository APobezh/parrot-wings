import { FC, useState, useEffect } from "react";
import "./TransactionHistory.css";
import LoadingSpinner from "../../common/Spinner/LoadingSpinner";
import TransactionList from "./TransactionList/TransactionList";
import Pagination from "./Pagination/Pagination";
import { Transaction } from "../../../../interfaces/interfaces";
import { apiService } from "../../../../services/apiService";

interface TransactionHistoryProps {
  onTransactionClick: (transaction: Transaction) => void;
}

const TransactionHistory: FC<TransactionHistoryProps> = ({
  onTransactionClick,
}) => {
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
      const data = await apiService.fetchTransactionHistory({
        page,
        recordsPerPage,
      });
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

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="transaction-history-wrapper">
      <h2>Transaction History</h2>
      <TransactionList
        transactions={transactions}
        onTransactionClick={onTransactionClick}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageClick={handlePageClick}
      />
    </div>
  );
};

export default TransactionHistory;
