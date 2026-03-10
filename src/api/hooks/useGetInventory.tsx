import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../ReactQueryProvider";
import inventoryProvider from "../inventoryProvider";

const useGetInventory = (showAvailableItems: boolean, location?: string) => {
  return useQuery({
    queryKey: queryKeys.inventory(showAvailableItems, location),
    queryFn: () => inventoryProvider.getInventory(showAvailableItems, location),
  });
};

export default useGetInventory;
