import { FC } from 'react';
import "./BalanceDisplay.css";

interface BalanceDisplayProps {
  balance: number;
}

const BalanceDisplay: FC<BalanceDisplayProps> = ({ balance }) => (
  <div className="balance-display-container">
    <p className="balance-label">Balance</p>
    <p className="balance-amount">{balance.toFixed(2)} PW</p>
  </div>
);

export default BalanceDisplay;
