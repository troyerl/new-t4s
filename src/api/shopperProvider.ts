import type { IGetShopperResponse, IShopper } from "../interface/Shopper";
import axiosInstance from "../lib/axiosInstance";

export default {
  getShopper: async (
    id: string,
    checkLastUpdated: boolean = false,
  ): Promise<IGetShopperResponse> => {
    const url = `/shopper/${id}${checkLastUpdated ? "?checkLastUpdated=true" : ""}`;
    const shopper = (await axiosInstance.get(url)).data;
    return shopper;
  },
  createShopper: async (shopper: IShopper): Promise<any> => {
    return (await axiosInstance.post("/shopper", shopper)).data;
  },
  updateShopper: async (shopper: IShopper): Promise<any> => {
    const { shopperId, ...rest } = shopper;
    return (await axiosInstance.put(`/shopper/${shopperId}`, rest)).data;
  },
  getShoppers: async (): Promise<IShopper[]> => {
    return (await axiosInstance.get("/shopper/list")).data;
  },
};
