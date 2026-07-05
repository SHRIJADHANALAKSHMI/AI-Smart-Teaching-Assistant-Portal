import { motion } from "framer-motion";
import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "No Data Found",
  description = "There is nothing to display right now.",
  buttonText,
  onClick,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl shadow-lg p-12 flex flex-col items-center text-center"
    >
      <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">
        <Inbox size={48} className="text-indigo-600" />
      </div>

      <h2 className="text-2xl font-bold mt-6">
        {title}
      </h2>

      <p className="text-gray-500 mt-3 max-w-md">
        {description}
      </p>

      {buttonText && (
        <button
          onClick={onClick}
          className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
        >
          {buttonText}
        </button>
      )}
    </motion.div>
  );
}