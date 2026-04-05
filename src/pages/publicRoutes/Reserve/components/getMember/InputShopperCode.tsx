import { useState } from "react";
import shopperProvider from "../../../../../api/shopperProvider";
import BaseButton from "../../../../../components/button/BaseButton";
import TextButton from "../../../../../components/button/TextButton";
import { SolidCheckBadge } from "../../../../../icons";
import type { IGetShopperResponse } from "../../../../../interface/Shopper";
import { useReservationContext } from "../ReservationContextProvider";
import { useSnackbar } from "../../../../../components/contextProviders/SnackbarProvider";
import CodeInput from "../../../../../components/codeInput";
import { useTranslation } from "react-i18next";

interface IInputShopperCodeProps {
  onToggleScreen: VoidFunction;
  onSubmit: (shopperInfo: IGetShopperResponse) => void;
}

export default ({ onToggleScreen, onSubmit }: IInputShopperCodeProps) => {
  const { shopper } = useReservationContext();
  const { t } = useTranslation(["reserve"]);

  const codeLength = 4;
  const [code, setCode] = useState<string>(shopper?.shopperId || "");
  const [isGettingShopperInfo, setIsGettingShopperInfo] =
    useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const onComplete = async (code: string) => {
    console.log(code);
    if (code.length !== codeLength) {
      return;
    }

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setIsGettingShopperInfo(true);

    await shopperProvider
      .getShopper(code, true)
      .then(async (response) => {
        onSubmit(response);
      })
      .catch(async (error) => {
        if (error.response.status === 404) {
          enqueueSnackbar("Unable to find shopper with that code.", {
            variant: "error",
            autoClose: true,
            duration: 5000,
          });
          return;
        }

        enqueueSnackbar("There was an error retrieving the shopper.", {
          variant: "error",
          autoClose: true,
          duration: 5000,
        });
      })
      .finally(() => {
        setTimeout(() => {
          setIsGettingShopperInfo(false);
        }, 1000);
      });
  };

  const onChange = (input: string) => {
    setCode(input);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <CodeInput
            size={codeLength}
            onComplete={onComplete}
            onChange={onChange}
            className="mb-6"
            type="tel"
            defaultValue={shopper?.shopperId}
          />
          {!shopper && (
            <div className="flex justify-center">
              <BaseButton
                isLoading={isGettingShopperInfo}
                onClick={() => onComplete(code)}
                className="px-10!"
                disabled={code.length !== codeLength}
              >
                {isGettingShopperInfo ? "Retrieving Info..." : "Get My Info"}
              </BaseButton>
            </div>
          )}
        </div>
      </div>
      {shopper && (
        <div className="mt-6 flex flex-row items-center justify-center gap-3 rounded bg-green-200 px-8 py-4 text-center">
          <SolidCheckBadge className="size-7 text-green-500" />
          <p>Welcome back, {shopper.firstName}!</p>
        </div>
      )}

      {!shopper && (
        <div className="mt-6 flex flex-col items-center text-center">
          <h3>{t("reserve:userInfo.manual.helpText")}</h3>
          <TextButton onClick={onToggleScreen}>
            {t("reserve:userInfo.manual.change")}
          </TextButton>
        </div>
      )}
    </div>
  );
};
