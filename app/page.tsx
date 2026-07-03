"use client";

import { useEffect, useState } from "react";
import { Habit } from "@/app/lib/types";
import { loadHabits, saveHabits, addHabit, deleteHabit, toggleCompletion } from "@/app/lib/storage";
import { HabitForm } from "./components/HabitForm";
import { HabitList } from "./components/HabitList";
import { Calendar } from "./components/Calendar";

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedHabitId, setSelectedHabitId] = useState<string>();

  useEffect(() => {
    const loaded = loadHabits();
    setHabits(loaded);
    if (loaded.length > 0) {
      setSelectedHabitId(loaded[0].id);
    }
  }, []);

  const handleAddHabit = (name: string, description: string, color: Habit["color"]) => {
    const newHabit = addHabit(name, description, color);
    setHabits([newHabit, ...loadHabits()]);
  };

  const handleToggleCompletion = (habitId: string, date: string) => {
    toggleCompletion(habitId, date);
    setHabits(loadHabits());
  };

  const handleDeleteHabit = (habitId: string) => {
    deleteHabit(habitId);
    const updated = loadHabits();
    setHabits(updated);
    if (selectedHabitId === habitId && updated.length > 0) {
      setSelectedHabitId(updated[0].id);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Habit Tracker
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Build better habits, one day at a time
        </p>

        <HabitForm onSubmit={handleAddHabit} />
        <HabitList
          habits={habits}
          onToggleCompletion={handleToggleCompletion}
          onDelete={handleDeleteHabit}
        />
        <Calendar habits={habits} selectedHabitId={selectedHabitId} />
      </div>
    </main>
  );
}
