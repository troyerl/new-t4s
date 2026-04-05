import { useReservationContext } from "../ReservationContextProvider";
import SelectTime from "./SelectTime";
import GetUserInfo from "./GetUserInfo";
import ConfirmReservation from "./ConfirmReservation";
import ReservationComplete from "./ReservationComplete";

export default () => {
  const { currentStep } = useReservationContext();

  switch (currentStep) {
    case 1:
      return <SelectTime />;
    case 2:
      return <ConfirmReservation />;
    case 3:
      return <ReservationComplete />;
    default:
      return <GetUserInfo />;
  }
};
