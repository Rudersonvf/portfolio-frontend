import { useState } from "react";

import PropTypes from "prop-types";

const TextAreaField = ({
  id,
  label,
  register,
  rules,
  errors,
  maxLength = 500,
  ...rest
}) => {
  const [charCount, setCharCount] = useState(0);

  const handleInput = (event) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setCharCount(textarea.value.length);
  };

  return (
    <div style={{ position: "relative" }}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        {...register(id, rules)}
        style={{ overflow: "hidden", resize: "none" }}
        onInput={handleInput}
        maxLength={maxLength}
        {...rest}
      />
      <p className="contact-form-char-count" style={{ right: "10px" }}>
        <span className={`${charCount >= maxLength ? "text-danger" : ""}`}>
          {charCount}
        </span>
        /{maxLength}
      </p>
      {errors && errors[id] && <p>{errors[id].message}</p>}
    </div>
  );
};

TextAreaField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  rules: PropTypes.object,
  errors: PropTypes.object,
  maxLength: PropTypes.number,
  onInput: PropTypes.func,
};

export default TextAreaField;
