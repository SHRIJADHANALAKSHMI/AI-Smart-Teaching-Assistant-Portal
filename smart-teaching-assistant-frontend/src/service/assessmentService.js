import API from "./api";

export const getAssessments = async () => {
    const response = await API.get("/assessments");
    return response.data;
};

export const createAssessment = async (data) => {
    const response = await API.post("/assessments", data);
    return response.data;
};

export const deleteAssessment = async (id) => {
    const response = await API.delete(`/assessments/${id}`);
    return response.data;
};
