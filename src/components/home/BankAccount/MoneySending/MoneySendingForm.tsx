import { FC, useState } from "react";
import Button from "../../common/Button/Button";
import { validateEmail , validateAmount } from "../../../../utils/validation";
import "./MoneySendingForm.css";

interface MoneySendingFormProps {
  onSubmit: (amount: number, recipientEmail: string) => void;
}

const MoneySendingForm: FC<MoneySendingFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [amountError, setAmountError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleTransactionSubmit = () => {
    setAmountError("");
    setEmailError("");

    if (!validateAmount(amount)) {
      setAmountError("Please enter a valid amount greater than 0.");
    }

    if (!validateEmail(recipientEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    onSubmit(parseFloat(amount), recipientEmail);
  };

  return (
    <div className="money-sending-form-container">
      <div className="label-container">
        <label htmlFor="amount" className="label">
          Amount:
        </label>
        <input
          type="text"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input-field"
        />
        {amountError && <div className="error-message">{amountError}</div>}
      </div>

      <div className="label-container">
        <label htmlFor="recipientEmail" className="label">
          Recipient's Email:
        </label>
        <input
          type="text"
          id="recipientEmail"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          className="input-field"
        />
        {emailError && <div className="error-message">{emailError}</div>}
      </div>

      <div className="button-container">
        <Button onClick={handleTransactionSubmit}>Submit transaction</Button>
      </div>
    </div>
  );
};

export default MoneySendingForm;
