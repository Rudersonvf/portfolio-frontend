import PropTypes from "prop-types";

const Button = ({
  type = "button",
  value,
  link,
  classBtn = "primary",
  shape,
  onClick,
  disable,
}) => {
  const className = classBtn !== "primary" ? `btn-${classBtn}` : "btn-primary";
  const buttonClasses = `btn ${className} ${shape ? `btn-${shape}` : ""}`;

  if (type !== "link") {
    return (
      <button onClick={onClick} className={buttonClasses} disabled={disable}>
        {value}
      </button>
    );
  } else {
    return (
      <a href={link} target="_blank" role="button" className={buttonClasses}>
        {value}
      </a>
    );
  }
};

Button.propTypes = {
  value: PropTypes.any.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset", "link"]),
  link: PropTypes.string,
  classBtn: PropTypes.oneOf([
    "primary",
    "secondary",
    "danger",
    "warning",
    "info",
  ]),
  shape: PropTypes.oneOf(["circle", "normal"]),
  onClick: PropTypes.func,
  disable: PropTypes.bool,
};

export default Button;
