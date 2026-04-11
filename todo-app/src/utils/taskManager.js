// In-memory task manager (pure functions)
const API_BASE = "http://127.0.0.1:5000"
export async function fetchTasksFromApi() {
  const res = await fetch(`${API_BASE}/tasks`)
  if (!res.ok) {
    throw new Error("Failed to load tasks")
  }
  return await res.json()
}
export async function createTaskApi(text) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || "Failed to create task")
  }
  return await res.json()
}

export async function updateTaskApi(id, text) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || "Failed to update task")
  }
  return await res.json()
}

export async function deleteTaskApi(id) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || "Failed to delete task")
  }
}

export async function completeTaskApi(id) {
  const res = await fetch(`${API_BASE}/tasks/${id}/complete`, {
    method: "POST",
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || "Failed to complete task")
  }
  return await res.json()
}

export async function clearAllApi() {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "DELETE",
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || "Failed to clear tasks")
  }
}
let nextId = 1

export function resetTaskState() {
  nextId = 1
}

/**
 * addTask(text, tasks)
 * Returns a new array with the added task
 */
export function addTask(text, tasks) {
  const trimmed = String(text || "").trim()
  if (!trimmed) {
    throw new Error("Task text cannot be empty")
  }

  const newTask = {
    id: nextId++,
    text: trimmed,
    status: "pending",
    created_at: new Date().toISOString(),
  }

  return [...tasks, newTask]
}

/**
 * deleteTask(id, tasks)
 */
export function deleteTask(id, tasks) {
  const exists = tasks.some(t => t.id === id)
  if (!exists) {
    throw new Error("Task not found")
  }
  return tasks.filter(t => t.id !== id)
}

/**
 * completeTask(id, tasks)
 */
export function completeTask(id, tasks) {
  let found = false

  const updated = tasks.map(t => {
    if (t.id === id) {
      found = true
      if (t.status === "completed") {
        throw new Error("Task already completed")
      }
      return { ...t, status: "completed" }
    }
    return t
  })

  if (!found) {
    throw new Error("Task not found")
  }

  return updated
}

/**
 * editTask(id, newText, tasks)
 */
export function editTask(id, newText, tasks) {
  const trimmed = String(newText || "").trim()
  if (!trimmed) {
    throw new Error("Task text cannot be empty")
  }

  let found = false
  const updated = tasks.map(t => {
    if (t.id === id) {
      found = true
      return { ...t, text: trimmed }
    }
    return t
  })

  if (!found) {
    throw new Error("Task not found")
  }

  return updated
}

/**
 * getTasks(tasks)
 */
export function getTasks(tasks) {
  return tasks
}

/**
 * getPendingTasks(tasks)
 */
export function getPendingTasks(tasks) {
  return tasks.filter(t => t.status === "pending")
}

/**
 * getCompletedTasks(tasks)
 */
export function getCompletedTasks(tasks) {
  return tasks.filter(t => t.status === "completed")
}

/**
 * clearAll()
 */
export function clearAll() {
  return []
}