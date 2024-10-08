import { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { FaBell, FaNewspaper, FaPowerOff } from "react-icons/fa6";
import imgOwner from "../../assets/ruderson.webp";
import styles from "./styles.module.scss";

const AdminHeader = ({ onToggleAside }) => {
  const [isActive, setIsActive] = useState(false);

  const handleDropdownClick = () => {
    setIsActive(!isActive);
  };

  return (
    <header className={styles["component-admin-header"]}>
      <div className="container d-flex justify-content-between align-items-center">
        <div className={styles["hamburger-menu"]} onClick={onToggleAside}>
          <span className={styles["bar"]}></span>
          <span className={styles["bar"]}></span>
          <span className={styles["bar"]}></span>
        </div>
        <nav>
          <FaBell />
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
};

export default AdminHeader;
