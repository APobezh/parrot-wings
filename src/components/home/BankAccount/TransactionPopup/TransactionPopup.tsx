import { FC } from 'react';

interface TransactionPopupProps {
  status: string;
  message: string;
  onClose: () => void;
}

// TODO: Add styles
const TransactionPopup: FC<TransactionPopupProps> = ({ status, message, onClose }) => (
  <div className="popup" onClick={onClose}>
    <p>Status: {status}</p>
    <p>Message: {message}</p>
  </div>
);

export default TransactionPopup;
