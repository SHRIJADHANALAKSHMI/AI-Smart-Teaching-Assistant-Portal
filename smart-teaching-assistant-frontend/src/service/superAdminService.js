import API from "./api";

export const getDashboardStats = async () => {
    const response = await API.get("/superadmin/dashboard");
    return response.data;
};

export const getColleges = async () => {
    const response = await API.get("/colleges");
    return response.data;
};

export const createCollege = async (collegeData) => {
    const response = await API.post("/colleges", collegeData);
    return response.data;
};

export const updateCollege = async (collegeId, collegeData) => {
    const response = await API.put(`/colleges/${collegeId}`, collegeData);
    return response.data;
};

export const deleteCollege = async (collegeId) => {
    const response = await API.delete(`/colleges/${collegeId}`);
    return response.data;
};

export const inviteCollegeAdmin = async (inviteData) => {
    const response = await API.post("/colleges/invite", inviteData);
    return response.data;
};

export const createCollegeAdminAccount = async (collegeId, adminData) => {
    const response = await API.post(`/colleges/${collegeId}/admins`, adminData);
    return response.data;
};

export const getAnalyticsActivity = async () => {
    const response = await API.get("/superadmin/analytics");
    return response.data;
};

export const getAiMonitoring = async () => {
    const response = await API.get("/superadmin/ai-monitoring");
    return response.data;
};
