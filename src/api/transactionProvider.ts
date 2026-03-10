import axiosInstance from "@src/axiosInstance";
import {
  ICustomTransactionItem,
  IInventoryDisplay,
} from "@src/interface/Inventory";
import { IShopper } from "@src/interface/Shopper";
import { ITransaction } from "@src/interface/Transaction";

export default {
  getTransactions: async (token?: string): Promise<IInventoryDisplay[]> => {
    try {
      const response = await axiosInstance.get("/transaction/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  },
  createTransaction: async (
    cart: ICustomTransactionItem[],
    shopper: IShopper,
    token?: string,
  ): Promise<{ transactionId: string }> => {
    try {
      const response = await axiosInstance.post(
        "/transaction",
        {
          cart,
          shopper,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  },
  getTransaction: async (
    transactionId: string,
    token?: string,
  ): Promise<ITransaction> => {
    try {
      const response = await axiosInstance.get(
        `/transaction/${transactionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  },
};
