import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHeroContext } from "../../../components/contextProviders/HeroProvider";
import { BaseHeroSubHeader } from "../../../components/HeroSection";

const FAQPage = () => {
  const { t, i18n } = useTranslation(["faq"]);
  const { onSetHeroMainText } = useHeroContext();

  useEffect(() => {
    onSetHeroMainText(
      t("faq:hero.coloredText"),
      t("faq:hero.subText"),
      <BaseHeroSubHeader text={t("faq:hero.description")} />,
    );
  }, [i18n.language]);

  return (
    <div>
      <h1>Frequently Asked Questions</h1>
      <p>Here you can find answers to common questions about our services.</p>
      <h2>What is T4S?</h2>
      <p>
        T4S is a platform that provides tools and resources for managing your
        inventory and reservations.
      </p>
      <h2>How do I create an account?</h2>
      <p>
        You can create an account by clicking on the "Sign Up" button on the top
        right corner of the homepage and filling out the registration form.
      </p>
      <h2>How do I contact support?</h2>
      <p>
        You can contact our support team by clicking on the "Contact Us" link in
        the footer of the website or by sending an email to support@t4s.com.
      </p>
    </div>
  );
};

export default FAQPage;
