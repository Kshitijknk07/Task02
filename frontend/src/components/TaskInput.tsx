import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TaskInputProps {
  onAdd: (title: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAdd }) => {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (value.trim()) {
      onAdd(value.trim());
      setValue("");
    }
  };

  return (
    <div className="flex gap-2 mb-6">
      <Input
        className="flex-1 text-lg"
        type="text"
        placeholder="Add a new task..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <Button
        className="px-6 py-2 text-lg font-semibold"
        onClick={handleAdd}
        aria-label="Add task"
      >
        Add
      </Button>
    </div>
  );
};

export default TaskInput;
