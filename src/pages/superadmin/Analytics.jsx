import {
  FaUniversity,
  FaBuilding,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaBook,
  FaFileUpload,
  FaRobot,
  FaClipboardList,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Colleges",
    value: "25",
    icon: <FaUniversity size={28} />,
    color: "bg-blue-500",
  },
  {
    title: "Departments",
    value: "84",
    icon: <FaBuilding size={28} />,
    color: "bg-purple-500",
  },
  {
    title: "Professors",
    value: "312",
    icon: <FaChalkboardTeacher size={28} />,
    color: "bg-green-500",
  },
  {
    title: "Students",
    value: "12,540",
    icon: <FaUserGraduate size={28} />,
    color: "bg-orange-500",
  },
  {
    title: "Subjects",
    value: "265",
    icon: <FaBook size={28} />,
    color: "bg-pink-500",
  },
  {
    title: "Materials Uploaded",
    value: "1,285",
    icon: <FaFileUpload size={28} />,
    color: "bg-indigo-500",
  },
  {
    title: "AI Summaries",
    value: "4,120",
    icon: <FaRobot size={28} />,
    color: "bg-red-500",
  },
  {
    title: "Assessments",
    value: "845",
    icon: <FaClipboardList size={28} />,
    color: "bg-cyan-500",
  },
];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Platform Analytics
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5"
          >
            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>

                <h2 className="text-3xl font-bold mt-2">
                  {item.value}
                </h2>
              </div>

              <div
                className={`${item.color} text-white p-4 rounded-xl`}
              >
                {item.icon}
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Recent Activity */}
      <div className="mt-10 bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-xl font-semibold mb-5">
          Recent Activity
        </h2>

        <div className="space-y-4">

          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-medium">
              New College Registered
            </p>
            <span className="text-sm text-gray-500">
              ABC Engineering College • 10 mins ago
            </span>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <p className="font-medium">
              AI generated 45 summaries
            </p>
            <span className="text-sm text-gray-500">
              Today
            </span>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <p className="font-medium">
              Professor uploaded Operating Systems syllabus
            </p>
            <span className="text-sm text-gray-500">
              1 hour ago
            </span>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <p className="font-medium">
              28 assessments generated
            </p>
            <span className="text-sm text-gray-500">
              Today
            </span>
          </div>

        </div>

      </div>

      {/* Platform Overview */}
      <div className="mt-10 grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-xl font-semibold mb-4">
            AI Usage
          </h2>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span>Notes Generated</span>
              <span className="font-bold">1,420</span>
            </div>

            <div className="flex justify-between">
              <span>Quizzes Generated</span>
              <span className="font-bold">860</span>
            </div>

            <div className="flex justify-between">
              <span>Learning Roadmaps</span>
              <span className="font-bold">375</span>
            </div>

            <div className="flex justify-between">
              <span>Career Mappings</span>
              <span className="font-bold">490</span>
            </div>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-xl font-semibold mb-4">
            System Status
          </h2>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span>Server Status</span>
              <span className="text-green-600 font-semibold">
                Online
              </span>
            </div>

            <div className="flex justify-between">
              <span>Database</span>
              <span className="text-green-600 font-semibold">
                Connected
              </span>
            </div>

            <div className="flex justify-between">
              <span>AI Engine</span>
              <span className="text-green-600 font-semibold">
                Active
              </span>
            </div>

            <div className="flex justify-between">
              <span>Storage</span>
              <span className="text-green-600 font-semibold">
                Healthy
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}