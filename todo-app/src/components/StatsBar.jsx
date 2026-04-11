    function StatsBar({ total, pending, completed, onClearAll }) {
  if (total === 0) return null

  return (
    <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
      <p>
        <span className="font-medium text-slate-100">{total}</span> tasks •{" "}
        <span className="text-emerald-400">{completed} done</span> •{" "}
        <span className="text-amber-300">{pending} pending</span>
      </p>
      <button
        type="button"
        onClick={onClearAll}
        className="text-[11px] px-2 py-1 rounded-lg border border-slate-700 hover:border-red-500/70 hover:text-red-300 hover:bg-red-500/5 transition"
      >
        Clear all
      </button>
    </div>
  )
}

export default StatsBar