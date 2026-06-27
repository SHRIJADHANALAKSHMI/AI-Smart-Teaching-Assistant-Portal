import {
  FaRobot,
  FaBrain,
  FaFilePdf,
  FaBookOpen,
  FaClipboardCheck,
  FaChartLine,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

const cards = [
  {
    title: "AI Requests Today",
    value: "2,845",
    icon: <FaRobot />,
    color: "bg-blue-500",
  },
  {
    title: "Materials Processed",
    value: "1,128",
    icon: <FaFilePdf />,
    color: "bg-green-500",
  },
  {
    title: "Summaries Generated",
    value: "894",
    icon: <FaBookOpen />,
    color: "bg-purple-500",
  },
  {
    title: "Assessments Generated",
    value: "536",
    icon: <FaClipboardCheck />,
    color: "bg-orange-500",
  },
];

const recentActivities = [
  {
    professor: "Dr. Priya",
    subject: "Data Structures",
    action: "Generated AI Summary",
    time: "5 mins ago",
  },
  {
    professor: "Dr. Arun",
    subject: "Operating Systems",
    action: "Generated Quiz",
    time: "20 mins ago",
  },
  {
    professor: "Dr. John",
    subject: "DBMS",
    action: "Uploaded Material",
    time: "45 mins ago",
  },
  {
    professor: "Dr. Meena",
    subject: "Java Programming",
    action: "Created Learning Roadmap",
    time: "1 hour ago",
  },
];

const aiInsights = [
  "Students struggle most with Database Normalization.",
  "Machine Learning materials are generating the highest AI usage.",
  "Java Programming has the highest chatbot interaction.",
  "Operating Systems quizzes have an 82% average score.",
];

export default function AIMonitoring() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          AI Monitoring Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Monitor AI usage, generated content, and educational insights.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">{card.title}</p>
                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>
              </div>

              <div
                className={`${card.color} text-white p-4 rounded-xl text-2xl`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Health */}
      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
            <FaBrain />
            AI Engine Status
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>AI Engine</span>
              <span className="text-green-600 font-semibold">
                Active
              </span>
            </div>

            <div className="flex justify-between">
              <span>Average Response Time</span>
              <span>1.3 sec</span>
            </div>

            <div className="flex justify-between">
              <span>Today's Requests</span>
              <span>2845</span>
            </div>

            <div className="flex justify-between">
              <span>Failed Requests</span>
              <span className="text-red-500">4</span>
            </div>

            <div className="flex justify-between">
              <span>Success Rate</span>
              <span className="text-green-600 font-semibold">
                99.8%
              </span>
            </div>

          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-xl font-semibold mb-5">
            AI Insights
          </h2>

          <div className="space-y-4">

            {aiInsights.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 bg-blue-50 p-3 rounded-lg"
              >
                <FaChartLine className="text-blue-600 mt-1" />
                <p>{item}</p>
              </div>
            ))}

          </div>

        </div>

      </div>

      {/* Recent AI Activities */}
      <div className="bg-white rounded-2xl shadow-md mt-8 p-6">

        <h2 className="text-xl font-semibold mb-5">
          Recent AI Activities
        </h2>

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-3">Professor</th>
              <th className="text-left p-3">Subject</th>
              <th className="text-left p-3">Activity</th>
              <th className="text-left p-3">Time</th>
            </tr>

          </thead>

          <tbody>

            {recentActivities.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">{item.professor}</td>
                <td className="p-3">{item.subject}</td>
                <td className="p-3">{item.action}</td>
                <td className="p-3">{item.time}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Alerts */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div className="bg-red-50 border border-red-200 rounded-xl p-5">

          <h2 className="flex items-center gap-2 text-red-700 font-semibold mb-3">
            <FaExclamationTriangle />
            Alerts
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            <li>4 AI requests failed today.</li>
            <li>Two uploaded PDFs could not be processed.</li>
            <li>High AI usage detected in DBMS module.</li>
          </ul>

        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-5">

          <h2 className="flex items-center gap-2 text-green-700 font-semibold mb-3">
            <FaCheckCircle />
            Recommendations
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            <li>Generate quizzes for pending subjects.</li>
            <li>Upload missing Unit 5 materials.</li>
            <li>Encourage faculty to use AI roadmap generation.</li>
          </ul>

        </div>

      </div>

    </div>
  );
}