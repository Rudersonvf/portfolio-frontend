import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import ButtonLink from "../ButtonLink";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import styles from "./styles.module.scss";

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
    <div className={styles["component-education-card"]}>
      <div className={styles["course-container"]}>
        <span className={styles.course}>{courseName}</span>
        <span className={styles.date}>{`${startDate} - ${endDate}`}</span>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <span className={styles.institution}>{institution}</span>
        <span className={styles.workload}>{`${workload} ${t(
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
