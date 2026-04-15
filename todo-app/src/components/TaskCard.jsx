import { useState } from "react"

function TaskCard({ task, onComplete, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(task.text)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = draft.trim()
    if (!trimmed) {
      setDraft(task.text)
      setIsEditing(false)
      return
    }
    if (trimmed !== task.text) {
      onEdit(task.id, trimmed)
    }
    setIsEditing(false)
  }

  return (
    <div
      className={[
        "group flex items-center justify-between gap-3 px-4 py-3 rounded-xl border bg-slate-950/70 shadow-sm transition-all duration-150",
        task.status === "completed"
          ? "border-emerald-500/40 bg-emerald-950/30"
          : "border-slate-800 hover:border-slate-600 hover:bg-slate-900",
      ].join(" ")}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <button
          type="button"
          onClick={() => onComplete(task.id)}
          className={[
            "mt-1 h-5 w-5 rounded-full border flex items-center justify-center transition-colors duration-150",
            task.status === "completed"
              ? "border-emerald-400 bg-emerald-500/20"
              : "border-slate-500 hover:border-emerald-400 hover:bg-emerald-500/10",
          ].join(" ")}
        >
          {task.status === "completed" && (
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <input
                autoFocus
                className="w-full bg-slate-950/70 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={handleSubmit}
              />
            </form>
          ) : (
            <p
              className={[
                "text-sm leading-snug truncate",
                task.status === "completed"
                  ? "text-slate-400 line-through"
                  : "text-slate-100",
              ].join(" ")}
              title={task.text}
            >
              {task.text}
            </p>
          )}

          <p className="text-[10px] text-slate-500 mt-1">
            Created at {new Date(task.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="text-xs px-2 py-1 rounded-lg border border-slate-600 text-slate-200 hover:border-indigo-400 hover:text-indigo-300 hover:bg-slate-900 transition-colors duration-150"
        >
          Edit
        </button>
        <button
          type="button"
          data-testid={`delete-${task.id}`}
          onClick={() => onDelete(task.id)}
          className="text-xs px-2 py-1 rounded-lg border border-red-500/60 text-red-300 hover:bg-red-500/15 hover:border-red-400 transition-colors duration-150"
        >
          Delete
      </button>
      </div>
    </div>
  )
}

export default TaskCard