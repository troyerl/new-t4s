import { Link, useParams } from "react-router";
import Steps from "./components/steps";
import useGetEvent from "../../../api/hooks/useGetEvent";
import { routes } from "../../../routes/paths";
import { ChevronLeft } from "../../../icons";
import ReservationContextProvider from "./components/ReservationContextProvider";
import ReservationProgressBar from "./components/ReservationProgressBar";
import TextButton from "../../../components/button/TextButton";
import type { IEvent } from "../../../interface/Event";
import { useHeroContext } from "../../../components/contextProviders/HeroProvider";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { formatDateWithOrdinal, formatTimeRange } from "../../../lib/date";

export default () => {
  let { id = "" } = useParams();
  const { t, i18n } = useTranslation(["reserve"]);
  const { onSetHeroMainText, onSetIsLoading, onSetSubText } = useHeroContext();

  useEffect(() => {
    onSetHeroMainText(t("reserve:hero.coloredText"), t("reserve:hero.subText"));
  }, [i18n.language]);

  const { data, isLoading } = useGetEvent(id, true);

  useEffect(() => {
    onSetIsLoading(isLoading);

    if (!isLoading && !!data) {
      onSetSubText(
        <div>
          <h2 className="text-base text-white">{data.name}</h2>
          <h2 className="text-base text-white">{`${formatDateWithOrdinal(data.start)} ${formatTimeRange(data.start, data.end)}`}</h2>
          <h2 className="text-base text-white">
            Description: {data.description || "N/A"}
          </h2>
        </div>,
      );
    }
  }, [isLoading, data]);

  if (isLoading && !data) {
    return (
      <div className="h-150 w-full animate-pulse rounded-lg bg-gray-100"></div>
    );
  }

  return (
    <>
      <div className="mb-5">
        <Link to={routes.unauth.reservation.path} className="shrink-0">
          <TextButton>
            <ChevronLeft className="mr-3 size-7" /> {t("reserve:backToEvents")}
          </TextButton>
        </Link>
      </div>

      <ReservationContextProvider eventInfo={data as IEvent}>
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div className="w-full md:w-3/4">
            <ReservationProgressBar />
            <div className="mt-10">
              <Steps />
            </div>
          </div>
        </div>
      </ReservationContextProvider>
    </>
  );
};
