import { FC } from 'react';

interface BalanceDisplayProps {
  balance: number;
}

// TODO: Add unique styles
const BalanceDisplay: FC<BalanceDisplayProps> = ({ balance }) => (
  <div className="balance-container">
    <p className="balance-label">Balance</p>
    <p className="balance-amount">${balance.toFixed(2)}</p>
  </div>
);

export default BalanceDisplay;
