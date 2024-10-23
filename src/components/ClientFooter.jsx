import logoIcon from "../../assets/icon.svg";

import "../sass/components/client-footer.scss";

const ClientFooter = () => {
  return (
    <footer className="component-client-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 left-side">
            <p>© 2024 Ruderson Florentino</p>
          </div>
          <div className="col-md-4 text-center center">
            <div className="icon-container">
              <a href="#">
                <img src={logoIcon} alt="RF Logo" />
              </a>
            </div>
          </div>
          <div className="col-md-4 right-side">
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
