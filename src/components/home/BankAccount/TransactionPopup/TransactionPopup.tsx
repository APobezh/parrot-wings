import { FC } from 'react';
import './TransactionPopup.css';

interface TransactionPopupProps {
  status: string;
  message: string;
  onClose: () => void;
}

const TransactionPopup: FC<TransactionPopupProps> = ({ status, message, onClose }) => (
  <div className="popup">
    <span className="popup-close" onClick={onClose}>
      &times;
    </span>
    <p>Status: {status}</p>
    <p>Message: {message}</p>
  </div>
);

export default TransactionPopup;
