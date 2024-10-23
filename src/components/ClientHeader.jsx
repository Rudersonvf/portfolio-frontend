import { useEffect, useState } from "react";

import logoIcon from "../../assets/icon.svg";

import "../sass/components/client-header.scss";

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
      setAnimationClass("animateDown");
    } else {
      setAnimationClass("animateUp");
    }
  }, [isSticky]);

  return (
    <>
      <header
        className={`component-client-header ${
          isSticky ? "d-none" : "header-absolute"
        }`}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <div className="icon-container">
            <a href="#">
              <img src={logoIcon} alt="RF Logo" />
            </a>
          </div>
          <nav className={`dropdown ${menuOpen ? "open" : ""}`}>
            <ul>
              {["Home", "Sobre", "Habilidades", "Projetos", "Contato"].map(
                (item, index) => (
                  <li
                    key={index}
                    className={index === activeIndex ? "active" : ""}
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
            className={`hamburger-menu ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </header>

      <header
        className={`component-client-header header-sticky ${animationClass}`}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <div className="icon-container">
            <a href="#">
              <img src={logoIcon} alt="RF Logo" />
            </a>
          </div>
          <nav className={`dropdown ${menuOpen ? "open" : ""}`}>
            <ul>
              {["Home", "Sobre", "Habilidades", "Projetos", "Contato"].map(
                (item, index) => (
                  <li
                    key={index}
                    className={index === activeIndex ? "active" : ""}
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
            className={`hamburger-menu ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </header>
    </>
  );
};

export default ClientHeader;
