import React, { useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  firstName: string;
}

const Header: React.FC<HeaderProps> = ({ firstName }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate('/');
  };

  const handleAccordionClick = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    // TODO: Add Sign Out request to API after AuthController completion
    console.log('Signing out');
  };

  return (
    <div className="header-container">
      <div className="icon-container" onClick={handleIconClick}>
        <span role="img" aria-label="React Icon">
          ⚛️
        </span>
      </div>
      <div className="user-container">
        <div className="user-name" onClick={handleAccordionClick}>
          {firstName}
          <div className={`accordion-arrow ${isAccordionOpen ? 'open' : ''}`}>&#9660;</div>
        </div>
        {isAccordionOpen && (
          <div className="accordion-content">
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
