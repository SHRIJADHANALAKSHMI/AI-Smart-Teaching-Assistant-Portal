import { motion } from "framer-motion";
import CountUp from "react-countup";

import {
  Users,
  GraduationCap,
  Building2,
  BookOpen,
  BrainCircuit,
  Database,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    title: "Students",
    value: 3842,
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    growth: "+12%",
  },
  {
    title: "Professors",
    value: 148,
    icon: GraduationCap,
    color: "from-violet-500 to-fuchsia-500",
    growth: "+8%",
  },
  {
    title: "Departments",
    value: 12,
    icon: Building2,
    color: "from-green-500 to-emerald-500",
    growth: "+2",
  },
  {
    title: "Subjects",
    value: 64,
    icon: BookOpen,
    color: "from-orange-500 to-red-500",
    growth: "+15%",
  },
  {
    title: "AI Requests",
    value: 18520,
    icon: BrainCircuit,
    color: "from-indigo-500 to-blue-500",
    growth: "+25%",
  },
  {
    title: "Storage Used",
    value: 78,
    suffix: "%",
    icon: Database,
    color: "from-pink-500 to-rose-500",
    growth: "+6%",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
            }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            className={`bg-gradient-to-r ${item.color} rounded-3xl p-6 text-white shadow-xl`}
          >
            <div className="flex justify-between items-center">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <Icon size={28} />
              </div>

              <ArrowUpRight />
            </div>

            <p className="mt-6 text-white/80">
              {item.title}
            </p>

            <h2 className="text-4xl font-bold mt-2">
              <CountUp
                end={item.value}
                duration={2}
              />
              {item.suffix}
            </h2>

            <div className="mt-5 flex justify-between items-center">

              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                {item.growth}
              </span>

              <span className="text-sm">
                This Month
              </span>

            </div>
          </motion.div>
        );
      })}
    </div>
  );
}