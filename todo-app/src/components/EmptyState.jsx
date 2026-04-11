function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
      <div className="mb-4 h-16 w-16 rounded-2xl border border-dashed border-slate-700 flex items-center justify-center bg-slate-950/60">
        <span className="text-3xl">📝</span>
      </div>
      <h2 className="text-sm font-medium text-slate-100">
        No tasks yet
      </h2>
      <p className="text-xs text-slate-500 mt-1 max-w-xs">
        Add your first task to get started. You can mark tasks as completed,
        edit them, and keep your day organized.
      </p>
    </div>
  )
}

export default EmptyState