import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUniversity,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaRobot,
  FaChartLine,
  FaEnvelope,
  FaUsers,
  FaFileAlt,
  FaBars,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function SuperAdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Colleges",
      value: 25,
      icon: <FaUniversity size={28} />,
      color: "bg-blue-600",
    },
    {
      title: "College Admins",
      value: 42,
      icon: <FaUsers size={28} />,
      color: "bg-green-600",
    },
    {
      title: "Professors",
      value: 320,
      icon: <FaChalkboardTeacher size={28} />,
      color: "bg-purple-600",
    },
  
  ];

  const colleges = [
    {
      id: 1,
      name: "psg Engineering College",
      location: "Coimbatore",
      admin: "ram",
      professors: 42,
      status: "Active",
    },
    {
      id: 2,
      name: "kgisl Institute",
      location: "Chennai",
      admin: "Priya Sharma",
      professors: 38,
      status: "Active",
    },
    {
      id: 3,
      name: "National College",
      location: "Madurai",
      admin: "Arun Kumar",
      professors: 30,
      status: "Pending",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      <aside className="w-64 bg-blue-900 text-white hidden md:block">

        <div className="p-6">

          <h2 className="text-2xl font-bold mb-8">
            STA Portal
          </h2>

          <ul className="space-y-3">

            <li
              onClick={() => navigate("/superadmin")}
              className="cursor-pointer hover:bg-blue-700 p-3 rounded"
            >
              Dashboard
            </li>

            <li
              onClick={() => navigate("/superadmin/colleges")}
              className="cursor-pointer hover:bg-blue-700 p-3 rounded"
            >
              Colleges
            </li>

            <li
              onClick={() => navigate("/superadmin/analytics")}
              className="cursor-pointer hover:bg-blue-700 p-3 rounded"
            >
              Analytics
            </li>

            <li
              onClick={() => navigate("/superadmin/ai-monitoring")}
              className="cursor-pointer hover:bg-blue-700 p-3 rounded"
            >
              AI Monitoring
            </li>

            <li
              onClick={() => navigate("/superadmin/invite-college")}
              className="cursor-pointer hover:bg-blue-700 p-3 rounded"
            >
              Invite College
            </li>

            <li
              onClick={() => navigate("/superadmin/admin-management")}
              className="cursor-pointer hover:bg-blue-700 p-3 rounded"
            >
              Admin Management
            </li>

            <li
              onClick={() => navigate("/superadmin/reports")}
              className="cursor-pointer hover:bg-blue-700 p-3 rounded"
            >
              Reports
            </li>

            <li className="cursor-pointer hover:bg-blue-700 p-3 rounded flex items-center gap-2">
              <FaCog />
              Settings
            </li>

            <li className="cursor-pointer hover:bg-red-600 p-3 rounded flex items-center gap-2">
              <FaSignOutAlt />
              Logout
            </li>

          </ul>

        </div>

      </aside>

  

      <div className="flex-1">


        <header className="bg-white shadow flex justify-between items-center px-6 py-4">

          <div className="flex items-center gap-4">

            <FaBars className="md:hidden" />

            <h1 className="text-3xl font-bold">
              Super Admin Dashboard
            </h1>

          </div>

          <h3 className="font-semibold">
            Welcome, Super Admin
          </h3>

        </header>

        <main className="p-6">


          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

            {stats.map((item, index) => (

              <div
                key={index}
                className={`${item.color} text-white rounded-xl p-6 shadow-lg`}
              >

                <div className="flex justify-between">

                  <div>

                    <h4>{item.title}</h4>

                    <h2 className="text-3xl font-bold mt-2">
                      {item.value}
                    </h2>

                  </div>

                  {item.icon}

                </div>

              </div>

            ))}

          </div>

    

          <div className="bg-white rounded-xl shadow p-6 mb-8">

            <h2 className="text-xl font-bold mb-5">
              Quick Actions
            </h2>

            <div className="grid md:grid-cols-4 gap-4">

              <button
                onClick={() => navigate("/superadmin/invite-college")}
                className="bg-blue-600 text-white rounded-lg p-4"
              >
                <FaEnvelope className="mx-auto mb-2" />
                Invite College
              </button>

              <button
                onClick={() => navigate("/superadmin/admin-management")}
                className="bg-green-600 text-white rounded-lg p-4"
              >
                <FaUsers className="mx-auto mb-2" />
                Admin Management
              </button>

              <button
                onClick={() => navigate("/superadmin/analytics")}
                className="bg-purple-600 text-white rounded-lg p-4"
              >
                <FaChartLine className="mx-auto mb-2" />
                Analytics
              </button>

              <button
                onClick={() => navigate("/superadmin/reports")}
                className="bg-orange-500 text-white rounded-lg p-4"
              >
                <FaFileAlt className="mx-auto mb-2" />
                Reports
              </button>

            </div>

          </div>


          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">
              Registered Colleges
            </h2>

            <table className="w-full">

              <thead className="bg-gray-200">

                <tr>

                  <th className="p-3 text-left">College</th>

                  <th className="p-3">Location</th>

                  <th className="p-3">Admin</th>

                  <th className="p-3">Professors</th>

                  <th className="p-3">Status</th>

                </tr>

              </thead>

              <tbody>

                {colleges.map((college) => (

                  <tr
                    key={college.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3">{college.name}</td>

                    <td className="text-center">{college.location}</td>

                    <td className="text-center">{college.admin}</td>

                    <td className="text-center">
                      {college.professors}
                    </td>

                    <td className="text-center">

                      <span
                        className={`px-3 py-1 rounded-full text-white ${
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


          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <div className="bg-white rounded-xl shadow p-6">

              <h2 className="font-bold text-xl mb-4">
                AI Monitoring
              </h2>

              <div className="space-y-3">

                <div className="flex justify-between">
                  <span>Total AI Requests</span>
                  <span>1,240</span>
                </div>

                <div className="flex justify-between">
                  <span>Successful</span>
                  <span className="text-green-600">1,198</span>
                </div>

                <div className="flex justify-between">
                  <span>Failed</span>
                  <span className="text-red-600">42</span>
                </div>

              </div>

            </div>

            <div className="bg-white rounded-xl shadow p-6">

              <h2 className="font-bold text-xl mb-4">
                Recent Activities
              </h2>

              <ul className="space-y-3">

                <li>✅ New College Registered</li>

                <li>✅ AI Summary Generated</li>

                <li>✅ Professor Uploaded Material</li>

                <li>✅ New Admin Invitation Sent</li>

              </ul>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}