import { FC, useState } from "react";
import Button from "../../common/Button/Button";
import validateEmail from "../../../../utils/validation";

interface MoneySendingFormProps {
  onSubmit: (amount: number, recipientEmail: string) => void;
}

// TODO: Add styles
const MoneySendingForm: FC<MoneySendingFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");

  const handleTransactionSubmit = () => {
    if (!validateEmail(recipientEmail)) {
      // Handle invalid email format
      return;
    }

    onSubmit(parseFloat(amount), recipientEmail);
  };

  return (
    <div>
      <label htmlFor="amount">Amount:</label>
      <input
        type="text"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <label htmlFor="recipientEmail">Recipient's Email:</label>
      <input
        type="text"
        id="recipientEmail"
        value={recipientEmail}
        onChange={(e) => setRecipientEmail(e.target.value)}
      />
      <Button onClick={handleTransactionSubmit}>Submit transaction</Button>
    </div>
  );
};

export default MoneySendingForm;
