import { FC, useState } from "react";
import PropTypes from "prop-types";
import "./BankAccount.css";
import Button from "../common/Button/Button";
import BalanceDisplay from "./BalanceDisplay/BalanceDisplay";
import MoneySendingForm from "./MoneySending/MoneySendingForm";
import TopUpForm from "./TopUp/TopUpForm";
import TransactionHistory from "./TransactionHistory/TransactionHistory";
import TransactionPopup from "./TransactionPopup/TransactionPopup";
import { validateEmail } from "../../../utils/validation";
import { apiService } from "../../../services/apiService";
import {
  Transaction,
  TransactionResponse,
} from "../../../interfaces/interfaces";

interface PopupContent {
  status: string;
  message: string;
}

interface BankAccountProps {
  balance: number;
}

const BankAccount: FC<BankAccountProps> = ({ balance: initialBalance }) => {
  const [isSendingMoneyVisible, setIsSendingMoneyVisible] = useState(false);
  const [isTopUpVisible, setIsTopUpVisible] = useState(false);
  const [balance, setBalance] = useState(initialBalance);
  const [popupContent, setPopupContent] = useState<PopupContent>({
    status: "",
    message: "",
  });
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleSendMoney = () => {
    setIsSendingMoneyVisible(true);
    setIsTopUpVisible(false);
  };

  const handleTopUp = () => {
    setIsSendingMoneyVisible(false);
    setIsTopUpVisible(true);
  };

  const handleTransactionSubmit = async (
    amount: number,
    recipientEmail: string
  ) => {
    try {
      if (!validateEmail(recipientEmail)) {
        showPopup("Error", "Invalid email format");
        return;
      }

      const response = await apiService.sendMoney({ amount, recipientEmail });
      handleTransactionResponse(response);
    } catch (error: any) {
      console.error("Error submitting transaction:", error.message);
    }
  };

  const handleTopUpTransactionSubmit = async (
    amount: number,
    incomeSource: string
  ) => {
    try {
      const response = await apiService.topUpMoney({ amount, incomeSource });
      handleTransactionResponse(response);
    } catch (error: any) {
      console.error("Error submitting top-up transaction:", error.message);
    }
  };

  const handleTransactionResponse = (response: TransactionResponse) => {
    const { transactionStatus, transactionMessage, newBalance } = response;
    setBalance(newBalance);
    setIsSendingMoneyVisible(false);
    setIsTopUpVisible(false);
    showPopup(transactionStatus, transactionMessage);
  };

  const showPopup = (status: string, message: string) => {
    setPopupContent({ status, message });
    setTimeout(() => {
      setPopupContent({ status: "", message: "" });
    }, 5000);
  };

  const closePopup = () => {
    setPopupContent({ status: "", message: "" });
  };

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsSendingMoneyVisible(true);
    setIsTopUpVisible(false);
  };

  return (
    <div className="bank-account-container">
      <BalanceDisplay balance={balance} />
      <div className="buttons-container">
        {isSendingMoneyVisible ? (
          <MoneySendingForm
            onSubmit={handleTransactionSubmit}
            initialAmount={selectedTransaction ? selectedTransaction.amount : 0}
            initialRecipientEmail={
              selectedTransaction ? selectedTransaction.receiver : ""
            }
            transaction={selectedTransaction}
          />
        ) : isTopUpVisible ? (
          <TopUpForm onSubmit={handleTopUpTransactionSubmit} />
        ) : (
          <>
            <Button onClick={handleSendMoney}>Send</Button>
            <Button onClick={handleTopUp}>Top-Up</Button>
          </>
        )}
      </div>
      <TransactionHistory onTransactionClick={handleTransactionClick} />
      {popupContent.status && (
        <TransactionPopup
          status={popupContent.status}
          message={popupContent.message}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

BankAccount.propTypes = {
  balance: PropTypes.number.isRequired,
};

export default BankAccount;
