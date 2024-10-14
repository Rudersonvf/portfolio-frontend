import { useState } from "react";
import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBell, FaNewspaper, FaPowerOff } from "react-icons/fa6";
import imgOwner from "../../assets/ruderson.webp";
import styles from "./styles.module.scss";

const AdminHeader = ({ onToggleAside, unreadCount }) => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  function handleDropdownClick() {
    setIsActive(!isActive);
  }

  function handleBellClick() {
    navigate("/admin/messages");
  }

  return (
    <header className={styles["component-admin-header"]}>
      <div className="container d-flex justify-content-between align-items-center">
        <div className={styles["hamburger-menu"]} onClick={onToggleAside}>
          <span className={styles["bar"]}></span>
          <span className={styles["bar"]}></span>
          <span className={styles["bar"]}></span>
        </div>
        <nav>
          <div className={styles["count-container"]} onClick={handleBellClick}>
            {unreadCount > 1 && <span>{unreadCount}</span>}
            <FaBell />
          </div>
          <div
            className={styles["img-container"]}
            onClick={handleDropdownClick}
          >
            <img src={imgOwner} alt="Ruderson" />
          </div>
          {isActive && (
            <div className={styles["dropdown-container"]}>
              <ul>
                <li>
                  <NavLink to="/">
                    <FaNewspaper />
                    To site
                  </NavLink>
                </li>
                <li>
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
