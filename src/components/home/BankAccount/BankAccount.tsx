import React from 'react';
import './BankAccount.css';
import Button from '../common/Button/Button';

interface BankAccountProps {
  balance: number;
}

const BankAccount: React.FC<BankAccountProps> = ({ balance }) => {
  const handleSendMoney = () => {
    // TODO: Implement logic to send money
  };

  const handleTopUp = () => {
    // TODO: Implement logic to top up money
  };

  return (
    <div className="bank-account-container">
      <div className="balance-container">
        <p className="balance-label">Balance</p>
        <p className="balance-amount">${balance.toFixed(2)}</p>
      </div>
      <div className="buttons-container">
        <Button onClick={handleSendMoney}>Send</Button>
        <Button onClick={handleTopUp}>Top-Up</Button>
      </div>
    </div>
  );
};

export default BankAccount;
