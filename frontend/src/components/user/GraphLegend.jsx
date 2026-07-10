function GraphLegend() {
  return (
    <div className="flex flex-wrap gap-8 mb-8">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
        <span className="text-slate-300">Published</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-orange-400"></div>
        <span className="text-slate-300">Drafts</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-green-400"></div>
        <span className="text-slate-300">Comments</span>
      </div>
    </div>
  );
}

export default GraphLegend;
