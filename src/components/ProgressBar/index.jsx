import PropTypes from "prop-types";
import styles from "./styles.module.scss"; // Ajuste o caminho conforme sua configuração

const ProgressBar = ({ value }) => {
  // Define a cor com base no valor
  let barColor;
  if (value < 30) {
    barColor = "#dc3545";
  } else if (value < 50) {
    barColor = "#ffc107";
  } else {
    barColor = "#198754";
  }

  return (
    <div className={styles["progress-bar-container"]}>
      <div
        className={styles["progress-bar"]}
        style={{ width: `${value}%`, backgroundColor: barColor }}
      >
        {value}%
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
};

export default ProgressBar;
