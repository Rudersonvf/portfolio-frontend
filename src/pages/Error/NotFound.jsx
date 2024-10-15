import { FaReact } from "react-icons/fa6";
import "../../sass/pages/notfound-page.scss";
import Button from "../../components/Button";

const NotFound = () => {
  return (
    <main>
      <section className="page-notfound">
        <div className="container">
          <div className="notfound-wrapper">
            <span>4</span>
            <FaReact className="animateSpinGlow" />
            <span>4</span>
          </div>
        </div>
        <span className="notfound-oops">
          Oops! A página que você está procurando não foi encontrada.
        </span>
        <div style={{ maxWidth: "200px" }}>
          <Button classBtn="primary" value="Voltar ao início" />
        </div>
      </section>
    </main>
  );
};

export default NotFound;
