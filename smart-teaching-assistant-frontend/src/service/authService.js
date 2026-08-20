import API from "./api";

const SESSION_KEY = "currentUser";

export const loginUser = async (email, password) => {
    const response = await API.post("/auth/login", { email, password });
    const session = response.data;
    saveSession(session);
    return session;
};

export const getProfessorInvite = async (token) => {
    const response = await API.get(`/professors/register/${encodeURIComponent(token)}`);
    return response.data;
};

export const registerProfessor = async (token, password) => {
    const response = await API.post("/professors/register", { token, password });
    return response.data;
};

export const saveSession = (session) => {
    localStorage.setItem("token", session.token);
    localStorage.setItem("role", session.role);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem(SESSION_KEY);
};

export const getCurrentUser = () => {
    const user = localStorage.getItem(SESSION_KEY);
    return user ? JSON.parse(user) : null;
};
