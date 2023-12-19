import { FC, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

interface HeaderProps {
  firstName: string;
}

const Header: FC<HeaderProps> = ({ firstName }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleIconClick = () => {
    if (isAuthenticated) {
      window.location.reload();
    } else {
      navigate('/login');
    }
  };

  const handleMouseEnter = () => {
    setIsAccordionOpen(true);
  };

  const handleMouseLeave = () => {
    setIsAccordionOpen(false);
  };

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="header-container">
      <div className="icon-container" onClick={handleIconClick}>
        <span role="img" aria-label="React Icon">
          ⚛️
        </span>
      </div>
      <div
        className="user-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="user-name">
          {firstName}
          <div className={`accordion-arrow ${isAccordionOpen ? "open" : ""}`}>
            &#9660;
          </div>
        </div>
        <div
          className={`accordion-content ${isAccordionOpen ? "visible" : ""}`}
        >
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
