import API from "./api";

export const getProfessors = async () => {
    const response = await API.get("/professors/invites");
    return response.data;
};

export const getProfessorById = async (id) => {
    const response = await API.get(`/professors/invites/${id}`);
    return response.data;
};

export const inviteProfessor = async (data) => {
    const response = await API.post("/professors/invites", data);
    return response.data;
};

export const deleteProfessor = async (id) => {
    const response = await API.patch(`/professors/invites/${id}/cancel`);
    return response.data;
};

export const resendProfessorInvite = async (id) => {
    const response = await API.post(`/professors/invites/${id}/resend`);
    return response.data;
};

export const getProfessorSubjects = async () => {
    const response = await API.get("/professors/subjects");
    return response.data;
};
