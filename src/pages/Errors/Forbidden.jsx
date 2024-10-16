import "../../sass/pages/error-pages.scss";

import { BiSolidLock } from "react-icons/bi";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <main>
      <section className="page-error">
        <div className="container">
          <div className="error-wrapper">
            <span>4</span>
            <BiSolidLock className="animateGlow" />
            <span>1</span>
          </div>
        </div>
        <p className="error-oops">
          Oops! Acesso não autorizado. Faça login para continuar.
        </p>
        <div>
          <Button
            classBtn="primary"
            value="Login"
            onClick={() => navigate("/login")}
            style={{ width: "180px" }}
          />
        </div>
      </section>
    </main>
  );
};

export default Forbidden;
