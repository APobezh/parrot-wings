import { FC, useState } from "react";
import Button from "../../common/Button/Button";
import { validateAmount } from "../../../../utils/validation";
import "./TopUpForm.css";

interface TopUpFormProps {
  onSubmit: (amount: number, incomeSource: string) => void;
}

const TopUpForm: FC<TopUpFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [incomeSource, setIncomeSource] = useState("");
  const [amountError, setAmountError] = useState("");
  const [incomeSourceError, setIncomeSourceError] = useState("");

  const handleTopUpSubmit = () => {
    setAmountError("");
    setIncomeSourceError("");

    if (!validateAmount(amount)) {
      setAmountError("Please enter a valid amount greater than 0.");
    }

    if (!validateIncomeSource(incomeSource)) {
      setIncomeSourceError("Please enter a valid income source.");
    }

    if (validateAmount(amount) && validateIncomeSource(incomeSource)) {
      onSubmit(parseFloat(amount), incomeSource);
    }
  };

  const validateIncomeSource = (value: string): boolean => {
    return value.trim() !== "" && !/^\s+$/.test(value);
  };

  return (
    <div className="top-up-form-container">
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
        <label htmlFor="incomeSource" className="label">
          Income Source:
        </label>
        <input
          type="text"
          id="incomeSource"
          value={incomeSource}
          onChange={(e) => setIncomeSource(e.target.value)}
          className="input-field"
        />
        {incomeSourceError && (
          <div className="error-message">{incomeSourceError}</div>
        )}
      </div>

      <div className="button-container">
        <Button onClick={handleTopUpSubmit}>Top Up</Button>
      </div>
    </div>
  );
};

export default TopUpForm;
