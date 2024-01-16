import { FC, useState, useEffect } from "react";
import Button from "../../common/Button/Button";
import { validateEmail, validateAmount } from "../../../../utils/validation";
import "./MoneySendingForm.css";

interface MoneySendingFormProps {
  onSubmit: (amount: number, recipientEmail: string) => void;
  initialAmount?: number;
  initialRecipientEmail?: string;
}

const MoneySendingForm: FC<MoneySendingFormProps> = ({
  onSubmit,
  initialAmount = 0,
  initialRecipientEmail = '',
}) => {
  const [amount, setAmount] = useState(initialAmount);
  const [recipientEmail, setRecipientEmail] = useState(initialRecipientEmail);
  const [amountError, setAmountError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleTransactionSubmit = () => {
    setAmountError("");
    setEmailError("");

    if (!validateAmount(parseFloat(amount.toString()))) {
      setAmountError("Please enter a valid amount greater than 0.");
    }

    if (!validateEmail(recipientEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    onSubmit(parseFloat(amount.toString()), recipientEmail);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTransactionSubmit();
    }
  };

  useEffect(() => {
    setAmount(initialAmount);
    setRecipientEmail(initialRecipientEmail);
  }, [initialAmount, initialRecipientEmail]);

  return (
    <div className="money-sending-form-container">
      <div className="label-container">
        <label htmlFor="amount" className="label">
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          onKeyDown={handleKeyDown}
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
        <Button
          onClick={handleTransactionSubmit}
          disabled={!!amountError || !!emailError}
        >
          Submit transaction
        </Button>
      </div>
    </div>
  );
};

export default MoneySendingForm;
