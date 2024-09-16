import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const ButtonLink = ({ text, link, icon }) => {
  return (
    <div className={styles["component-button-link"]}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        <span className={styles.text}>{text}</span>
        {icon && <span className={styles.icon}>{icon}</span>}
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
