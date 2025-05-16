export interface UserProfile {
  // Basic Information
  age: number;
  gender: "male" | "female" | "other";
  height: number; // in cm
  weight: number; // in kg
  bodyFatPercentage?: number;

  // Fitness Level
  fitnessLevel: "beginner" | "intermediate" | "advanced";
  experience: number; // years of training

  // Goals
  primaryGoal:
    | "weight_loss"
    | "muscle_gain"
    | "maintenance"
    | "strength"
    | "endurance";
  secondaryGoals?: string[];

  // Preferences
  preferredWorkoutDays: number[]; // 0-6 for Sunday-Saturday
  preferredWorkoutDuration: number; // in minutes
  availableEquipment: string[];
  preferredExercises?: string[];
  avoidedExercises?: string[];

  // Health Information
  injuries?: {
    bodyPart: string;
    description: string;
    severity: "mild" | "moderate" | "severe";
  }[];
  medicalConditions?: string[];
  medications?: string[];

  // Lifestyle
  sleepHours: number;
  stressLevel: 1 | 2 | 3 | 4 | 5; // 1 being lowest, 5 being highest
  dietType?: "omnivore" | "vegetarian" | "vegan" | "keto" | "paleo" | "other";
  mealFrequency: number;

  // Progress Tracking
  currentWorkoutPlan?: string;
  progressPhotos?: string[];
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    biceps?: number;
    thighs?: number;
    date: Date;
  }[];
}
