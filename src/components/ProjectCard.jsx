import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa6";
import { HiMiniArrowUpRight } from "react-icons/hi2";

import ButtonLink from "./ButtonLink";
import "../sass/components/project-card.scss";
import TechnologyIcon from "./TechnologyIcon";

const ProjectCard = ({
  projectName,
  description,
  categories,
  technologies,
  gitUrl,
  liveUrl,
}) => {
  const { t } = useTranslation();

  return (
    <div className="component-project-card">
      <h2 className="h1 mb-3">{projectName}</h2>
      <p className="mb-2">{description}</p>
      <div className="info-container">
        <span className="info">{t("project-info")}</span>
      </div>
      <div className="info-container">
        <span>{t("project-cat")}</span>
        <div className="wrapper">
          {categories.map((cat, index) => (
            <span key={index}>{cat.name}</span>
          ))}
        </div>
      </div>
      <div className="info-container">
        <span>{t("project-tec")}</span>
        <div className="wrapper">
          {technologies.map((tec, index) => (
            <TechnologyIcon
              key={index}
              svgUrl={tec.iconUrl}
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
  technologies: PropTypes.array.isRequired,
};

export default ProjectCard;
