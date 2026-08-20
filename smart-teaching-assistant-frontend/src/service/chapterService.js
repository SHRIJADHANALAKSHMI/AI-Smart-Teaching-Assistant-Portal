import API from "./api";

export const getChaptersBySubject = async (subjectId) => {
    const response = await API.get(`/chapters/subject/${subjectId}`);
    return response.data;
};

export const createChapter = async (data) => {
    const response = await API.post("/chapters", data);
    return response.data;
};
