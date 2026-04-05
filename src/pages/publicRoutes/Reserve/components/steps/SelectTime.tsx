import BaseButton from "../../../../../components/button/BaseButton";
import {
  FormComboboxField,
  type ComboboxOptions,
} from "../../../../../components/form/ComboboxField";
import { useReservationContext } from "../ReservationContextProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const SelectTimeSchema = yup.object().shape({
  selectedTime: yup.string().required("contact:form.name.error"),
});

export type ISelectTimeForm = yup.InferType<typeof SelectTimeSchema>;

export default () => {
  const { event, onSetSelectedTime, selectedTime } = useReservationContext();
  const { onPrevStep, onNextStep } = useReservationContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SelectTimeSchema),
    defaultValues: {
      selectedTime: selectedTime || "",
    },
  });

  console.log(event);

  const times = Object.keys(event?.spotDetails?.availableSpots || {});

  const onSubmit = (data: ISelectTimeForm) => {
    onSetSelectedTime(data.selectedTime);
    onNextStep();
  };

  return (
    <form
      className="flex w-full flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col md:w-1/2">
        <h4 className="mb-3 text-xl font-semibold">Reserve a time!</h4>
        <FormComboboxField
          inputProps={register("selectedTime")}
          options={times.map(
            (time) => ({ label: time, value: time }) as ComboboxOptions,
          )}
          error={errors.selectedTime?.message}
          label="Select a time"
          id="time-select"
          value={""}
        />
      </div>

      <div className="mt-8 flex w-full justify-between">
        <BaseButton type="button" onClick={onPrevStep}>
          Back
        </BaseButton>
        <BaseButton type="submit" disabled={!selectedTime}>
          Confirm Reservation
        </BaseButton>
      </div>
    </form>
  );
};
