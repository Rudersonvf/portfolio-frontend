import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import { FaAngleDown } from "react-icons/fa6";
import logoIcon from "../../assets/icon.svg";

const AdminAside = () => {
  const navLinks = [
    { path: "/admin/projects", name: "Projetos" },
    { path: "/admin/educations", name: "Educação" },
    { path: "/admin/experiences", name: "Experiências" },
    { path: "/admin/skills", name: "Habilidades" },
    { path: "/admin/categories", name: "Categorias" },
  ];

  return (
    <aside className={styles["admin-aside"]}>
      <div className={styles["icon-container"]}>
        <img src={logoIcon} alt="RF Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles["link-active"] : styles["link"]
              }
              data-bs-toggle="collapse"
              data-bs-target="#crud"
              aria-expanded="true"
              aria-controls="crud"
            >
              CRUD
              <FaAngleDown />
            </NavLink>
          </li>
          <ul id="crud" className={`${styles["collapse-container"]} collapse`}>
            {navLinks.map((item, index) => (
              <li key={index}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? styles["link-active"] : styles["link"]
                  }
                  to={item.path}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles["link-active"] : styles["link"]
              }
              to={"/admin/messages"}
            >
              Menssagens
            </NavLink>
          </li>
          {/* another nav links */}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminAside;
