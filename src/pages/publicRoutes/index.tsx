import { Outlet, useLocation } from "react-router";
import { UnAuthNavbar } from "../../components/navbar/UnAuthNavbar";
import Footer from "../../components/Footer";
import BasePageContainer from "../../components/BasePageContainer";
import HeroSection, {
  BaseHeroSubHeader,
  StackedHeader,
} from "../../components/HeroSection";
import { routes } from "../../routes/paths";
import AddressLink from "../../components/AddressLink";
import { email } from "../../lib/constants";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const usePageHeroContent = () => {
  const { t } = useTranslation(["common", "hero"]);

  const pageHeroContent = {
    [routes.unauth.inventory.path]: {
      coloredText: "hero:inventory.coloredText",
      subHeader: "hero:inventory.subText",
      content: <BaseHeroSubHeader text={t("hero:inventory.description")} />,
    },
    [routes.unauth.reservation.path]: {
      coloredText: "hero:reservation.coloredText",
      subHeader: "hero:reservation.subText",
      content: <BaseHeroSubHeader text={t("hero:reservation.description")} />,
    },
    [routes.unauth.contactUs.path]: {
      coloredText: "hero:contact.coloredText",
      subHeader: "hero:contact.subText",
      content: (
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
        </div>
      ),
    },
    [routes.unauth.faqs.path]: {
      coloredText: "hero:faq.coloredText",
      subHeader: "hero:faq.subText",
      content: <BaseHeroSubHeader text={t("hero:faq.description")} />,
    },
  };

  return { pageHeroContent };
};

const PublicLayout = () => {
  const loc = useLocation();
  const { pageHeroContent } = usePageHeroContent();
  const heroContent = pageHeroContent[loc.pathname];
  const { t } = useTranslation(["hero"]);

  useEffect(() => {
    const label = Object.values(routes.unauth).find(
      (route) => route.path === loc.pathname,
    )?.label;

    document.title = `T4S${label ? ` - ${t(label)}` : ""}`;
  }, [loc.pathname]);

  return (
    <>
      <UnAuthNavbar />
      <HeroSection
        header={
          <StackedHeader
            main={t(heroContent.coloredText)}
            subtext={t(heroContent.subHeader)}
          />
        }
      >
        {heroContent.content}
      </HeroSection>
      <BasePageContainer>
        <Outlet />
      </BasePageContainer>
      <Footer />
    </>
  );
};

export default PublicLayout;
