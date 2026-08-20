import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8081/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to add auth token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor for error handling and ApiResponse unpacking
API.interceptors.response.use(
    (response) => {
        // Automatically unwrap Spring Boot ApiResponse DTOs if present
        if (response.data && typeof response.data.success === 'boolean') {
            if (response.data.success) {
                // Replace the axios response data with our actual payload
                response.data = response.data.data;
            } else {
                // It's a structured error from the backend but returned HTTP 200 (though usually it's 400/500)
                return Promise.reject(new Error(response.data.message || "Unknown error"));
            }
        }
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("currentUser");
            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }

        // Try to extract the backend's error message if available
        if (error.response?.data?.message) {
            error.message = error.response.data.message;
        }

        return Promise.reject(error);
    }
);

export default API;
