import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const TechnologyIcon = ({ svgUrl, technologyName, size }) => {
  return (
    <div
      className={styles["component-technology-icon"]}
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title={technologyName}
      style={{ width: size }}
    >
      <img src={svgUrl} alt={technologyName} />
    </div>
  );
};

TechnologyIcon.propTypes = {
  svgUrl: PropTypes.string.isRequired,
  technologyName: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default TechnologyIcon;
