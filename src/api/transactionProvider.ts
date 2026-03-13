import type {
  IInventoryDisplay,
  ICustomTransactionItem,
} from "../interface/Inventory";
import type { IShopper } from "../interface/Shopper";
import type { ITransaction } from "../interface/Transaction";
import axiosInstance from "../lib/axiosInstance";

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
