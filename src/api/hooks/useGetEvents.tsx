import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../ReactQueryProvider";
import eventProvider from "../eventProvider";

const useGetEvents = (sortByUpcomingEvents: boolean = false) => {
  return useQuery({
    queryKey: queryKeys.getEvents({ sortByUpcomingEvents }),
    queryFn: () => eventProvider.getEvents(),
  });
};

export default useGetEvents;
