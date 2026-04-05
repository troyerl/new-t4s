import { Outlet, useLocation } from "react-router";
import { UnAuthNavbar } from "../../components/navbar/UnAuthNavbar";
import Footer from "../../components/Footer";
import BasePageContainer from "../../components/BasePageContainer";
import HeroSection, { StackedHeader } from "../../components/HeroSection";
import { routes } from "../../routes/paths";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ComboboxField } from "../../components/form/ComboboxField";
import { SupportedLanguages } from "../../i18n";
import HeroContextProvider, {
  useHeroContext,
} from "../../components/contextProviders/HeroProvider";
import LanguageDropdown from "../../components/LanguageDropdown";

const PublicLayoutContainer = () => {
  return (
    <HeroContextProvider>
      <PublicLayout />
    </HeroContextProvider>
  );
};

const PublicLayout = () => {
  const loc = useLocation();
  const { t } = useTranslation(["hero"]);
  const { isLoading, mainColoredText, baseTitleText, subText } =
    useHeroContext();

  useEffect(() => {
    const label = Object.values(routes.unauth).find(
      (route) => route.path === loc.pathname,
    )?.label;

    document.title = `T4S${label ? ` - ${t(label)}` : ""}`;
  }, [loc.pathname]);

  return (
    <>
      <UnAuthNavbar leftAction={<LanguageDropdown />} />
      <HeroSection
        header={
          <StackedHeader main={mainColoredText} subtext={baseTitleText} />
        }
      >
        {isLoading ? (
          <div className="h-10 w-full lg:w-100 animate-pulse rounded-lg bg-gray-100"></div>
        ) : (
          subText
        )}
      </HeroSection>
      <BasePageContainer>
        <Outlet />
      </BasePageContainer>
      <Footer />
    </>
  );
};

export default PublicLayoutContainer;
