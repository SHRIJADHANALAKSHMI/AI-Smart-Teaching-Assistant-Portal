import { Outlet, useNavigate } from "react-router-dom";
import {
    FaBars,
    FaPlus,
    FaChartLine,
    FaRobot,
    FaCog,
    FaUserTie,
} from "react-icons/fa";

export default function SuperAdminLayout() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-blue-900 text-white p-6 hidden md:block">
                <h2 className="text-2xl font-bold mb-6">STA Portal</h2>

                <ul className="space-y-3">
                    <li onClick={() => navigate("/superadmin/dashboard")} className="flex items-center gap-2 p-2 rounded hover:bg-blue-700 cursor-pointer">
                        <FaBars />
                        Dashboard
                    </li>

                    <li onClick={() => navigate("/superadmin/colleges")} className="flex items-center gap-2 p-2 rounded hover:bg-blue-700 cursor-pointer">
                        <FaPlus />
                        Add College
                    </li>

                    <li onClick={() => navigate("/superadmin/analytics")} className="flex items-center gap-2 p-2 rounded hover:bg-blue-700 cursor-pointer">
                        <FaChartLine />
                        Analytics
                    </li>

                    <li onClick={() => navigate("/superadmin/ai-monitoring")} className="flex items-center gap-2 p-2 rounded hover:bg-blue-700 cursor-pointer">
                        <FaRobot />
                        AI Monitoring
                    </li>

                    <li onClick={() => navigate("/superadmin/invite-college")} className="flex items-center gap-2 p-2 rounded hover:bg-blue-700 cursor-pointer">
                        <FaCog />
                        Invite College Admin
                    </li>
                    <li onClick={() => navigate("/superadmin/settings")} className="flex items-center gap-2 p-2 rounded hover:bg-blue-700 cursor-pointer">
                        <FaCog />
                        Settings
                    </li>

                    <li onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("role");
                        localStorage.removeItem("currentUser");
                        navigate("/login");
                    }} className="flex items-center gap-2 p-2 rounded hover:bg-red-700 cursor-pointer mt-4">
                        <FaUserTie />
                        Logout
                    </li>
                </ul>
            </aside>

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <FaBars className="text-gray-700 md:hidden cursor-pointer hover:text-blue-600 transition" size={24} />
                        <h1 className="text-2xl font-bold text-gray-800">
                            Super Admin Console
                        </h1>
                    </div>

                    <div className="font-medium text-gray-700 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200">
                            S
                        </div>
                        <span className="hidden sm:inline">Super Admin !!</span>
                    </div>
                </header>

                <main className="flex-1 overflow-auto p-6 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
