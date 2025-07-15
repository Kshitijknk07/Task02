import React, { useState } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import TaskFilter from "./TaskFilter";
import { Card } from "@/components/ui/card";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export type Filter = "all" | "active" | "completed";

const initialTasks: Task[] = [
  { id: Date.now(), title: "Welcome to your Task Manager!", completed: false },
  {
    id: Date.now() + 1,
    title: "Try adding, completing, or deleting a task.",
    completed: false,
  },
];

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<Filter>("all");

  const addTask = (title: string) => {
    setTasks([{ id: Date.now(), title, completed: false }, ...tasks]);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <Card className="max-w-xl mx-auto mt-12 p-8 rounded-2xl shadow-2xl border border-white/30 bg-white/70 backdrop-blur-md animate-fade-in card-hover-effect">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight text-primary drop-shadow-sm">
        Task Manager
      </h1>
      <TaskInput onAdd={addTask} />
      <TaskFilter filter={filter} setFilter={setFilter} />
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        animate
      />
      {tasks.length === 0 && (
        <div className="flex flex-col items-center text-muted-foreground text-center mt-12 gap-2 animate-fade-in">
          <span className="text-5xl">📝</span>
          <span className="text-lg font-medium">
            No tasks yet. Add your first task!
          </span>
        </div>
      )}
    </Card>
  );
};

export default TaskManager;
