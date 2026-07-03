"use client";

import { useMemo } from "react";
import { Habit } from "@/app/lib/types";

interface CalendarProps {
  habits: Habit[];
  selectedHabitId?: string;
}

export function Calendar({ habits, selectedHabitId }: CalendarProps) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const displayHabits = selectedHabitId
    ? habits.filter((h) => h.id === selectedHabitId)
    : habits;

  const completionMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day).toISOString().split("T")[0];
      map[date] = displayHabits.filter((h) => h.completions.includes(date)).length;
    }
    return map;
  }, [daysInMonth, currentYear, currentMonth, displayHabits]);

  const days = Array.from({ length: firstDayOfMonth }).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
        {new Date(currentYear, currentMonth).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </h2>
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-xs font-bold text-gray-600 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          if (!day)
            return (
              <div
                key={`empty-${index}`}
                className="aspect-square rounded bg-gray-100 dark:bg-gray-700"
              />
            );

          const date = new Date(currentYear, currentMonth, day as number)
            .toISOString()
            .split("T")[0];
          const count = completionMap[date] || 0;
          const intensity =
            count === 0
              ? "bg-gray-100 dark:bg-gray-700"
              : count === 1
                ? "bg-green-200 dark:bg-green-800"
                : count === 2
                  ? "bg-green-400 dark:bg-green-600"
                  : "bg-green-600 dark:bg-green-400";

          return (
            <div
              key={date}
              className={`aspect-square rounded flex items-center justify-center text-sm font-semibold ${intensity} text-gray-900 dark:text-gray-100 cursor-default`}
              title={`${count} completed`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
