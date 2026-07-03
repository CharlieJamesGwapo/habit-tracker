export interface Habit {
  id: string;
  name: string;
  description: string;
  color: "blue" | "green" | "red" | "purple" | "yellow";
  createdAt: string;
  completions: string[];
}

export interface HabitStore {
  habits: Habit[];
  version: number;
}
