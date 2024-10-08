import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import ButtonLink from "../ButtonLink";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa6";
import styles from "./styles.module.scss";
import TechnologyIcon from "../TechnologyIcon";
import { useState, useEffect } from "react";

const ProjectCard = ({
  projectName,
  description,
  categories,
  technologyIds,
  technologyData,
  gitUrl,
  liveUrl,
}) => {
  const [technologies, setTechnologies] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const selectedTechnologies = technologyData.filter((tec) =>
      technologyIds.includes(tec.id)
    );
    setTechnologies(selectedTechnologies);
  }, [technologyIds, technologyData]);

  return (
    <div className={styles["component-project-card"]}>
      <h2 className="h1 mb-3">{projectName}</h2>
      <p className="mb-2">{description}</p>
      <div className={styles["info-container"]}>
        <span className={styles.info}>{t("project-info")}</span>
      </div>
      <div className={styles["info-container"]}>
        <span>{t("project-cat")}</span>
        <div className={styles.wrapper}>
          {categories.map((cat, index) => (
            <span key={index}>{cat}</span>
          ))}
        </div>
      </div>
      <div className={styles["info-container"]}>
        <span>{t("project-tec")}</span>
        <div className={styles.wrapper}>
          {technologies.map((tec, index) => (
            <TechnologyIcon
              key={index}
              svgUrl={tec.icon}
              technologyName={tec.name}
              size={35}
            />
          ))}
        </div>
      </div>
      <div className="d-flex gap-4 mt-lg-5 mt-3">
        {liveUrl && (
          <ButtonLink
            text={t("project-live-btn")}
            link={liveUrl}
            icon={<HiMiniArrowUpRight />}
            size={20}
          />
        )}
        {gitUrl && (
          <ButtonLink
            text={t("project-git-btn")}
            link={gitUrl}
            icon={<FaGithub />}
            size={20}
          />
        )}
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  projectName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  gitUrl: PropTypes.string.isRequired,
  liveUrl: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  technologyIds: PropTypes.array.isRequired,
  technologyData: PropTypes.array.isRequired,
};

export default ProjectCard;
