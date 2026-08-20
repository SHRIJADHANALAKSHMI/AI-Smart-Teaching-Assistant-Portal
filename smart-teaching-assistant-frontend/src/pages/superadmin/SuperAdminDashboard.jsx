import React, { useState, useEffect } from "react";
import {
  FaUniversity,
  FaUserTie,
  FaUser,
  FaRobot,
  FaBars,
  FaPlus,
  FaCog,
  FaChartLine,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getDashboardStats, getColleges } from "../../service/superAdminService";
import { useToast } from "../../context/ToastContext";

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [statsData, setStatsData] = useState({
    totalColleges: 0,
    totalProfessors: 0,
    totalAdmins: 0
  });

  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await getDashboardStats();
        setStatsData(statsRes);

        const collegesRes = await getColleges();
        setColleges(collegesRes.slice(0, 5)); // show latest 5
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
        addToast("Error fetching dashboard data", "error");
      }
    };
    fetchData();
  }, [addToast]);

  const stats = [
    {
      title: "Total Colleges",
      value: statsData.totalColleges || 0,
      icon: <FaUniversity size={30} />,
      color: "bg-blue-500",
    },
    {
      title: "Total College Admins",
      value: statsData.totalAdmins || 0,
      icon: <FaUserTie size={30} />,
      color: "bg-green-500",
    },
    {
      title: "Total Professors",
      value: statsData.totalProfessors || 0,
      icon: <FaUser size={30} />,
      color: "bg-red-500",
    },
    {
      title: "AI Requests Today",
      value: 1511, // Still dummy as there's no ai metrics API fully built yet
      icon: <FaRobot size={30} />,
      color: "bg-yellow-500",
    },
  ];

  const invitations = [
    {
      email: "admin@cit.edu",
      status: "Pending",
    },
    {
      email: "admin@kgisl.edu",
      status: "Accepted",
    },
  ];

  const activities = [
    "AI request received",
    "New college admin registered",
    "AI request completed",
    "10 new professors added",
    "120 AI summaries generated",
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} text-white p-5 rounded-lg shadow-sm transform hover:-translate-y-1 transition`}
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/20 rounded-lg">
                {stat.icon}
              </div>

              <div>
                <h3 className="font-semibold text-sm opacity-90">{stat.title}</h3>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button onClick={() => navigate("/superadmin/colleges")} className="flex flex-col items-center justify-center py-6 px-4 bg-blue-50 text-blue-700 font-semibold rounded-xl border border-blue-100 shadow-sm hover:shadow-md hover:bg-blue-100 transition group">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <FaPlus size={20} />
            </div>
            Add College
          </button>

          <button onClick={() => navigate("/superadmin/invite-college")} className="flex flex-col items-center justify-center py-6 px-4 bg-green-50 text-green-700 font-semibold rounded-xl border border-green-100 shadow-sm hover:shadow-md hover:bg-green-100 transition group">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <FaCog size={20} />
            </div>
            Invite College Admin
          </button>

          <button onClick={() => navigate("/superadmin/ai-monitoring")} className="flex flex-col items-center justify-center py-6 px-4 bg-yellow-50 text-yellow-700 font-semibold rounded-xl border border-yellow-100 shadow-sm hover:shadow-md hover:bg-yellow-100 transition group">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <FaRobot size={20} />
            </div>
            View AI Requests
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
            Registered Colleges Overview
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">College</th>
                <th className="px-6 py-4 text-left">Location</th>
                <th className="px-6 py-4 text-left">Admin</th>
                <th className="px-6 py-4 text-left">Faculty</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {colleges.map((college) => {
                const adminName = college.adminName || college.admin || "Unknown Admin";
                const statusStr = college.status?.toString().toUpperCase() || "PENDING";

                return (
                  <tr key={college.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">{college.name}</td>
                    <td className="px-6 py-4 text-gray-600">{college.location || "N/A"}</td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-bold">
                          {adminName.charAt(0).toUpperCase()}
                        </div>
                        {adminName}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{college.totalProfessors || 0}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusStr === "ACTIVE"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-amber-100 text-amber-800 border border-amber-200"
                          }`}
                      >
                        {statusStr === "ACTIVE" && <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>}
                        {statusStr === "PENDING" && <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>}
                        {statusStr === "REJECTED" && <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></span>}
                        {statusStr}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 pb-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
              Admin Invitations
            </h2>
          </div>

          <div className="p-6">
            <ul className="space-y-4">
              {invitations.map((invite, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100"
                >
                  <span className="font-medium text-gray-700">{invite.email}</span>
                  <span
                    className={`font-semibold text-sm px-3 py-1 rounded-full ${invite.status === "Accepted"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                      }`}
                  >
                    {invite.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-teal-500 rounded-full"></span>
              Recent System Events
            </h2>
          </div>
          <div className="p-6">
            <ul className="relative border-l-2 border-gray-200 ml-4 space-y-6">
              {activities.map((activity, index) => (
                <li key={index} className="pl-6 relative">
                  <span className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-2 border-teal-500 rounded-full"></span>
                  <p className="font-medium text-gray-700 leading-snug">{activity}</p>
                  <span className="text-xs text-gray-400 mt-1 block">Just now</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}