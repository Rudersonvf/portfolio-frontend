import PropTypes from "prop-types";
import { FaBell } from "react-icons/fa6";
import imgOwner from "../../assets/ruderson.webp";
import styles from "./styles.module.scss";

const AdminHeader = ({ onToggleAside }) => {
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
          <div className={styles["img-container"]}>
            <img src={imgOwner} alt="Ruderson" />
          </div>
        </nav>
      </div>
    </header>
  );
};

AdminHeader.propTypes = {
  onToggleAside: PropTypes.func,
};

export default AdminHeader;
