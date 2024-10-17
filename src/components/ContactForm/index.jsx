import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Button from "../Button";

import styles from "./styles.module.scss";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();

  const FIELD_ERROR = t("form-error");
  const FIELD_ERROR_MIN_LENGTH = t("form-field-min-length");
  const FIELD_ERROR_MAX_LENGTH = t("form-field-max-length");

  const onSubmit = (data) => console.log(data);

  const handleInput = (event) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className={styles["component-contact-form"]}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">{t("form-field-name")}</label>
          <input
            id="name"
            {...register("name", {
              required: FIELD_ERROR,
              minLength: {
                value: 3,
                message: FIELD_ERROR_MIN_LENGTH,
              },
              maxLength: {
                value: 80,
                message: FIELD_ERROR_MAX_LENGTH,
              },
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: FIELD_ERROR,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Digite um e-mail válido.",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="subject">{t("form-field-subject")}</label>
          <input
            id="subject"
            {...register("subject", {
              required: FIELD_ERROR,
              minLength: {
                value: 3,
                message: FIELD_ERROR_MIN_LENGTH,
              },
              maxLength: {
                value: 80,
                message: FIELD_ERROR_MAX_LENGTH,
              },
            })}
          />
          {errors.subject && <p>{errors.subject.message}</p>}
        </div>
        <div>
          <label htmlFor="message">{t("form-field-message")}</label>
          <textarea
            id="message"
            {...register("message", {
              required: FIELD_ERROR,
              minLength: {
                value: 15,
                message: t("form-textarea-min-lenght"),
              },
              maxLength: {
                value: 500,
                message: t("form-textarea-max-lenght"),
              },
            })}
            style={{ overflow: "hidden", resize: "none" }}
            onInput={handleInput} // Adjust height on input
          />
          {errors.message && <p>{errors.message.message}</p>}
        </div>
        <div style={{ maxWidth: "200px" }} className="mt-1">
          <Button value={"enviar"} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
