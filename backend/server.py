from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

TASKS_FILE = os.path.join(os.path.dirname(__file__), "tasks.json")

def load_tasks():
    if not os.path.exists(TASKS_FILE):
        return []

    try:
        with open(TASKS_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data if isinstance(data, list) else []
    except:
        return []

def save_tasks(tasks):
    with open(TASKS_FILE, "w", encoding="utf-8") as f:
        json.dump(tasks, f, indent=2)
        f.flush()
        os.fsync(f.fileno())

def get_next_id(tasks):
    if not tasks:
        return 1
    return max(task["id"] for task in tasks) + 1

@app.get("/tasks")
def get_tasks():
    return jsonify(load_tasks()), 200

@app.post("/tasks")
def create_task():
    data = request.get_json(silent=True) or {}
    text = str(data.get("text", "")).strip()

    if not text:
        return jsonify({"error": "Task text cannot be empty"}), 400

    tasks = load_tasks()

    new_task = {
        "id": get_next_id(tasks),
        "text": text,
        "status": "pending",
        "created_at": datetime.utcnow().isoformat() + "Z",
    }

    tasks.append(new_task)
    save_tasks(tasks)

    return jsonify(new_task), 201

@app.put("/tasks/<int:task_id>")
def update_task(task_id):
    data = request.get_json(silent=True) or {}
    text = str(data.get("text", "")).strip()

    if not text:
        return jsonify({"error": "Task text cannot be empty"}), 400

    tasks = load_tasks()

    for task in tasks:
        if task["id"] == task_id:
            task["text"] = text
            save_tasks(tasks)
            return jsonify(task), 200

    return jsonify({"error": "Task not found"}), 404

@app.delete("/tasks/<int:task_id>")
def delete_task(task_id):
    tasks = load_tasks()

    updated_tasks = [t for t in tasks if t["id"] != task_id]

    if len(updated_tasks) == len(tasks):
        return jsonify({"error": "Task not found"}), 404

    save_tasks(updated_tasks)

    return jsonify({"message": "Task deleted"}), 200

@app.post("/tasks/<int:task_id>/complete")
def complete_task(task_id):
    tasks = load_tasks()

    for task in tasks:
        if task["id"] == task_id:
            if task["status"] == "completed":
                return jsonify({"error": "Task already completed"}), 400

            task["status"] = "completed"
            save_tasks(tasks)

            return jsonify(task), 200

    return jsonify({"error": "Task not found"}), 404

@app.delete("/tasks")
def clear_all_tasks():
    save_tasks([])
    return jsonify({"message": "All tasks cleared"}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)