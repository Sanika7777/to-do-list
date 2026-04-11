import { useState } from "react"

function TaskInput({ onAdd }) {
  const [text, setText] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 mb-6"
    >
      <input
        type="text"
        className="flex-1 rounded-xl bg-slate-950/60 border border-slate-700 px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm focus:shadow-lg"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="px-5 py-3 rounded-xl bg-indigo-500 text-sm font-medium shadow-md hover:bg-indigo-400 active:bg-indigo-600 transition-colors transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0"
      >
        Add
      </button>
    </form>
  )
}

export default TaskInput