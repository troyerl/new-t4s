import axiosInstance from "@src/axiosInstance";
export default {
  getSchoolNames: async (): Promise<string[]> => {
    const schools = (await axiosInstance.get("/school/list?distinct=name"))
      .data;

    return schools;
  },
};
