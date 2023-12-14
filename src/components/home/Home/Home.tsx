// Home.tsx
import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import BankAccount from '../BankAccount/BankAccount';
import TransactionHistory from '../BankAccount/TransactionHistory/TransactionHistory';
import { fetchUserData } from '../../api/api';
import './Home.css';

const Home: React.FC = () => {
  const [userData, setUserData] = useState<{ firstName: string; balance: number } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fetchUserData();
        setUserData(user);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <Header firstName={userData?.firstName || ''} />
      <div className="content-container">
        <BankAccount balance={userData?.balance || 0} />
        <TransactionHistory />
      </div>
    </div>
  );
};

export default Home;

