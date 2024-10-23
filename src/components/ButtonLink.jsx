import PropTypes from "prop-types";

import "../sass/components/button-link.scss";

const ButtonLink = ({ text, link, icon }) => {
  return (
    <div className="component-button-link">
      <a href={link} target="_blank" rel="noopener noreferrer" className="link">
        <span className="text">{text}</span>
        {icon && <span className="icon">{icon}</span>}
      </a>
    </div>
  );
};

ButtonLink.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.any,
};

export default ButtonLink;
