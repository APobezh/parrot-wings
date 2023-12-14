import { FC, useState } from "react";
import "./BankAccount.css";
import Button from "../common/Button/Button";
import BalanceDisplay from "./BalanceDisplay/BalanceDisplay";
import MoneySendingForm from "./MoneySending/MoneySendingForm";
import TransactionPopup from "./TransactionPopup/TransactionPopup";
import validateEmail from "../../../utils/validation";
import { sendMoney, TransactionResponse } from "../../api/api";

interface BankAccountProps {
  balance: number;
}

const BankAccount: FC<BankAccountProps> = ({
  balance: initialBalance,
}) => {
  const [isSendingMoney, setIsSendingMoney] = useState(false);
  const [balance, setBalance] = useState(initialBalance);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState<{
    status: string;
    message: string;
  }>({ status: "", message: "" });

  const handleSendMoney = () => {
    setIsSendingMoney(true);
  };

  const handleTopUp = () => {
    // TODO: Implement logic to top up money
  };

  const handleTransactionSubmit = async (
    amount: number,
    recipientEmail: string
  ) => {
    try {
      if (!validateEmail(recipientEmail)) {
        setPopupContent({ status: "Error", message: "Invalid email format" });
        setPopupVisible(true);
        return;
      }

      const transactionData = { amount, recipientEmail };
      const response = await sendMoney(transactionData);

      handleTransactionResponse(response);
    } catch (error: any) {
      console.error("Error submitting transaction:", error.message);
    }
  };

  const handleTransactionResponse = (response: TransactionResponse) => {
    const { transactionStatus, transactionMessage, newBalance } = response;

    setBalance(newBalance);
    setIsSendingMoney(false);

    setPopupContent({ status: transactionStatus, message: transactionMessage });
    setPopupVisible(true);

    setTimeout(() => {
      setPopupVisible(false);
    }, 5000);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="bank-account-container">
      <BalanceDisplay balance={balance} />
      <div className="buttons-container">
        {isSendingMoney ? (
          <MoneySendingForm onSubmit={handleTransactionSubmit} />
        ) : (
          <>
            <Button onClick={handleSendMoney}>Send</Button>
            <Button onClick={handleTopUp}>Top-Up</Button>
          </>
        )}
      </div>
      {popupVisible && (
        <TransactionPopup
          status={popupContent.status}
          message={popupContent.message}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default BankAccount;
