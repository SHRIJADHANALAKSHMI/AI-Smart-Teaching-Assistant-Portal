import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../service/authService';

export default function ProtectedRoute({ children, allowedRoles }) {
    const user = getCurrentUser();

    if (!user) {
        // If not logged in, redirect to login
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // If logged in but wrong role, redirect to their proper dashboard
        const role = user.role?.toUpperCase();
        if (role === 'SUPER_ADMIN') return <Navigate to="/super-admin/dashboard" replace />;
        if (role === 'COLLEGE_ADMIN' || role === 'ADMIN') return <Navigate to="/collegeadmin" replace />;
        if (role === 'PROFESSOR' || role === 'STAFF') return <Navigate to="/professor/dashboard" replace />;
        return <Navigate to="/login" replace />;
    }

    return children;
}
