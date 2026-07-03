import { Habit, HabitStore } from "./types";

const STORAGE_KEY = "habit-tracker-v1";

const defaultStore: HabitStore = {
  habits: [],
  version: 1,
};

export function loadHabits(): Habit[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const store = JSON.parse(stored) as HabitStore;
    return store.habits || [];
  } catch {
    return [];
  }
}

export function saveHabits(habits: Habit[]): void {
  if (typeof window === "undefined") return;
  try {
    const store: HabitStore = { habits, version: 1 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    console.error("Failed to save habits");
  }
}

export function addHabit(name: string, description: string, color: Habit["color"] = "blue"): Habit {
  const habit: Habit = {
    id: Math.random().toString(36).slice(2, 9),
    name,
    description,
    color,
    createdAt: new Date().toISOString(),
    completions: [],
  };
  const habits = loadHabits();
  habits.push(habit);
  saveHabits(habits);
  return habit;
}

export function deleteHabit(id: string): void {
  const habits = loadHabits();
  saveHabits(habits.filter((h) => h.id !== id));
}

export function toggleCompletion(habitId: string, date: string): void {
  const habits = loadHabits();
  const habit = habits.find((h) => h.id === habitId);
  if (!habit) return;

  const index = habit.completions.indexOf(date);
  if (index > -1) {
    habit.completions.splice(index, 1);
  } else {
    habit.completions.push(date);
  }
  saveHabits(habits);
}

export function getStreak(completions: string[]): number {
  if (completions.length === 0) return 0;

  const sorted = [...completions].sort().reverse();
  let streak = 0;
  let currentDate = new Date();

  for (const dateStr of sorted) {
    const checkDate = new Date(dateStr);
    const dayDiff = Math.floor((currentDate.getTime() - checkDate.getTime()) / (1000 * 60 * 60 * 24));

    if (dayDiff === streak) {
      streak++;
      currentDate = checkDate;
    } else {
      break;
    }
  }

  return streak;
}
