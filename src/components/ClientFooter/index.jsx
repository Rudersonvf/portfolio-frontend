import logoIcon from "../../assets/icon.svg";
import styles from "./styles.module.scss";

const ClientFooter = () => {
  return (
    <footer className={styles["component-client-footer"]}>
      <div className="container">
        <div className={styles["footer-content"]}>
          <p>© 2024 Ruderson Florentino</p>
          <div className={styles["icon-container"]}>
            <a href="#">
              <img src={logoIcon} alt="RF Logo" />
            </a>
          </div>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="/admin/projects">Admin</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default ClientFooter;
