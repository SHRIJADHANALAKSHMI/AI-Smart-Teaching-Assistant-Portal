import React from "react";
import {FaUniversity,FaUserTie,FaUser,FaRobot,FaBars,FaPlus,
  FaCog, FaChartLine,
} from "react-icons/fa";

export default function SuperAdminDashboard() {
  const stats = [
    {
      title: "Total Colleges",
      value: 120,
      icon: <FaUniversity size={30} />,
      color: "bg-blue-500",
    },
    {
      title: "Total College Admins",
      value: 50,
      icon: <FaUserTie size={30} />,
      color: "bg-green-500",
    },
    {
      title: "Total Professors",
      value: 200,
      icon: <FaUser size={30} />,
      color: "bg-red-500",
    },
    {
      title: "AI Requests Today",
      value: 1511,
      icon: <FaRobot size={30} />,
      color: "bg-yellow-500",
    },
  ];

  const colleges = [
    {
      id: 1,
      name: "PSG College of Technology (PSGCT)",
      location: "Coimbatore, Tamil Nadu",
      admin: "Shri",
      totalProfessors: 50,
      status: "Active",
    },
    {
      id: 2,
      name: "KGISL Institute of Technology",
      location: "Coimbatore, Tamil Nadu",
      admin: "Janaki",
      totalProfessors: 60,
      status: "Active",
    },
    {
      id: 3,
      name: "Kumaraguru College of Technology",
      location: "Coimbatore, Tamil Nadu",
      admin: "Karthik",
      totalProfessors: 45,
      status: "Active",
    },
    {
      id: 4,
      name: "Coimbatore Institute of Technology",
      location: "Coimbatore, Tamil Nadu",
      admin: "Sathish",
      totalProfessors: 70,
      status: "Pending",
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
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-blue-900 text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-6">STA Portal</h2>

        <ul className="space-y-3">
          <li className="flex items-center gap-2 p-2 rounded hover:bg-blue-700 cursor-pointer">
            <FaBars />
            Dashboard
          </li>

          <li className="flex items-center gap-2 p-2 rounded hover:bg-blue-700 cursor-pointer">
            <FaPlus />
            Add College
          </li>

          <li className="flex items-center gap-2 p-2 rounded hover:bg-blue-700 cursor-pointer">
            <FaChartLine />
            Analytics
          </li>

          <li className="flex items-center gap-2 p-2 rounded hover:bg-blue-700 cursor-pointer">
            <FaRobot />
            AI Monitoring
          </li>

          <li className="flex items-center gap-2 p-2 rounded hover:bg-blue-700 cursor-pointer">
            <FaCog />
            Settings
          </li>

          <li className="flex items-center gap-2 p-2 rounded hover:bg-blue-700 cursor-pointer">
            <FaUserTie />
            Logout
          </li>
        </ul>
      </aside>

      <div className="flex-1">
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <FaBars className="text-gray-700 md:hidden" size={24} />
            <h1 className="text-2xl font-bold text-gray-800">
              Super Admin Dashboard
            </h1>
          </div>

          <div className="font-medium text-gray-700">
            Welcome, Super Admin !!
          </div>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.color} text-white p-5 rounded-lg shadow`}
              >
                <div className="flex items-center gap-4">
                  {stat.icon}

                  <div>
                    <h3 className="font-semibold">{stat.title}</h3>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600 transition">
                Add College
              </button>

              <button className="bg-green-500 text-white p-4 rounded-lg shadow hover:bg-green-600 transition">
                Invite College Admin
              </button>

              <button className="bg-yellow-500 text-white p-4 rounded-lg shadow hover:bg-yellow-600 transition">
                View AI Requests
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Registered Colleges
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 text-left">College</th>
                    <th className="p-3 text-left">Location</th>
                    <th className="p-3 text-left">Admin</th>
                    <th className="p-3 text-left">Professors</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {colleges.map((college) => (
                    <tr key={college.id} className="border-t">
                      <td className="p-3">{college.name}</td>
                      <td className="p-3">{college.location}</td>
                      <td className="p-3">{college.admin}</td>
                      <td className="p-3">{college.totalProfessors}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            college.status === "Active"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        >
                          {college.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
                    
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                Admin Invitations
              </h2>

              <ul className="space-y-3">
                {invitations.map((invite, index) => (
                  <li
                    key={index}
                    className="flex justify-between border-b pb-2"
                  >
                    <span>{invite.email}</span>
                    <span
                      className={`font-semibold ${
                        invite.status === "Accepted"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {invite.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                Recent Activities
              </h2>

              <ul className="list-disc pl-5 space-y-2">
                {activities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}