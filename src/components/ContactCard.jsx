import PropTypes from "prop-types";

import "../sass/components/contact-card.scss";

const ContactCard = ({ logo, title, type, content, link }) => {
  function typeOfContent(type) {
    let contentType = "";

    switch (type) {
      case "mail":
        contentType = <a href={`mailto:${link}`}>{content}</a>;
        break;

      case "tel":
        contentType = <a href={`tel:+${link}`}>{content}</a>;
        break;

      case "extLink":
        contentType = (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {content}
          </a>
        );
    }

    return contentType;
  }

  return (
    <div className="component-contact-card">
      <div className="logo-container">{logo}</div>
      <div className="content-container">
        <span>{title}</span>
        {typeOfContent(type)}
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  logo: PropTypes.any,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["mail", "tel", "extLink"]).isRequired,
  content: PropTypes.any.isRequired,
  link: PropTypes.string.isRequired,
};

export default ContactCard;
