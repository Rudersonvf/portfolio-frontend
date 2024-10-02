import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const Carousel = ({ images, projectName, id }) => {
  console.log("carousel comp: ", id);

  return (
    <div className={styles["component-carousel"]}>
      <div id={id} className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <img src={image} className="d-block w-100" alt={projectName} />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target={`#${id}`}
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target={`#${id}`}
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
  projectName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Carousel;
