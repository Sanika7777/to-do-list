const FILTERS = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "completed", label: "Completed" },
]

function FilterBar({ active, counts, onChange }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="inline-flex gap-2 rounded-full bg-slate-900/80 p-1 border border-slate-700">
        {FILTERS.map(filter => {
          const isActive = active === filter.id
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onChange(filter.id)}
              className={[
                "px-4 py-1.5 text-xs font-medium rounded-full transition",
                isActive
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-300 hover:bg-slate-800/80",
              ].join(" ")}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-3 text-xs text-slate-400">
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-indigo-400" />
          {counts.total} total
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          {counts.completed} done
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          {counts.pending} pending
        </span>
      </div>
    </div>
  )
}

export default FilterBar