import "../../sass/pages/error-pages.scss";

import { FaReact } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main>
      <section className="page-error">
        <div className="container">
          <div className="error-wrapper">
            <span>4</span>
            <FaReact className="animateSpinGlow" />
            <span>4</span>
          </div>
        </div>
        <p className="error-oops">
          Oops! A página que você está procurando não foi encontrada.
        </p>
        <Button
          classBtn="primary"
          value="Voltar ao início"
          onClick={() => navigate("/")}
          style={{ maxWidth: "200px" }}
        />
      </section>
    </main>
  );
};

export default NotFound;
