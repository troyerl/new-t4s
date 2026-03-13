import axiosInstance from "../lib/axiosInstance";

export default {
  getSchoolNames: async (): Promise<string[]> => {
    const schools = (await axiosInstance.get("/school/list?distinct=name"))
      .data;

    return schools;
  },
};
