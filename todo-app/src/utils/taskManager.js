const API_BASE = "http://127.0.0.1:5000"

// -------- API HELPERS --------

export const fetchTasksFromApi = async () => {
  const res = await fetch("http://127.0.0.1:5000/tasks");

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await res.json();

  // ✅ ensure clean return
  return Array.isArray(data) ? data : [];
};

export async function createTaskApi(text) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || "Failed to create task")
  }
  return data
}

export async function updateTaskApi(id, text) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || "Failed to update task")
  }
  return data
}

export async function deleteTaskApi(id) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "DELETE",
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || "Failed to delete task")
  }
  return data
}

export async function completeTaskApi(id) {
  const res = await fetch(`${API_BASE}/tasks/${id}/complete`, {
    method: "POST",
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || "Failed to complete task")
  }
  return data
}

export async function clearAllApi() {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "DELETE",
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || "Failed to clear tasks")
  }
  return data
}

// -------- PURE HELPERS (FOR FILTERING / TESTS) --------

let nextId = 1

export function resetTaskState() {
  nextId = 1
}

export function getTasks(tasks) {
  return tasks
}

export function getPendingTasks(tasks) {
  return tasks.filter(t => t.status === "pending")
}

export function getCompletedTasks(tasks) {
  return tasks.filter(t => t.status === "completed")
}