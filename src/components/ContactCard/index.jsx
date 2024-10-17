import PropTypes from "prop-types";

import styles from "./styles.module.scss";

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
    <div className={styles["component-contact-card"]}>
      <div className={styles["logo-container"]}>{logo}</div>
      <div className={styles["content-container"]}>
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
