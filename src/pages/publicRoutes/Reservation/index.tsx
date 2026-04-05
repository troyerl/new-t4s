import { useNavigate } from "react-router";
import useGetEvents from "../../../api/hooks/useGetEvents";
import BaseButton from "../../../components/button/BaseButton";
import { routes } from "../../../routes/paths";
import { formatDateWithOrdinal, formatTimeRange } from "../../../lib/date";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHeroContext } from "../../../components/contextProviders/HeroProvider";
import { BaseHeroSubHeader } from "../../../components/HeroSection";

const ReservationPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(["reservation"]);
  const { onSetHeroMainText } = useHeroContext();

  const { data = [], isLoading } = useGetEvents();
  const [liRefs, setLiRefs] = useState<Record<number, HTMLElement>>({});
  const [cardHeight, setCardHeight] = useState<number>(225);

  useEffect(() => {
    onSetHeroMainText(
      t("reservation:hero.coloredText"),
      t("reservation:hero.subText"),
      <BaseHeroSubHeader text={t("reservation:hero.description")} />,
    );
  }, [i18n.language]);

  useEffect(() => {
    Object.values(liRefs).forEach((el) => {
      if (el.offsetHeight > cardHeight) {
        setCardHeight(el.offsetHeight);
      }
    });
  }, []);

  const onGoToEvent = (id: string) => {
    navigate(`${routes.unauth.reserve.path}/${id}`);
  };

  if (isLoading) {
    return (
      <div className="h-150 w-full animate-pulse rounded-lg bg-gray-100"></div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full p-8 text-center" aria-live="polite">
        <h3 className="text-2xl text-gray-500">
          No events scheduled at this time.
        </h3>
      </div>
    );
  }

  return (
    <div className="animate-slide-in-from-bottom mt-8 w-full p-4 text-center md:p-8">
      <h3 className="mb-10 text-3xl font-semibold text-gray-900">
        Upcoming Events
      </h3>
      <ul className="flex flex-col justify-center gap-4 space-y-4 md:flex-row">
        {data.map((event, index) => (
          <li
            ref={(el) =>
              setLiRefs((refs) => {
                const refRecord = refs;
                refRecord[index] = el as HTMLElement;
                return refRecord;
              })
            }
            key={event._id}
            className={`m-0 h-[${cardHeight}px] w-full transform rounded-xl border border-gray-200 bg-white p-6 shadow-md transition duration-200 ease-in-out hover:scale-[1.01] hover:shadow-lg md:w-125`}
          >
            <div className="flex h-full flex-col justify-between space-y-4 text-center">
              <div className="mt-1 grow md:grow-0">
                <h4 className="mb-2 text-xl font-semibold text-gray-900">
                  {event.name}
                </h4>
                <p className="text text-gray-600">
                  {formatDateWithOrdinal(event.start)}
                </p>
                <p className="text-sm text-gray-500">
                  {formatTimeRange(event.start, event.end)}
                </p>
                {event.description && (
                  <p className="mt-3 text-sm text-gray-700">
                    {event.description}
                  </p>
                )}
              </div>

              <div className="shrink-0">
                <BaseButton
                  className="px-4 py-2"
                  onClick={() => onGoToEvent(event._id)}
                >
                  Reserve
                </BaseButton>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationPage;
