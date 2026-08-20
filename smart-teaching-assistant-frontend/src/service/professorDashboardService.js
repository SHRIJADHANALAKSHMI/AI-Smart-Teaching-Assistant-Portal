import API from "./api";

export const getDashboardStats = async () => {
    const response = await API.get("/professors/dashboard/stats");
    return response.data;
};
