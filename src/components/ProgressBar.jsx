import PropTypes from "prop-types";

import "../sass/components/progress-bar.scss";

const ProgressBar = ({ value }) => {
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
    <div className="progress-bar-container">
      <div
        className="progress-bar"
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
