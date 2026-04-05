import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../ReactQueryProvider";
import eventProvider from "../eventProvider";

const useGetEvent = (id: string, showSpots: boolean = false) => {
  return useQuery({
    queryKey: queryKeys.getEvent(id, showSpots),
    queryFn: () => eventProvider.getEvent(id, showSpots),
  });
};

export default useGetEvent;
