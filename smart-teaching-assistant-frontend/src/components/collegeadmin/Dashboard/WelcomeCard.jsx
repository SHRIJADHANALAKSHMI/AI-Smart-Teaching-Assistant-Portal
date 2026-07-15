import { motion } from "framer-motion";
import {
  BrainCircuit,
  CalendarDays,
  Sparkles,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";

export default function WelcomeCard() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-[24px] bg-gradient-to-tr from-emerald-800 via-teal-700 to-emerald-600 text-white shadow-[0_8px_30px_rgba(16,185,129,0.25)]"
    >
      {/* Background Blur */}

      <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 p-8">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

          {/* Left */}

          <div>

            <span className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm">

              <Sparkles size={16} />

              AI Smart Teaching Assistant

            </span>

            <h1 className="text-4xl lg:text-5xl font-bold mt-5">

              {greeting}, College Admin 👋

            </h1>

            <p className="mt-4 text-blue-100 text-lg">

              Welcome back! Here's a quick overview of your college today.

            </p>

            <div className="flex items-center gap-3 mt-6">

              <CalendarDays size={20} />

              <span>{today}</span>

            </div>

          </div>

          {/* Right */}

          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">

            <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-5 min-w-[180px]">

              <div className="flex justify-between">

                <BrainCircuit />

                <ArrowUpRight />

              </div>

              <p className="text-sm mt-4 text-emerald-50">

                AI Accuracy

              </p>

              <h2 className="text-3xl font-bold mt-2">

                97%

              </h2>

            </div>

            <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-5 min-w-[180px]">

              <div className="flex justify-between">

                <GraduationCap />

                <ArrowUpRight />

              </div>

              <p className="text-sm mt-4 text-emerald-50">

                Active Professors

              </p>

              <h2 className="text-3xl font-bold mt-2">

                148

              </h2>

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
}