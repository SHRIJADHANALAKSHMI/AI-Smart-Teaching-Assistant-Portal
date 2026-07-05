import { useState } from "react";
import { Search, X, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchBar({
  placeholder = "Search...",
  onSearch,
  showFilter = false,
  filterComponent = null,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");

    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-6"
    >
      {/* Search Box */}

      <div className="relative w-full lg:w-[420px]">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-gray-300 bg-white py-3 pl-12 pr-12 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
        />

        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <X
              size={18}
              className="text-gray-400 hover:text-red-500"
            />
          </button>
        )}

      </div>

      {/* Optional Filter */}

      {showFilter && (
        <div className="flex items-center gap-3">

          <button className="flex items-center gap-2 rounded-xl border bg-white px-4 py-3 shadow hover:bg-gray-100 transition">

            <Filter size={18} />

            Filter

          </button>

          {filterComponent}

        </div>
      )}
    </motion.div>
  );
}