import API from "./api";

export const getSubjects = async () => {
    const response = await API.get("/subjects");
    return response.data;
};

export const getSubjectById = async (id) => {
    const response = await API.get(`/subjects/${id}`);
    return response.data;
};

export const createSubject = async (data) => {
    const response = await API.post("/subjects", data);
    return response.data;
};

export const updateSubject = async (id, data) => {
    const response = await API.put(`/subjects/${id}`, data);
    return response.data;
};

export const deleteSubject = async (id) => {
    const response = await API.delete(`/subjects/${id}`);
    return response.data;
};
