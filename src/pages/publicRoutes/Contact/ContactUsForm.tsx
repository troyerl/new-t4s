import { useSnackbar } from "../../../components/SnackbarProvider";
import {
  FormInputField,
  FormTextAreaField,
  InputField,
} from "../../../components/form";
import BaseButton from "../../../components/button/BaseButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import emailProvider from "../../../api/emailProvider";
import { Trans, useTranslation } from "react-i18next";

const ContactSchema = yup.object().shape({
  name: yup.string().required("contact:form.name.error"),
  email: yup.string().required("contact:form.email.error"),
  school: yup.string().required("contact:form.school.error"),
  phone: yup.string(),
  message: yup.string().required("contact:form.message.error"),
});

export type IContactForm = yup.InferType<typeof ContactSchema>;

export default function ContactUsForm() {
  const { enqueueSnackbar } = useSnackbar();
  const { t, i18n } = useTranslation(["contact"]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(ContactSchema),
  });

  const onSubmit = async (data: IContactForm) => {
    await emailProvider
      .sendContactEmail(data)
      .then(() => {
        enqueueSnackbar(
          <Trans
            i18n={i18n}
            i18nKey="contact:form.success"
            components={{
              BreakComponent: <br />,
            }}
          />,
          {
            variant: "success",
            autoClose: true,
            duration: 10000,
          },
        );
        reset();
      })
      .catch(() => {
        enqueueSnackbar(t("contact:form.error"), {
          variant: "error",
          autoClose: true,
          duration: 5000,
        });
      });
  };

  return (
    <form className="mt-6 space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <FormInputField
        label={t("contact:form.name.text")}
        id="name-input"
        inputProps={register("name")}
        error={errors.name?.message ? t(errors.name?.message) : undefined}
      />
      <FormInputField
        label={t("contact:form.email.text")}
        id="email-input"
        inputProps={register("email")}
        error={errors.email?.message ? t(errors.email?.message) : undefined}
      />
      <FormInputField
        label={t("contact:form.school.text")}
        id="school-input"
        inputProps={register("school")}
        error={errors.school?.message ? t(errors.school?.message) : undefined}
      />
      <InputField
        label={t("contact:form.phone.text")}
        id="phone-input"
        inputProps={register("phone")}
      />
      <FormTextAreaField
        id="message-input"
        label={t("contact:form.message.text")}
        inputProps={register("message")}
        error={errors.message?.message ? t(errors.message?.message) : undefined}
      />
      <BaseButton isLoading={isSubmitting}>
        {isSubmitting
          ? t("contact:form.submitButton.loading")
          : t("contact:form.submitButton.base")}
      </BaseButton>
    </form>
  );
}
