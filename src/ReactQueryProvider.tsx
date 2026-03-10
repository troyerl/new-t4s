import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

export const clearCache = (key: any[]) => {
  queryClient.invalidateQueries({ queryKey: key });
};

export const queryKeys = {
  inventory: (showAvailableItems: boolean, location?: string) => [
    "inventory",
    showAvailableItems,
    location || "all",
  ],
  schools: (distinct?: string) => ["schools", distinct ?? "All"],
  getShopper: (id: string, checkLastUpdated: boolean) => [
    "shopper",
    id,
    checkLastUpdated ? "checkLastUpdated=true" : "checkLastUpdated=false",
  ],
  getShoppingSettings: () => ["shoppingSettings"],
  getEvents: () => ["events"],
  getEvent: (eventId: string, showSpots?: boolean) => [
    "event",
    eventId,
    showSpots ? "showSpots=true" : "showSpots=false",
  ],
  getTransactions: (token: string) => ["transactions", token],
  getShoppers: () => ["shoppers"],
  getTransaction: (transactionId: string) => ["transaction", transactionId],
};

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
