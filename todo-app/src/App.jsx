import { useState, useEffect } from "react"
import TaskInput from "./components/TaskInput"
import FilterBar from "./components/FilterBar"
import TaskList from "./components/TaskList"
import StatsBar from "./components/StatsBar"
import {
  getTasks,
  getPendingTasks,
  getCompletedTasks,
  resetTaskState,
  fetchTasksFromApi,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
  completeTaskApi,
  clearAllApi,
} from "./utils/taskManager"

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    resetTaskState()
    fetchTasksFromApi()
      .then((data) => setTasks(data))
      .catch((err) => console.error(err.message))
      .finally(() => setIsLoading(false))
  }, [])

  const handleAdd = async (text) => {
    try {
      const created = await createTaskApi(text)
      setTasks(prev => [...prev, created])
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTaskApi(id)
      setTasks(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleComplete = async (id) => {
    try {
      const updated = await completeTaskApi(id)
      setTasks(prev =>
        prev.map(t => (t.id === updated.id ? updated : t))
      )
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleEdit = async (id, newText) => {
    try {
      const updated = await updateTaskApi(id, newText)
      setTasks(prev =>
        prev.map(t => (t.id === updated.id ? updated : t))
      )
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleClearAll = async () => {
    try {
      await clearAllApi()
      setTasks([])
      resetTaskState()
    } catch (err) {
      console.error(err.message)
    }
  }

  const allTasks = getTasks(tasks)
  const pendingTasks = getPendingTasks(tasks)
  const completedTasks = getCompletedTasks(tasks)

  let visibleTasks = allTasks
  if (filter === "pending") visibleTasks = pendingTasks
  if (filter === "completed") visibleTasks = completedTasks

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
      {/* background accents */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-6xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-indigo-300/70">
              Task Workspace
            </p>
            <h1 className="mt-1 text-3xl md:text-4xl font-semibold tracking-tight">
              To-Do Control Center
            </h1>
            <p className="mt-1 text-sm text-slate-400 max-w-md">
              Plan your day, track your progress, and keep pending items in one
              clean board.
            </p>
          </div>

          <div className="hidden md:flex flex-col items-end text-xs text-slate-400">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/70 border border-slate-700/70">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Live workspace
            </span>
            <span className="mt-2 text-[11px] text-slate-500">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* main board fills much more space */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8 items-stretch">
          <main className="relative bg-slate-900/70 border border-slate-800 rounded-2xl p-6 md:p-7 shadow-2xl backdrop-blur-lg transition-transform transition-colors duration-300 hover:border-slate-600 hover:bg-slate-900/90 hover:-translate-y-1">
            <div className="absolute inset-x-10 -top-10 h-20 bg-gradient-to-b from-indigo-500/25 via-transparent to-transparent blur-3xl pointer-events-none" />

            <TaskInput onAdd={handleAdd} />

            <FilterBar
              active={filter}
              onChange={setFilter}
              counts={{
                total: allTasks.length,
                pending: pendingTasks.length,
                completed: completedTasks.length,
              }}
            />

            {isLoading ? (
              <div className="flex items-center justify-center py-16 text-sm text-slate-400">
                <div className="h-4 w-4 mr-3 rounded-full border-2 border-slate-500 border-t-transparent animate-spin" />
                Loading your tasks...
              </div>
            ) : (
              <TaskList
                tasks={visibleTasks}
                onComplete={handleComplete}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            )}

            <StatsBar
              total={allTasks.length}
              pending={pendingTasks.length}
              completed={completedTasks.length}
              onClearAll={handleClearAll}
            />
          </main>

          {/* side panel for stats / preview */}
          <aside className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-lg flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-medium text-slate-100">
                Today&apos;s snapshot
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Quick overview of how your tasks are distributed.
              </p>

              <div className="mt-5 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-400" />
                    Total tasks
                  </span>
                  <span className="text-slate-100">{allTasks.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Completed
                  </span>
                  <span className="text-emerald-300">
                    {completedTasks.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    Pending
                  </span>
                  <span className="text-amber-300">
                    {pendingTasks.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500">
              Pro tip: Keep your pending tasks under{" "}
              <span className="text-emerald-300 font-medium">5</span> for a
              lighter day.
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default App