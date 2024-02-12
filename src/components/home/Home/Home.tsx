import { FC, useEffect, useState } from 'react';
import Header from '../Header/Header';
import BankAccount from '../BankAccount/BankAccount';
import { Transaction } from '../../api/api';
import MoneySendingForm from '../BankAccount/MoneySending/MoneySendingForm';
import { fetchUserData } from '../../api/api';
import './Home.css';

const Home: FC = () => {
  const [userData, setUserData] = useState<{ firstName: string; balance: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('Fetching user data');
        const user = await fetchUserData();
        setUserData(user);
      } catch (error: any) {
        console.error('Error fetching user data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const resetSelectedTransaction = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="home-container">
      <Header firstName={userData?.firstName || ''} />
      <div className="content-container">
        {loading ? (
          <p>Loading...</p>
        ) : userData ? (
          <>
            <BankAccount balance={userData.balance || 0} />
            {selectedTransaction && (
              <MoneySendingForm
                onSubmit={(amount, recipientEmail) => {
                  console.log('Submitting form with data:', amount, recipientEmail);
                  resetSelectedTransaction();
                }}
                initialAmount={selectedTransaction.amount}
                initialRecipientEmail={selectedTransaction.receiver}
              />
            )}
          </>
        ) : (
          <p>Error loading user data</p>
        )}
      </div>
    </div>
  );
};

export default Home;
