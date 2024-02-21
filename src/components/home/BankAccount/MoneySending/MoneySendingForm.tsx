import { FC, useState, useEffect } from "react";
import Button from "../../common/Button/Button";
import { validateAmount } from "../../../../utils/validation";
import { UserDataResponse } from "../../../../interfaces/interfaces";
import { apiService } from "../../../../services/apiService";
import { Transaction } from "../../../../interfaces/interfaces";

interface MoneySendingFormProps {
  onSubmit: (amount: number, recipientEmail: string) => void;
  initialAmount?: number;
  initialRecipientEmail?: string;
  transaction: Transaction | null;
}

const MoneySendingForm: FC<MoneySendingFormProps> = ({
  onSubmit,
  initialAmount = 0,
  initialRecipientEmail = "",
  transaction
}) => {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [recipientEmail, setRecipientEmail] = useState<string>(
    initialRecipientEmail
  );
  const [users, setUsers] = useState<UserDataResponse[]>([]);
  const [amountError, setAmountError] = useState<string>("");

  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount);
      setRecipientEmail(transaction.receiver);
    } else {
      setAmount(0);
      setRecipientEmail('');
    }
  }, [transaction]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await apiService.fetchUsersData();
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAmountError("");

    if (!validateAmount(parseFloat(amount.toString()))) {
      setAmountError("Please enter a valid amount greater than 0.");
      return;
    }

    onSubmit(parseFloat(amount.toString()), recipientEmail);
  };

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
          className="input-field"
        />
        {amountError && <div className="error-message">{amountError}</div>}
      </div>

      <div className="label-container">
        <label htmlFor="recipientEmail" className="label">
          Select Recipient:
        </label>
        <select
          id="recipientEmail"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          className="input-field"
        >
          <option value="">Select recipient...</option>
          {users.map((user) => (
            <option
              key={user.id}
              value={user.email}
              selected={user.email === initialRecipientEmail}
            >
              {`${user.firstName} ${user.lastName} (${user.email})`}
            </option>
          ))}
        </select>
      </div>

      <div className="button-container">
        <Button onClick={handleTransactionSubmit}>Submit transaction</Button>
      </div>
    </div>
  );
};

export default MoneySendingForm;
