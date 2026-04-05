import { useState } from "react";
import BaseButton from "../../../../../components/button/BaseButton";
import { useSnackbar } from "../../../../../components/contextProviders/SnackbarProvider";
import { address } from "../../../../../lib/constants";
import { formatDateWithOrdinal } from "../../../../../lib/date";
import { useReservationContext } from "../ReservationContextProvider";
import eventProvider from "../../../../../api/eventProvider";

export default () => {
  const { selectedTime, event, onPrevStep, onNextStep, shopper } =
    useReservationContext();
  const { enqueueSnackbar } = useSnackbar();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await eventProvider
      .createReservation(event!._id, selectedTime, shopper!.shopperId)
      .then(() => {
        onNextStep();
      })
      .catch(() => {
        enqueueSnackbar("There was an error creating your reservation.", {
          variant: "error",
          autoClose: true,
          duration: 5000,
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="flex grow flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded border border-gray-300 px-4 py-8 md:w-3/4 md:px-6">
        <h4 className="mb-2 text-xl font-semibold">Confirm your reservation</h4>
        <p className="text-base md:text-center">
          You have selected a time for your reservation. Please confirm your
          reservation.
        </p>
        <div className="flex w-full">
          <div className="flex flex-col gap-4">
            <p>
              <span className="font-semibold">Event: </span>
              {formatDateWithOrdinal(event!.start)}
            </p>
            <p>
              <span className="font-semibold">Time: </span>
              {selectedTime}
            </p>
            <p>
              <span className="font-semibold">Location: </span>
              {address}
            </p>
          </div>
        </div>
        <div className="mt-12 flex w-full items-center justify-center gap-4">
          <BaseButton onClick={onPrevStep}>Back</BaseButton>
          <BaseButton
            color="secondary"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Reserve Spot
          </BaseButton>
        </div>
      </div>
    </div>
  );
};
