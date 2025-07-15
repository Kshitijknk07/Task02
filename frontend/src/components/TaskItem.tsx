import React, { useState, useEffect } from "react";
import type { Task } from "./TaskManager";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  animateCheckbox?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  animateCheckbox,
}) => {
  const [bouncing, setBouncing] = useState(false);

  useEffect(() => {
    if (animateCheckbox && bouncing) {
      const timeout = setTimeout(() => setBouncing(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [bouncing, animateCheckbox]);

  const handleToggle = () => {
    if (animateCheckbox) setBouncing(true);
    onToggle(task.id);
  };

  return (
    <li
      className={`flex items-center bg-muted rounded-xl px-5 py-3 shadow-sm border border-border/60 transition-all duration-200 group ${
        task.completed ? "opacity-70" : ""
      }`}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={handleToggle}
        className={`mr-4 w-6 h-6 ${bouncing ? "bounce" : ""}`}
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      />
      <span
        className={`flex-1 text-lg transition-all duration-200 ${
          task.completed
            ? "line-through text-muted-foreground"
            : "font-medium text-foreground"
        }`}
      >
        {task.title}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="ml-4 text-destructive hover:text-destructive/80 transition-colors duration-150 opacity-70 group-hover:opacity-100 text-2xl focus:outline-none"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
      >
        &times;
      </Button>
    </li>
  );
};

export default TaskItem;
