import API from "./api";

export const getDashboardStats = async () => {
    const response = await API.get("/dashboard/stats");
    return response.data;
};

export const getRecentActivity = async () => {
    const response = await API.get("/dashboard/activity");
    return response.data;
};
