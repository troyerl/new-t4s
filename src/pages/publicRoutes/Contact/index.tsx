import { Trans, useTranslation } from "react-i18next";
import GoogleMap from "../../../components/GoogleMap";
import ContactUsForm from "./ContactUsForm";
import { useEffect } from "react";
import { useHeroContext } from "../../../components/contextProviders/HeroProvider";
import AddressLink from "../../../components/AddressLink";
import { email } from "../../../lib/constants";

const ContactPage = () => {
  const { t, i18n } = useTranslation(["contact", "common"]);
  const { onSetHeroMainText } = useHeroContext();

  useEffect(() => {
    onSetHeroMainText(
      t("contact:hero.coloredText"),
      t("contact:hero.subText"),
      <div className="flex flex-col items-center text-base text-white lg:items-start">
        <AddressLink className="underline" id="address-link">
          <>
            <br className="lg:hidden" />
            <span className="text-primary">
              {" "}
              ({t("common:clickForDirections")})
            </span>
          </>
        </AddressLink>
        <p>{email}</p>
      </div>,
    );
  }, [i18n.language]);

  return (
    <div className="flex w-full flex-col gap-15 lg:flex-row">
      <div className="animate-slide-in-from-bottom w-full opacity-0 lg:w-1/2">
        <div className="mb-8 text-center lg:text-left">
          <h3 className="text-3xl font-semibold">
            <Trans
              i18n={i18n}
              i18nKey="contact:title"
              components={{
                BreakComponent: <br />,
              }}
            />
          </h3>
        </div>

        <ContactUsForm />
      </div>
      <div
        className="animate-slide-in-from-bottom grow opacity-0"
        style={{ animationDelay: `0.2s` }}
      >
        <GoogleMap />
      </div>
    </div>
  );
};

export default ContactPage;
