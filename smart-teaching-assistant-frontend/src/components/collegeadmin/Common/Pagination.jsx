import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">

      <p className="text-gray-500 text-sm">
        Showing Page{" "}
        <span className="font-semibold">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold">
          {totalPages}
        </span>
      </p>

      <div className="flex items-center gap-2">

        <button
          onClick={() =>
            currentPage > 1 &&
            onPageChange(currentPage - 1)
          }
          disabled={currentPage === 1}
          className="p-2 rounded-xl border hover:bg-gray-100 disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-xl font-medium transition ${
              page === currentPage
                ? "bg-indigo-600 text-white"
                : "bg-white border hover:bg-indigo-50"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() =>
            currentPage < totalPages &&
            onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className="p-2 rounded-xl border hover:bg-gray-100 disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  );
}