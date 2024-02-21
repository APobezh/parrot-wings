import { FC } from "react";
import "./TransactionList.css";
import { Transaction } from "../../../../../interfaces/interfaces";

interface TransactionListProps {
  transactions: Transaction[];
  onTransactionClick: (transaction: Transaction) => void;
}

const TransactionList: FC<TransactionListProps> = ({
  transactions,
  onTransactionClick,
}) => {
  return (
    <div className="transaction-list-container">
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
    </div>
  );
};

export default TransactionList;
