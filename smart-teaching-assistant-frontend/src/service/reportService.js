import API from "./api";

export const getReports = async () => {
    const response = await API.get("/reports");
    return response.data;
};

export const generateReport = async (type) => {
    const response = await API.post("/reports/generate", { type });
    return response.data;
};

export const downloadReport = async (id) => {
    const response = await API.get(`/reports/${id}/download`, {
        responseType: "blob",
    });
    return response.data;
};
