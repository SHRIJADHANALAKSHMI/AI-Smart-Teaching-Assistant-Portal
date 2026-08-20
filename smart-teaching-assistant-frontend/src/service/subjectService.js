import API from "./api";

export const getSubjects = async (departmentId) => {
    const url = `/departments/${departmentId}/subjects`;
    const response = await API.get(url);
    return response.data;
};

export const getSubjectById = async (id) => {
    const response = await API.get(`/subjects/${id}`);
    return response.data;
};

export const createSubject = async (departmentId, data) => {
    const url = `/departments/${departmentId}/subjects`;
    const response = await API.post(url, data);
    return response.data;
};

export const updateSubject = async (departmentId, id, data) => {
    const url = `/departments/${departmentId}/subjects/${id}`;
    const response = await API.put(url, data);
    return response.data;
};

export const deleteSubject = async (departmentId, id) => {
    const url = `/departments/${departmentId}/subjects/${id}`;
    const response = await API.delete(url);
    return response.data;
};
