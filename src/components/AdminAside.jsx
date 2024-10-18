import { FaAngleDown } from "react-icons/fa6";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import logoIcon from "../assets/icon.svg";

import "../sass/components/admin-aside.scss";

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
    <aside className="admin-aside">
      <div className="icon-container" onClick={handleLogoCLick}>
        <img src={logoIcon} alt="RF Logo" />
      </div>
      <nav>
        <ul className="nav-list">
          <li>
            <NavLink
              className={isCrudActive ? "link-active" : "link"}
              data-bs-toggle="collapse"
              data-bs-target="#crud"
              aria-expanded="false"
              aria-controls="crud"
            >
              CRUD
              <FaAngleDown />
            </NavLink>
          </li>
          <ul id="crud" className="collapse collapse-container">
            {navLinks.map((item, index) => (
              <li key={index}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "link-active" : "link"
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
              className={({ isActive }) => (isActive ? "link-active" : "link")}
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
