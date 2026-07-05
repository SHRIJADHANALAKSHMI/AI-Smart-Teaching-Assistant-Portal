import { motion } from "framer-motion";
import {
  Building2,
  UserPlus,
  UploadCloud,
  FileBarChart2,
  BrainCircuit,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Add Department",
    description: "Create a new department",
    icon: Building2,
    color: "from-blue-500 to-cyan-500",
    path: "/collegeadmin/departments",
  },
  {
    title: "Invite Professor",
    description: "Send invitation email",
    icon: UserPlus,
    color: "from-purple-500 to-pink-500",
    path: "/collegeadmin/professors",
  },
  {
    title: "Upload Materials",
    description: "Upload study resources",
    icon: UploadCloud,
    color: "from-green-500 to-emerald-500",
    path: "/collegeadmin/materials",
  },
  {
    title: "Generate Report",
    description: "Download analytics report",
    icon: FileBarChart2,
    color: "from-orange-500 to-red-500",
    path: "/collegeadmin/reports",
  },
  {
    title: "AI Insights",
    description: "View AI recommendations",
    icon: BrainCircuit,
    color: "from-indigo-500 to-blue-500",
    path: "/collegeadmin/dashboard",
  },
  {
    title: "Academic Calendar",
    description: "Manage events & schedule",
    icon: CalendarDays,
    color: "from-pink-500 to-rose-500",
    path: "/collegeadmin/calendar",
  },
];
export default function QuickActions() {
    const navigate = useNavigate();
  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Quick Actions
          </h2>

          <p className="text-gray-500">
            Frequently used shortcuts
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {actions.map((action, index) => {

          const Icon = action.icon;

          return (

            <motion.div
  onClick={() => navigate(action.path)}
              key={action.title}
              whileHover={{
                scale: 1.04,
                y: -5,
              }}
              transition={{
                duration: 0.25,
              }}
              className="group cursor-pointer bg-white rounded-3xl shadow-lg p-6 border hover:border-indigo-500"
            >

              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${action.color} flex items-center justify-center text-white shadow-lg`}
              >

                <Icon size={30} />

              </div>

              <h3 className="text-xl font-bold mt-5">

                {action.title}

              </h3>

              <p className="text-gray-500 mt-2">

                {action.description}

              </p>

              <button
                className="mt-6 flex items-center gap-2 text-indigo-600 font-semibold group-hover:gap-3 transition-all"
              >

                Open

                <ArrowRight size={18} />

              </button>

            </motion.div>

          );

        })}

      </div>

    </div>
  );
}
