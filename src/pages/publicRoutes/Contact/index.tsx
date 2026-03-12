import { Trans, useTranslation } from "react-i18next";
import GoogleMap from "../../../components/GoogleMap";
import ContactUsForm from "./ContactUsForm";

const ContactPage = () => {
  const { i18n } = useTranslation(["contact"]);

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
