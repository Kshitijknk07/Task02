import React from "react";
import type { Filter } from "./TaskManager";
import { Button } from "@/components/ui/button";

interface TaskFilterProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

const TaskFilter: React.FC<TaskFilterProps> = ({ filter, setFilter }) => {
  return (
    <div className="flex justify-center gap-3 mb-6">
      {FILTERS.map((f) => (
        <Button
          key={f.value}
          variant={filter === f.value ? "default" : "outline"}
          className={`px-5 py-1.5 rounded-lg font-semibold shadow-sm transition-all duration-150 ${
            filter === f.value ? "scale-105" : ""
          }`}
          onClick={() => setFilter(f.value)}
        >
          {f.label}
        </Button>
      ))}
    </div>
  );
};

export default TaskFilter;
