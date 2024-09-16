import PropTypes from "prop-types";
import * as DiIcons from "react-icons/di";
import styles from "./styles.module.scss";
import ProgressBar from "../ProgressBar";

const SkillCard = ({ icon, name, level, docUrl }) => {
  const IconComponent = DiIcons[icon];

  return (
    <div className={styles["component-skill-card"]}>
      <div className={styles["logo-container"]}>
        <IconComponent alt={name} />
      </div>
      <span>{name}</span>
      <ProgressBar value={level} />
    </div>
  );
};

SkillCard.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  docUrl: PropTypes.string.isRequired,
};

export default SkillCard;
