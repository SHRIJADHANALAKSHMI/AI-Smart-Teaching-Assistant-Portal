import { Outlet } from "react-router-dom";

export default function SuperAdminLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}
