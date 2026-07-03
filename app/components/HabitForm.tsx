"use client";

import { useState } from "react";
import { Habit } from "@/app/lib/types";

interface HabitFormProps {
  onSubmit: (name: string, description: string, color: Habit["color"]) => void;
}

export function HabitForm({ onSubmit }: HabitFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState<Habit["color"]>("blue");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name, description, color);
    setName("");
    setDescription("");
    setColor("blue");
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium mb-6"
      >
        + Add Habit
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-6 border border-gray-200 dark:border-gray-700">
      <input
        type="text"
        placeholder="Habit name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white mb-3"
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white mb-3 resize-none"
        rows={2}
      />
      <div className="flex gap-2 mb-3">
        {(["blue", "green", "red", "purple", "yellow"] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            className={`w-8 h-8 rounded-full bg-${c}-500 ${color === c ? "ring-2 ring-offset-2" : ""}`}
            aria-label={`Color ${c}`}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
        >
          Create
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="flex-1 px-3 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
