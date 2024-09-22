import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
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
        {navLinks.map((item, index) => (
          <NavLink
            className={({ isActive }) =>
              isActive ? styles["link-active"] : styles["link"]
            }
            to={item.path}
            key={index}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminAside;
