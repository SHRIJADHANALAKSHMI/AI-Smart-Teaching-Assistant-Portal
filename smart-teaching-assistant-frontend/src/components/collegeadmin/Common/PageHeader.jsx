import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";

export default function PageHeader({
  title,
  subtitle,
  breadcrumb = [],
  actionButton,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      {/* Breadcrumb */}

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">

        <Home size={16} />

        {breadcrumb.map((item, index) => (
          <div key={index} className="flex items-center gap-2">

            <ChevronRight size={14} />

            <span
              className={
                index === breadcrumb.length - 1
                  ? "font-semibold text-indigo-600"
                  : ""
              }
            >
              {item}
            </span>

          </div>
        ))}

      </div>

      {/* Title */}

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">

            {title}

          </h1>

          <p className="text-gray-500 mt-2">

            {subtitle}

          </p>

        </div>

        {actionButton && (

          <div className="mt-5 lg:mt-0">

            {actionButton}

          </div>

        )}

      </div>

    </motion.div>
  );
}