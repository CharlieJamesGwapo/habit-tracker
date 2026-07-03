"use client";

import { Habit } from "@/app/lib/types";
import { getStreak } from "@/app/lib/storage";

interface HabitListProps {
  habits: Habit[];
  onToggleCompletion: (habitId: string, date: string) => void;
  onDelete: (habitId: string) => void;
}

export function HabitList({ habits, onToggleCompletion, onDelete }: HabitListProps) {
  const today = new Date().toISOString().split("T")[0];
  const colorMap: Record<Habit["color"], string> = {
    blue: "bg-blue-100 dark:bg-blue-900",
    green: "bg-green-100 dark:bg-green-900",
    red: "bg-red-100 dark:bg-red-900",
    purple: "bg-purple-100 dark:bg-purple-900",
    yellow: "bg-yellow-100 dark:bg-yellow-900",
  };

  const colorTextMap: Record<Habit["color"], string> = {
    blue: "text-blue-700 dark:text-blue-200",
    green: "text-green-700 dark:text-green-200",
    red: "text-red-700 dark:text-red-200",
    purple: "text-purple-700 dark:text-purple-200",
    yellow: "text-yellow-700 dark:text-yellow-200",
  };

  if (habits.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No habits yet. Create one to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {habits.map((habit) => {
        const isCompletedToday = habit.completions.includes(today);
        const streak = getStreak(habit.completions);
        return (
          <div
            key={habit.id}
            className={`p-4 rounded-lg border-2 ${colorMap[habit.color]} ${
              isCompletedToday ? "border-green-500" : "border-transparent"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className={`font-bold text-lg ${colorTextMap[habit.color]}`}>
                  {habit.name}
                </h3>
                {habit.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {habit.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => onDelete(habit.id)}
                className="px-2 py-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded text-sm"
              >
                Delete
              </button>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <button
                onClick={() => onToggleCompletion(habit.id, today)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isCompletedToday
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
                }`}
              >
                {isCompletedToday ? "✓ Done Today" : "Mark Complete"}
              </button>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">{streak}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">day streak</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
