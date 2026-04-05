import AddressLink from "../../components/AddressLink";
import ChildrenImage from "../../assets/img/children.png";
import Logo from "../../assets/img/logo.png";
import { UnAuthNavbar } from "../../components/navbar/UnAuthNavbar";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const Home = () => {
  const { t } = useTranslation(["common", "home"]);

  useEffect(() => {
    document.title = "T4S";
  }, []);

  return (
    <>
      <div className="flex h-screen w-screen flex-col">
        <div className="flex flex-col items-center justify-center p-4 text-center text-base font-bold">
          <h3>{t("home:header.title")}</h3>
          <AddressLink className="text-primary underline">
            {t("home:header.locationText")}
          </AddressLink>
        </div>

        <div className="sm:bg-size-auto flex grow flex-col bg-[url(/assets/background.jpg)] bg-size-[260%] bg-top bg-no-repeat sm:bg-cover sm:bg-center">
          <UnAuthNavbar isDarkText={false} />
          <div className="flex grow items-center justify-center pt-10">
            <div className="flex h-full flex-col items-center">
              <img
                src={ChildrenImage}
                alt="Children playing"
                className="h-[17vh] w-auto md:h-[25vh]"
              />
              <div className="flex flex-col gap-3 px-2 pt-2 pb-3 text-center text-white">
                <h1 className="text-4xl font-bold md:text-6xl">
                  {t("common:name")}
                </h1>
                <h2 className="text-lg md:text-xl">
                  {t("common:description")}
                </h2>
              </div>
              <img
                src={Logo}
                alt="Tools-4-Schools Logo"
                className="h-[20vh] w-auto md:h-[30vh]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
