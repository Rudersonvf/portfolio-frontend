import { NavLink, useLocation, useNavigate } from "react-router-dom";
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

  const location = useLocation();
  const navigate = useNavigate();

  const isCrudActive = navLinks.some((link) =>
    location.pathname.includes(link.path)
  );

  function handleLogoCLick() {
    navigate("/");
  }

  return (
    <aside className={styles["admin-aside"]}>
      <div className={styles["icon-container"]} onClick={handleLogoCLick}>
        <img src={logoIcon} alt="RF Logo" />
      </div>
      <nav>
        <ul className={styles["nav-list"]}>
          <li>
            <NavLink
              className={isCrudActive ? styles["link-active"] : styles["link"]}
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
                  end
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <li className="mt-2">
            <NavLink
              className={({ isActive }) =>
                isActive ? styles["link-active"] : styles["link"]
              }
              to={"/admin/messages"}
              end
            >
              Mensagens
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminAside;
