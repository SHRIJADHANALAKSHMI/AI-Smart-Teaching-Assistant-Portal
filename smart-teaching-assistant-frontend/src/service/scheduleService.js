import API from "./api";

export const getMySchedules = async () => {
    const response = await API.get("/schedules/me");
    return response.data;
};

export const createSchedule = async (data) => {
    const response = await API.post("/schedules", data);
    return response.data;
};
