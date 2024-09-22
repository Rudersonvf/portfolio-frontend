import logoIcon from "../../assets/icon.svg";
import styles from "./styles.module.scss";

const ClientFooter = () => {
  return (
    <footer className={styles["component-client-footer"]}>
      <div className="container">
        <div className="row">
          {/* Coluna com o texto à esquerda */}
          <div className={`col-md-4 ${styles["left-side"]}`}>
            <p>© 2024 Ruderson Florentino</p>
          </div>

          {/* Coluna central com o logo */}
          <div className={`col-md-4 text-center ${styles.center}`}>
            <div className={styles["icon-container"]}>
              <a href="#">
                <img src={logoIcon} alt="RF Logo" />
              </a>
            </div>
          </div>

          {/* Coluna com os links à direita */}
          <div className={`col-md-4 ${styles["right-side"]}`}>
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
      </div>
    </footer>
  );
};

export default ClientFooter;
