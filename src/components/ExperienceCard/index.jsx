import PropTypes from "prop-types";

import styles from "./styles.module.scss";

const ExperienceCard = ({ position, startDate, endDate, company, resume }) => {
  return (
    <div className={styles["component-experience-card"]}>
      <div className={styles["position-container"]}>
        <span className={styles.position}>{position}</span>
        <span className={styles.date}>{`${startDate} - ${endDate}`}</span>
      </div>
      <span className={styles.company}>{company}</span>
      <p>{resume}</p>
    </div>
  );
};

ExperienceCard.propTypes = {
  position: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string,
  resume: PropTypes.string,
};

export default ExperienceCard;
