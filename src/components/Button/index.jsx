import PropTypes from "prop-types";

const Button = ({
  type = "button",
  value,
  link,
  classBtn = "primary",
  shape,
  onClick,
  disable,
  style,
}) => {
  const className = classBtn !== "primary" ? `btn-${classBtn}` : "btn-primary";
  const buttonClasses = `btn ${className} ${shape ? `btn-${shape}` : ""}`;

  if (type !== "link") {
    return (
      <button
        onClick={onClick}
        className={buttonClasses}
        disabled={disable}
        style={style}
      >
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
    "success",
  ]),
  shape: PropTypes.oneOf(["circle", "normal"]),
  onClick: PropTypes.func,
  disable: PropTypes.bool,
  style: PropTypes.any,
};

export default Button;
