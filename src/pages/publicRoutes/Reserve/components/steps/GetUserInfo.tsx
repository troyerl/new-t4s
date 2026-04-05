import InputShopperCode from "../getMember/InputShopperCode";
import InputShopperInfo from "../getMember/InputShopperInfo";
import Logo from "../../../../../assets/img/logo.png";
import { useReservationContext } from "../ReservationContextProvider";
// import ConfirmInfoModal from "./ConfirmInfoModal";
import type {
  IGetShopperResponse,
  IShopper,
} from "../../../../../interface/Shopper";
import BaseButton from "../../../../../components/button/BaseButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default () => {
  const { onNextStep, shopper, onSetShopper } = useReservationContext();
  const { t } = useTranslation(["common", "reserve"]);

  const [showCodeScreen, setShowCodeScreen] = useState<boolean>(true);
  const [modifiableShopper, setModifiableShopper] = useState<IShopper>();

  const onToggleScreen = () => {
    setShowCodeScreen((prev) => !prev);
  };

  const onSubmit = async (shopperResponse: IGetShopperResponse) => {
    if (!shopperResponse.needsUpdated) {
      onSetShopper(shopperResponse.shopper);
      return;
    }
    setModifiableShopper(shopperResponse.shopper);
  };

  const closeModal = () => {
    setModifiableShopper(undefined);
  };

  return (
    <>
      {/* {modifiableShopper && (
        <ConfirmInfoModal
          shopper={modifiableShopper}
          closeModal$={closeModal}
        />
      )} */}
      <div className="flex grow flex-col items-center justify-center">
        <div className="w-full md:w-3/4">
          <div
            className={`mb-6 flex w-full ${showCodeScreen ? "justify-center" : "justify-between"}`}
          >
            <div className="flex flex-col gap-2">
              <h4 className="text-xl font-semibold">
                {showCodeScreen
                  ? t("reserve:userInfo.code.title")
                  : t("reserve:userInfo.manual.title")}
              </h4>
              <h5>
                {showCodeScreen
                  ? t("reserve:userInfo.code.subtitle")
                  : t("reserve:userInfo.manual.subtitle")}
              </h5>
            </div>
            <div>
              <img src={Logo} className="w-12.5 h-12.5" />
            </div>
          </div>
          {showCodeScreen ? (
            <InputShopperCode
              onToggleScreen={onToggleScreen}
              onSubmit={onSubmit}
            />
          ) : (
            <InputShopperInfo
              onToggleScreen={onToggleScreen}
              onSubmit$={onSubmit}
            />
          )}

          {!!shopper && (
            <div className="mt-8 flex w-full justify-center">
              <BaseButton disabled={!shopper} onClick={onNextStep}>
                {t("common:next")}
              </BaseButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
