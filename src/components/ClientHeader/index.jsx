import { useState, useEffect } from "react";
import logoIcon from "../../assets/icon.svg";
import styles from "./styles.module.scss";

const ClientHeader = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const handleItemClick = (index) => {
    setActiveIndex(index);
    toggleMenu();
  };

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleScroll = () => {
    setIsSticky(window.scrollY > 500);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isSticky) {
      setAnimationClass(styles.animateDown);
    } else {
      setAnimationClass(styles.animateUp);
    }
  }, [isSticky]);

  return (
    <>
      <header
        className={`${styles["component-client-header"]} ${
          isSticky ? "d-none" : styles["header-absolute"]
        }`}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <div className={styles["icon-container"]}>
            <a href="#">
              <img src={logoIcon} alt="RF Logo" />
            </a>
          </div>
          <nav
            className={`${styles["dropdown"]} ${
              menuOpen ? styles["open"] : ""
            }`}
          >
            <ul>
              {["Home", "Sobre", "Habilidades", "Projetos", "Contato"].map(
                (item, index) => (
                  <li
                    key={index}
                    className={index === activeIndex ? `${styles.active}` : ""}
                    onClick={() => handleItemClick(index)}
                  >
                    <a href={`#${item !== "Home" ? item.toLowerCase() : ""}`}>
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>
          <div
            className={`${styles["hamburger-menu"]} ${
              menuOpen ? styles["open"] : ""
            }`}
            onClick={toggleMenu}
          >
            <span className={styles["bar"]}></span>
            <span className={styles["bar"]}></span>
            <span className={styles["bar"]}></span>
          </div>
        </div>
      </header>

      <header
        className={`${styles["component-client-header"]} ${styles["header-sticky"]} ${animationClass}`}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <div className={styles["icon-container"]}>
            <a href="#">
              <img src={logoIcon} alt="RF Logo" />
            </a>
          </div>
          <nav
            className={`${styles["dropdown"]} ${
              menuOpen ? styles["open"] : ""
            }`}
          >
            <ul>
              {["Home", "Sobre", "Habilidades", "Projetos", "Contato"].map(
                (item, index) => (
                  <li
                    key={index}
                    className={index === activeIndex ? `${styles.active}` : ""}
                    onClick={() => handleItemClick(index)}
                  >
                    <a href={`#${item !== "Home" ? item.toLowerCase() : ""}`}>
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>
          <div
            className={`${styles["hamburger-menu"]} ${
              menuOpen ? styles["open"] : ""
            }`}
            onClick={toggleMenu}
          >
            <span className={styles["bar"]}></span>
            <span className={styles["bar"]}></span>
            <span className={styles["bar"]}></span>
          </div>
        </div>
      </header>
    </>
  );
};

export default ClientHeader;
