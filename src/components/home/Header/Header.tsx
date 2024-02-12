import { FC, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import logo from '../../../images/logo.png';

interface HeaderProps {
  firstName: string;
}

const Header: FC<HeaderProps> = ({ firstName }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isMouseOverUserMenu, setIsMouseOverUserMenu] = useState(false);
  const [isMouseOverMenu, setIsMouseOverMenu] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleIconClick = () => {
    if (isAuthenticated) {
      window.location.reload();
    } else {
      navigate('/login');
    }
  };

  const handleToggleAccordion = () => {
    setIsAccordionOpen((prevIsAccordionOpen) => !prevIsAccordionOpen);
  };

  const handleMouseEnterUserMenu = () => {
    setIsMouseOverUserMenu(true);
    setIsAccordionOpen(true);
  };

  const handleMouseLeaveUserMenu = () => {
    setIsMouseOverUserMenu(false);
    if (!isMouseOverMenu) {
      setIsAccordionOpen(false);
    }
  };

  const handleMouseEnterMenu = () => {
    setIsMouseOverMenu(true);
  };

  const handleMouseLeaveMenu = () => {
    setIsMouseOverMenu(false);
    if (!isMouseOverUserMenu) {
      setIsAccordionOpen(false);
    }
  };

  const handleSignOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    logout();
    navigate('/login');
  };

  const handleWrapperMouseLeave = () => {
    setIsMouseOverUserMenu(false);
    setIsMouseOverMenu(false);
    setIsAccordionOpen(false);
  };

  return (
    <div className="header-wrapper" onMouseLeave={handleWrapperMouseLeave}>
      <div className="header-container">
        <div className="icon-container" onClick={handleIconClick}>
          <span role="img" aria-label="React Icon">
            <img src={logo} alt="Kesha, the Parrot" />
            Parrot Wings
          </span>
        </div>
        <div
          className="user-container"
          onMouseEnter={handleMouseEnterUserMenu}
          onMouseLeave={handleMouseLeaveUserMenu}
          onClick={handleToggleAccordion}
        >
          <div
            className={`user-name ${isAccordionOpen ? "open" : ""}`}
            onMouseEnter={handleMouseEnterMenu}
            onMouseLeave={handleMouseLeaveMenu}
          >
            {firstName}
            <div className="accordion-arrow">&#9660;</div>
          </div>
          <div
            className={`accordion-content ${isAccordionOpen ? "visible" : ""}`}
            onMouseEnter={handleMouseEnterMenu}
            onMouseLeave={handleMouseLeaveMenu}
          >
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
