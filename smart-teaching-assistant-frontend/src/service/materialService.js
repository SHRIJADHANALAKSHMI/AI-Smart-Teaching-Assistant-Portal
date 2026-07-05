import API from "./api";

export const getMaterials = async () => {
    const response = await API.get("/materials");
    return response.data;
};

export const uploadMaterial = async (formData) => {
    const response = await API.post("/materials/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const deleteMaterial = async (id) => {
    const response = await API.delete(`/materials/${id}`);
    return response.data;
};
