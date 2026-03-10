import axiosInstance from "@src/axiosInstance";
import { IContactForm } from "@src/routes/(publicNavbar)/contact-us/components/ContactForm";
import { AxiosResponse } from "axios";

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
