import { FC, useState } from "react";
import PropTypes from "prop-types";
import Button from "../../common/Button/Button";
import { validateAmount, validateIncomeSource } from "../../../../utils/validation";
import "./TopUpForm.css";

interface TopUpFormProps {
  onSubmit: (amount: number, incomeSource: string) => void;
}

const TopUpForm: FC<TopUpFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);
  const [incomeSource, setIncomeSource] = useState<string>("");
  const [amountError, setAmountError] = useState<string>("");
  const [incomeSourceError, setIncomeSourceError] = useState<string>("");

  const handleTopUpSubmit = () => {
    const amountIsValid = validateAmount(amount);
    const incomeSourceIsValid = validateIncomeSource(incomeSource);

    if (!amountIsValid) {
      setAmountError("Please enter a valid amount greater than 0.");
    } else {
      setAmountError("");
    }

    if (!incomeSourceIsValid) {
      setIncomeSourceError("Please enter a valid income source.");
    } else {
      setIncomeSourceError("");
    }

    if (amountIsValid && incomeSourceIsValid) {
      onSubmit(amount, incomeSource);
    }
  };

  return (
    <div className="top-up-form-container">
      <div className="label-container">
        <label htmlFor="amount" className="label">
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="input-field"
          min={0}
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

TopUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TopUpForm;
