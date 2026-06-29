import {
  FaFileAlt,
  FaDownload,
  FaUniversity,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaRobot,
  FaClipboardList,
  FaCalendarAlt,
} from "react-icons/fa";

const reports = [
  {
    id: 1,
    title: "College Registration Report",
    description: "View all registered colleges and their status.",
    icon: <FaUniversity className="text-blue-600 text-3xl" />,
  },
  {
    id: 2,
    title: "Professor Activity Report",
    description: "Track faculty uploads, assessments, and AI usage.",
    icon: <FaChalkboardTeacher className="text-green-600 text-3xl" />,
  },
  {
    id: 3,
    title: "Student Progress Report",
    description: "Monitor student learning progress and assessments.",
    icon: <FaUserGraduate className="text-purple-600 text-3xl" />,
  },
  {
    id: 4,
    title: "AI Usage Report",
    description: "View AI requests, summaries, quizzes, and chatbot usage.",
    icon: <FaRobot className="text-red-600 text-3xl" />,
  },
  {
    id: 5,
    title: "Assessment Report",
    description: "Download assessment statistics and performance reports.",
    icon: <FaClipboardList className="text-orange-600 text-3xl" />,
  },
];

export default function Reports() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Reports
          </h1>

          <p className="text-gray-500">
            Generate and download platform reports.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <FaCalendarAlt />
          Select Date Range
        </button>

      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Total Reports</h3>
          <h2 className="text-3xl font-bold mt-2">25</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Generated Today</h3>
          <h2 className="text-3xl font-bold mt-2">8</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Downloads</h3>
          <h2 className="text-3xl font-bold mt-2">156</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Pending Reports</h3>
          <h2 className="text-3xl font-bold mt-2">2</h2>
        </div>

      </div>

      {/* Report Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {reports.map((report) => (

          <div
            key={report.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
          >

            <div className="mb-4">
              {report.icon}
            </div>

            <h2 className="text-xl font-semibold mb-2">
              {report.title}
            </h2>

            <p className="text-gray-500 mb-5">
              {report.description}
            </p>

            <div className="flex gap-3">

              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center gap-2">
                <FaFileAlt />
                View
              </button>

              <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex justify-center items-center gap-2">
                <FaDownload />
                Download
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}