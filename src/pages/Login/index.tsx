import LoginForm from "./LoginForm";
import Logo from "../../assets/img/logo.png";
import { Link } from "react-router";
import { routes } from "../../routes/paths";
import { UnAuthNavbar } from "../../components/navbar/UnAuthNavbar";
import { Trans, useTranslation } from "react-i18next";
import LanguageDropdown from "../../components/LanguageDropdown";

const LoginPage = () => {
  const { t } = useTranslation(["login"]);
  return (
    <>
      <UnAuthNavbar leftAction={<LanguageDropdown />} />
      <div className="flex h-screen w-screen flex-col">
        <div className="screen-width-border flex grow flex-col items-center justify-center py-10">
          <div className="w-full md:w-125">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h1 className="text-xl font-semibold">{t("login:title")}</h1>
                <h2 className="text-gray-600">{t("login:subtitle")}</h2>
              </div>
              <img
                src={Logo}
                alt="Tools-4-Schools Logo"
                className="h-16 w-auto"
              />
            </div>

            <div className="flex flex-col gap-4">
              <LoginForm />
              <div className="mb-2 flex w-full flex-col justify-center gap-2">
                <p className="font-semibold">{t("login:teacherDescription")}</p>
                <p>
                  <Trans
                    i18nKey="login:linkToReservation"
                    components={{
                      LinkComponent: (
                        <Link
                          className="font-semibold text-primary hover:underline"
                          to={routes.unauth.reservation.path}
                        />
                      ),
                    }}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
