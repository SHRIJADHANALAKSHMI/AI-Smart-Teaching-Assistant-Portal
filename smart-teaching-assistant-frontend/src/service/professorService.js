import API from "./api";

export const getProfessors = async () => {
    const response = await API.get("/professors");
    return response.data;
};

export const getProfessorById = async (id) => {
    const response = await API.get(`/professors/${id}`);
    return response.data;
};

export const inviteProfessor = async (data) => {
    const response = await API.post("/professors/invite", data);
    return response.data;
};

export const deleteProfessor = async (id) => {
    const response = await API.delete(`/professors/${id}`);
    return response.data;
};
