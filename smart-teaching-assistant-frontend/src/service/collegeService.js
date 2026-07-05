import API from "./api";

export const getColleges = async () => {
    const response = await API.get("/colleges");
    return response.data;
};

export const getCollegeById = async (id) => {
    const response = await API.get(`/colleges/${id}`);
    return response.data;
};

export const createCollege = async (data) => {
    const response = await API.post("/colleges", data);
    return response.data;
};

export const updateCollege = async (id, data) => {
    const response = await API.put(`/colleges/${id}`, data);
    return response.data;
};

export const deleteCollege = async (id) => {
    const response = await API.delete(`/colleges/${id}`);
    return response.data;
};
