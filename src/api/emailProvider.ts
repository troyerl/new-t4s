import type { AxiosResponse } from "axios";
import axiosInstance from "../lib/axiosInstance";
import type { IContactForm } from "../pages/publicRoutes/Contact/ContactUsForm";

interface IFeedbackForm {
  feedback: {
    rating: number;
    response: string;
  };
  user?: {
    name: string;
    email: string;
    school: string;
  };
}

export default {
  sendContactEmail: async (
    formData: IContactForm,
  ): Promise<AxiosResponse<any, any>> => {
    return await axiosInstance.post("/email/contact", formData);
  },
  sendFeedbackEmail: async (
    formData: IFeedbackForm,
  ): Promise<AxiosResponse<any, any>> => {
    return await axiosInstance.post("/email/feedback", formData);
  },
};
