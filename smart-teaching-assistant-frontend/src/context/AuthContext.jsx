/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";
import { getCurrentUser, logoutUser, saveSession } from "../service/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(getCurrentUser());
    const [role, setRole] = useState(getCurrentUser()?.role || null);
    const [loading] = useState(false);

    const login = (session) => {
        saveSession(session);
        setUser(session);
        setRole(session.role);
    };

    const logout = () => {
        setUser(null);
        setRole(null);
        logoutUser();
    };

    return (
        <AuthContext.Provider value={{ user, role, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export default AuthContext;
