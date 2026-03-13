import type { IEventSettings } from "../interface/Event";
import type { IShopperInventory } from "../interface/Inventory";
import type { IShopper } from "../interface/Shopper";
import axiosInstance from "../lib/axiosInstance";

export default {
  getShoppingSettings: async (): Promise<IEventSettings> => {
    const settings = (await axiosInstance.get("/shopping/settings")).data;
    return settings;
  },
  checkout: async (
    shopper: IShopper | null,
    cart: { [key: string]: IShopperInventory },
  ): Promise<boolean> => {
    return (
      await axiosInstance.post("/shopper/checkout", {
        shopper,
        cart: Object.values(cart),
      })
    ).data;
  },
};
