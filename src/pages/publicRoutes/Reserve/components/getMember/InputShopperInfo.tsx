// export const UserInfoSchema = v.object({
//   firstName: v.pipe(
//     v.string(),
//     v.trim(),
//     v.nonEmpty("Please enter your first name."),
//   ),
//   lastName: v.pipe(
//     v.string(),
//     v.trim(),
//     v.nonEmpty("Please enter your last name."),
//   ),
//   email: v.pipe(
//     v.string(),
//     v.trim(),
//     v.nonEmpty("Please enter your email."),
//     v.email("Please provide a valid email"),
//   ),
//   school: v.pipe(
//     v.string(),
//     v.trim(),
//     v.nonEmpty("Please select your school."),
//   ),
//   grade: v.pipe(
//     v.string(),
//     v.trim(),
//     v.nonEmpty("Please select the grade you teach."),
//   ),
//   classLoad: v.pipe(
//     v.string(),
//     v.trim(),
//     v.nonEmpty(
//       "Please enter your class load. This is needed to help us understand the number of students we are helping!",
//     ),
//   ),
// });

import { useState } from "react";
import type {
  IGetShopperResponse,
  IShopper,
} from "../../../../../interface/Shopper";
import { useReservationContext } from "../ReservationContextProvider";
import { useSnackbar } from "../../../../../components/contextProviders/SnackbarProvider";
import { useForm } from "react-hook-form";

// export type IUserInfoForm = v.InferInput<typeof UserInfoSchema>;
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import shopperProvider from "../../../../../api/shopperProvider";
import { FormInputField } from "../../../../../components/form";
import { useTranslation } from "react-i18next";
import BaseButton from "../../../../../components/button/BaseButton";
import TextButton from "../../../../../components/button/TextButton";

const InputShopperSchema = yup.object().shape({
  firstName: yup.string().required("contact:form.name.error"),
  lastName: yup.string().required("contact:form.email.error"),
  email: yup.string().required("contact:form.school.error"),
  school: yup.string(),
  grade: yup.string().required("contact:form.message.error"),
  classLoad: yup.string().required("contact:form.message.error"),
});

export type IInputShopper = yup.InferType<typeof InputShopperSchema>;

interface IInputShopperInfoProps {
  onToggleScreen: VoidFunction;
  onSubmit$: (shopperInfo: IGetShopperResponse) => void;
}

export default ({ onToggleScreen, onSubmit$ }: IInputShopperInfoProps) => {
  // const schoolResource = useResource$(async () => {
  //   return await getData<string[]>(
  //     queryKeys.schools("name"),
  //     async () => await schoolProvider.getSchoolNames(),
  //   );
  // });
  const [creatingShopper, setCreatingShopper] = useState<boolean>(false);

  const { shopper } = useReservationContext();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation([""]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(InputShopperSchema),
  });

  const onSubmit = async (values: IInputShopper) => {
    setCreatingShopper(true);
    await shopperProvider
      .createShopper({
        ...values,
        shopperId: "",
        classLoad: parseInt(values.classLoad),
      } as IShopper)
      .then((response: IShopper) => {
        onSubmit$({ shopper: response, needsUpdated: false });
      })
      .catch(() => {
        enqueueSnackbar("There was an error creating your shopper account.", {
          variant: "error",
          autoClose: true,
          duration: 5000,
        });
      })
      .finally(() => {
        setCreatingShopper(false);
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-6"
      >
        <FormInputField
          label={t("reserver:form.firstName.text", "First Name")}
          id="firstName-input"
          inputProps={register("firstName")}
          error={
            errors.firstName?.message ? t(errors.firstName?.message) : undefined
          }
        />

        <FormInputField
          label={t("reserver:form.lastName.text", "Last Name")}
          id="lastName-input"
          inputProps={register("lastName")}
          error={
            errors.lastName?.message ? t(errors.lastName?.message) : undefined
          }
        />

        <FormInputField
          label={t("reserver:form.email.text", "Email")}
          id="email-input"
          inputProps={register("email")}
          error={errors.email?.message ? t(errors.email?.message) : undefined}
        />

        {/* <Field name="school">
        {(field: any, props: any) => (
          <FormComboboxField
            label="School"
            value={field.value}
            id="school"
            inputProps={props}
            options={schools.map((school) => ({
              value: school,
              label: school,
            }))}
            error={field.error}
          />
        )}
      </Field> */}

        <FormInputField
          label={t("reserver:form.grade.text", "Grade")}
          id="grade-input"
          inputProps={register("grade")}
          error={errors.grade?.message ? t(errors.grade?.message) : undefined}
        />

        <FormInputField
          label={t("reserver:form.classLoad.text", "Class Load")}
          id="classLoad-input"
          inputProps={register("classLoad")}
          error={
            errors.classLoad?.message ? t(errors.classLoad?.message) : undefined
          }
        />

        {!shopper && (
          <div className="flex w-full justify-center">
            <BaseButton
              type="submit"
              id="submit-userInfo-button"
              isLoading={creatingShopper}
              // disabled={
              //   !values.email || Object.values(values).some((v) => v === "")
              // }
            >
              {creatingShopper ? "Creating Shopping Account..." : "Select Time"}
            </BaseButton>
          </div>
        )}
      </form>
      {!shopper && <AlreadyHaveCodeSection onToggleScreen={onToggleScreen} />}
    </>
  );
};

const AlreadyHaveCodeSection = ({
  onToggleScreen,
}: {
  onToggleScreen: VoidFunction;
}) => {
  const { t } = useTranslation(["reserve"]);

  return (
    <div className="mt-6 flex flex-col items-center text-center">
      <h3>{t("reserve:userInfo.code.helpText")}</h3>
      <TextButton onClick={onToggleScreen}>
        {t("reserve:userInfo.code.change")}
      </TextButton>
    </div>
  );
};
