import React, { FC, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../../common/Button/Button";
import { validateAmount, validateEmail } from "../../../../utils/validation";
import {
  UserDataResponse,
  Transaction,
} from "../../../../interfaces/interfaces";
import { apiService } from "../../../../services/apiService";

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
  transaction,
}) => {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [recipientEmail, setRecipientEmail] = useState<string>(
    initialRecipientEmail
  );
  const [users, setUsers] = useState<UserDataResponse[]>([]);
  const [amountError, setAmountError] = useState<string>("");

  useEffect(() => {
    if (transaction) {
      const { amount, receiver } = transaction;
      setAmount(amount);
      setRecipientEmail(receiver);
    } else {
      setAmount(initialAmount);
      setRecipientEmail(initialRecipientEmail);
    }
  }, [transaction, initialAmount, initialRecipientEmail]);

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

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleRecipientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRecipientEmail(e.target.value);
  };

  const handleTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAmountError("");

    if (!validateAmount(amount)) {
      setAmountError("Please enter a valid amount greater than 0.");
      return;
    }

    if (!validateEmail(recipientEmail)) {
      setAmountError("Please select a valid recipient email.");
      return;
    }

    onSubmit(amount, recipientEmail);
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
          onChange={handleAmountChange}
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
          onChange={handleRecipientChange}
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

MoneySendingForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialAmount: PropTypes.number,
  initialRecipientEmail: PropTypes.string,
  transaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    sender: PropTypes.string.isRequired,
    receiver: PropTypes.string.isRequired,
  }),
};

export default MoneySendingForm;
