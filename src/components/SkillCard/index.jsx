import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import ProgressBar from "../ProgressBar";
import styles from "./styles.module.scss";
import { useState } from "react";

const SkillCard = ({ icon, name, level, docUrl }) => {
  const [isMouseOver, setIsMouseOver] = useState();
  const { t } = useTranslation();

  return (
    <div
      className={styles["component-skill-card"]}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <div className={styles["logo-container"]}>
        <img src={icon} alt={name} />
      </div>
      <h4>{name}</h4>
      <ProgressBar value={level} />
      <a
        href={docUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles["skill-doc"]} ${
          isMouseOver ? styles["animateSkillUp"] : styles["animateSkillDown"]
        }`}
      >
        <h5>{t("skill-doc")}</h5>
      </a>
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
