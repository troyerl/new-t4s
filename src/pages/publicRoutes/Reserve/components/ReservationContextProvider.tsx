import { createContext, useContext, useState, type ReactNode } from "react";
import type { IEvent } from "../../../../interface/Event";
import type { IShopper } from "../../../../interface/Shopper";

interface IReservationContext {
  currentStep: number;
  event: IEvent | null;
  shopper: IShopper | null;
  selectedTime: string;
  onNextStep: VoidFunction;
  onPrevStep: VoidFunction;
  onSetShopper: (shopperInfo: IShopper) => void;
  onSetSelectedTime: (time: string) => void;
}

const ReservationContext = createContext<IReservationContext>({
  currentStep: 0,
  event: null,
  shopper: null,
  selectedTime: "",
  onNextStep: () => {},
  onPrevStep: () => {},
  onSetShopper: (_shopperInfo) => {},
  onSetSelectedTime: (_time) => {},
});

export const useReservationContext = () => {
  return useContext(ReservationContext);
};

interface IReservationContextProvider {
  eventInfo: IEvent;
  children: ReactNode;
}

export default ({ eventInfo, children }: IReservationContextProvider) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  // const [event, _setEvent] = useState<IEvent>(eventInfo);
  const [shopper, setShopper] = useState<IShopper | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const onNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const onPrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSetShopper = (shopperInfo: IShopper) => {
    setShopper(shopperInfo);
  };

  const onSetSelectedTime = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <ReservationContext.Provider
      value={{
        currentStep,
        event: eventInfo,
        shopper,
        selectedTime,
        onNextStep,
        onPrevStep,
        onSetShopper,
        onSetSelectedTime,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
