import { useTranslation } from "react-i18next";
import ProgressBar from "../../../../components/progressBar";
import { useReservationContext } from "./ReservationContextProvider";

export default () => {
  const { t } = useTranslation(["reserve"]);

  const steps = [
    { label: t("reserve:steps.inputInfo") },
    { label: t("reserve:steps.selectTime") },
    { label: t("reserve:steps.confirmReservation") },
    { label: t("reserve:steps.reservationComplete"), hide: true },
  ];
  const { currentStep } = useReservationContext();

  return <ProgressBar steps={steps} currentStep={currentStep} />;
};
