import PropTypes from "prop-types";

import "../sass/components/experience-card.scss";

const ExperienceCard = ({ position, startDate, endDate, company, resume }) => {
  return (
    <div className="component-experience-card">
      <div className="position-container">
        <span className="experience-position">{position}</span>
        <span className="date">{`${startDate} - ${endDate}`}</span>
      </div>
      <span className="company">{company}</span>
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
