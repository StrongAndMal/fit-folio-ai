
export type GoalType = 'weightLoss' | 'muscleGain' | 'toning' | 'endurance';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  height: number; // in cm
  currentWeight: number; // in kg
  startingWeight: number; // in kg
  goalWeight?: number; // in kg
  goal: GoalType;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  profileImage?: string;
  bio?: string;
  joinDate: string;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  intensity: 'light' | 'moderate' | 'intense';
  category: 'cardio' | 'strength' | 'flexibility' | 'balance' | 'full-body';
  exercises: Exercise[];
  imageUrl?: string;
  featured?: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  sets?: number;
  reps?: number;
  duration?: number; // in seconds
  videoUrl?: string;
  imageUrl?: string;
  muscleGroups: string[];
  equipment?: string[];
}

export interface ProgressEntry {
  id: string;
  userId: string;
  date: string;
  weight?: number;
  photos?: string[];
  notes?: string;
  mood?: 'great' | 'good' | 'neutral' | 'bad';
  workouts?: string[]; // Array of workout IDs completed
  aiScore?: number; // Score from 0-100 on form/progress
  aiAnalysis?: string; // Text analysis from AI
}

export interface WorkoutLog {
  id: string;
  userId: string;
  workoutId: string;
  date: string;
  completed: boolean;
  duration: number; // Actual duration
  exercises: {
    exerciseId: string;
    sets?: number;
    reps?: number;
    weight?: number;
    notes?: string;
  }[];
  notes?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}
