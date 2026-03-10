import { email } from "../lib/constants";
import { routes } from "../routes/paths";
import Logo from "../assets/img/logo.png";
import { Link } from "react-router";
import AddressLink from "./AddressLink";
import { useTranslation } from "react-i18next";

const linkSections = [
  {
    title: "common:name",
    subLinks: [
      { label: "footer:contactUs", url: routes.unauth.contactUs.path },
      { label: "footer:faqs", url: routes.unauth.faqs.path },
    ],
  },
  {
    title: "footer:legal",
    subLinks: [{ label: "footer:privacyPolicy", url: routes.unauth.faqs.path }],
  },
  {
    title: "navbar:public.contact",
    subLinks: [{ label: email, url: `mailto:${email}` }],
  },
] as const;

export default function Footer() {
  const { t } = useTranslation(["common", "footer", "navbar"]);
  return (
    <footer className="border-t border-gray-200 px-4 pt-8 text-center text-sm text-gray-500">
      <div className="flex flex-col gap-10 lg:mx-35 lg:flex-row">
        <div className="flex w-full flex-col items-center gap-4 text-center lg:w-1/4 lg:items-start lg:text-left">
          <img src={Logo} alt="Tools-4-Schools Logo" className="h-16 w-auto" />
          <p>{t("common:description")}</p>
        </div>

        <div className="flex grow">
          <div className="flex w-full flex-col justify-around gap-8 lg:flex-row">
            {linkSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                <h4 className="font-bold">{t(section.title)}</h4>
                <div className="flex flex-col gap-4">
                  {section.subLinks.map((link) => (
                    <Link
                      key={link.url}
                      to={link.url}
                      className="hover:underline"
                    >
                      {t(link.label)}
                    </Link>
                  ))}
                  {section.title === "navbar:public.contact" ? (
                    <AddressLink className="hover:underline" />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pb-4 pt-8">
        © {new Date().getFullYear()} {t("common:allRightsReserved")}
      </div>
    </footer>
  );
}
