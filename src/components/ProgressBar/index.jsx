import PropTypes from "prop-types";

import styles from "./styles.module.scss"; // Ajuste o caminho conforme sua configuração

const ProgressBar = ({ value }) => {
  // Define a cor com base no valor
  let barColor;
  let fontColor;
  if (value < 30) {
    barColor = "#dc3545";
    fontColor = "#c0c0c0";
  } else if (value < 50) {
    barColor = "#ffc107";
    fontColor = "#222222";
  } else {
    barColor = "#198754";
    fontColor = "#c0c0c0";
  }

  return (
    <div className={styles["progress-bar-container"]}>
      <div
        className={styles["progress-bar"]}
        style={{
          width: `${value}%`,
          backgroundColor: barColor,
          color: fontColor,
        }}
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
