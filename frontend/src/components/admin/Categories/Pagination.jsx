import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ page, setPage, pagination }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        <button
          disabled={!pagination.hasPrevPage}
          onClick={() => setPage(page - 1)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
            pagination.hasPrevPage
              ? "hover:bg-gray-100"
              : "opacity-50 cursor-not-allowed"
          }`}
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        <div className="text-sm font-medium text-gray-600">
          Page {pagination.currentPage || 1} of {pagination.totalPages || 1}
        </div>

        <button
          disabled={!pagination.hasNextPage}
          onClick={() => setPage(page + 1)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
            pagination.hasNextPage
              ? "hover:bg-gray-100"
              : "opacity-50 cursor-not-allowed"
          }`}
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
