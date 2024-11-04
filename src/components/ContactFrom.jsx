import { useState } from "react";

import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import * as messageService from "../services/message-service";

import Button from "./Button";
import TextAreaField from "./TextareaField";

const ContactForm = ({ onError }) => {
  const [isSending, setIsSending] = useState(false);
  //const [isSuccess, setIsSuccess] = useState(false);
  //const [isError, setIsError] = useState(false);
  const { t } = useTranslation();

  const FIELD_ERROR = t("form-error");
  const FIELD_ERROR_MIN_LENGTH = t("form-field-min-length");
  const FIELD_ERROR_MAX_LENGTH = t("form-field-max-length");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    setIsSending(true);
    try {
      await messageService.postRequest(data);
      reset();
    } catch (error) {
      console.error("Error: ", error);
      onError();
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="component-contact-form">
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
          <TextAreaField
            id="message"
            label="Mensagem"
            register={register}
            rules={{
              required: FIELD_ERROR,
              minLength: {
                value: 30,
                message: "Deve conter ao menos 30 caracteres",
              },
              maxLength: {
                value: 800,
                message: "Deve conter no máximo 700 caracteres",
              },
            }}
            errors={errors}
            maxLength={800}
          />
          {errors.message && <p>{errors.message.message}</p>}
        </div>
        <div style={{ maxWidth: "200px" }} className="mt-1">
          <Button value={"enviar"} type="submit" disabled={isSending} />
        </div>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  onError: PropTypes.func,
};

export default ContactForm;
