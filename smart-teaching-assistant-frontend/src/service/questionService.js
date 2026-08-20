import API from "./api";

export const getQuestions = async () => {
    const response = await API.get("/questions");
    return response.data;
};

export const createQuestion = async (data) => {
    const response = await API.post("/questions", data);
    return response.data;
};

export const deleteQuestion = async (id) => {
    const response = await API.delete(`/questions/${id}`);
    return response.data;
};
