import API from "./api";

export const getDepartments = async () => {
    const response = await API.get("/departments");
    return response.data;
};

export const getDepartmentById = async (id) => {
    const response = await API.get(`/departments/${id}`);
    return response.data;
};

export const createDepartment = async (data) => {
    const response = await API.post("/departments", data);
    return response.data;
};

export const updateDepartment = async (id, data) => {
    const response = await API.put(`/departments/${id}`, data);
    return response.data;
};

export const deleteDepartment = async (id) => {
    const response = await API.delete(`/departments/${id}`);
    return response.data;
};
