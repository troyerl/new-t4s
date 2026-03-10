import axiosInstance from "@src/axiosInstance";
import { IEventSettings } from "@src/interface/Event";
import { IShopperInventory } from "@src/interface/Inventory";
import { IShopper } from "@src/interface/Shopper";

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
