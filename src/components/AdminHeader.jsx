import { useState } from "react";

import PropTypes from "prop-types";
import { FaBell, FaNewspaper, FaPowerOff } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";

import imgOwner from "../assets/ruderson.webp";
import * as accessTokenManager from "../utils/access-token-manager";

import "../sass/components/admin-header.scss";

const AdminHeader = ({ onToggleAside, unreadCount }) => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  function handleDropdownClick() {
    setIsActive(!isActive);
  }

  function handleBellClick() {
    navigate("/admin/messages");
  }

  function handleLogoutClick() {
    accessTokenManager.remove();
    navigate("/");
  }

  return (
    <header className="component-admin-header">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="hamburger-menu" onClick={onToggleAside}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <nav>
          <div className="count-container" onClick={handleBellClick}>
            {unreadCount > 0 && <span>{unreadCount}</span>}
            <FaBell />
          </div>
          <div className="img-container" onClick={handleDropdownClick}>
            <img src={imgOwner} alt="Ruderson" />
          </div>
          {isActive && (
            <div className="dropdown-container">
              <ul>
                <li>
                  <NavLink to="/">
                    <FaNewspaper />
                    To site
                  </NavLink>
                </li>
                <li onClick={handleLogoutClick}>
                  <FaPowerOff />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

AdminHeader.propTypes = {
  onToggleAside: PropTypes.func,
  unreadCount: PropTypes.number,
};

export default AdminHeader;
