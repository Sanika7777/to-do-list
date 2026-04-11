import TaskCard from "./TaskCard"
import EmptyState from "./EmptyState"

function TaskList({ tasks, onComplete, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1 custom-scroll">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onComplete={onComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}

export default TaskList