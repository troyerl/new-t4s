import type { IEvent } from "../interface/Event";
import axiosInstance from "../lib/axiosInstance";

export default {
  getEvents: async (): Promise<IEvent[]> => {
    return (await axiosInstance.get("/event/list")).data;
  },
  getEvent: async (eventId: string, showSpots?: boolean): Promise<IEvent[]> => {
    return (
      await axiosInstance.get(`/event/${eventId}`, {
        params: {
          showSpots,
        },
      })
    ).data;
  },
  createReservation: async (
    eventId: string,
    time: string,
    shopperId: string,
  ) => {
    return await axiosInstance.post(`/event/${eventId}/reservation`, {
      time,
      shopperId,
    });
  },
};
