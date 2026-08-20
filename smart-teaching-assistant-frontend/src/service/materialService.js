import API from "./api";

export const getMaterials = async () => {
    const response = await API.get("/materials");
    return response.data;
};

export const createMaterial = async (data) => {
    const response = await API.post("/materials", data);
    return response.data;
};

export const uploadMaterial = async ({ file, subjectId }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("subjectId", subjectId);
    const response = await API.post("/materials/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const downloadMaterial = async (id) => {
    const response = await API.get(`/materials/${id}/download`, { responseType: "blob" });
    return response.data;
};

export const deleteMaterial = async (id) => {
    const response = await API.delete(`/materials/${id}`);
    return response.data;
};
