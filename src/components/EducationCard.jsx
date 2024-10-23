import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { HiMiniArrowUpRight } from "react-icons/hi2";

import ButtonLink from "./ButtonLink";
import "../sass/components/education-card.scss";

const EducationCard = ({
  courseName,
  startDate,
  endDate,
  institution,
  resume,
  workload,
  certificateUrl,
}) => {
  const { t } = useTranslation();

  return (
    <div className="component-education-card">
      <div className="course-container">
        <span className="course">{courseName}</span>
        <span className="date">{`${startDate} - ${endDate}`}</span>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <span className="institution">{institution}</span>
        <span className="workload">{`${workload} ${t(
          "education-workload"
        )}`}</span>
      </div>
      <p className="mb-2">{resume}</p>
      {certificateUrl && (
        <ButtonLink
          text={t("education-certificate")}
          link={certificateUrl}
          icon={<HiMiniArrowUpRight />}
        />
      )}
    </div>
  );
};

EducationCard.propTypes = {
  courseName: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string,
  institution: PropTypes.string.isRequired,
  resume: PropTypes.string.isRequired,
  workload: PropTypes.number.isRequired,
  certificateUrl: PropTypes.string,
};

export default EducationCard;
