import React, { useState } from "react";
import type { Task } from "./TaskManager";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  animate?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggle,
  onDelete,
  animate,
}) => {
  const [removing, setRemoving] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    if (animate) {
      setRemoving(id);
      setTimeout(() => {
        setRemoving(null);
        onDelete(id);
      }, 400); // match slide-fade-out duration
    } else {
      onDelete(id);
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-muted-foreground text-center py-8">
        No tasks to show.
      </div>
    );
  }
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={
            animate
              ? removing === task.id
                ? "slide-fade-out"
                : "slide-fade-in"
              : ""
          }
        >
          <TaskItem
            task={task}
            onToggle={onToggle}
            onDelete={() => handleDelete(task.id)}
            animateCheckbox={animate}
          />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
