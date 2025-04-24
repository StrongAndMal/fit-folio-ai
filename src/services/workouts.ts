import { collection, query, where, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, orderBy, limit, startAfter, QueryDocumentSnapshot, increment } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Workout, Exercise } from '../types/fitness';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
  imageUrl: string;
  videoUrl?: string;
  muscleGroup: string;
  equipment: string;
  difficulty: string;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: string;
  category: string;
  subCategory?: string;
  exercises: Exercise[];
  imageUrl: string;
  createdBy: string;
  tags: string[];
  targetMuscles: string[];
  equipmentNeeded: string[];
  restTime: string;
  caloriesBurned: number;
  popularity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const workoutCategories = [
  'Athlete Training',
  'Bodybuilding',
  'Powerlifting',
  'CrossFit',
  'Olympic Weightlifting',
  'Functional Fitness',
  'Sports Specific',
  'HIIT',
  'Strength',
  'Cardio',
  'Flexibility',
  'Rehabilitation'
];

export const workoutTypes = [
  'Beginner Friendly',
  'Intermediate',
  'Advanced',
  'Professional',
  'Competition Prep',
  'Off-Season',
  'In-Season',
  'Prehabilitation',
  'Rehabilitation',
  'Maintenance'
];

export const athleteCategories = [
  'Football',
  'Basketball',
  'Soccer',
  'Baseball',
  'Tennis',
  'Swimming',
  'Track & Field',
  'Wrestling',
  'Martial Arts',
  'Gymnastics'
];

export const bodybuildingCategories = [
  'Mass Building',
  'Cutting',
  'Competition Prep',
  'Classic Physique',
  'Men\'s Physique',
  'Women\'s Physique',
  'Bikini',
  'Wellness'
];

export const powerliftingCategories = [
  'Beginner Program',
  'Intermediate Program',
  'Advanced Program',
  'Peaking Program',
  'Volume Phase',
  'Intensity Phase',
  'Deload Week',
  'Competition Prep'
];

export const muscleGroups = [
  'Chest',
  'Back',
  'Shoulders',
  'Biceps',
  'Triceps',
  'Legs',
  'Core',
  'Full Body',
  'Upper Body',
  'Lower Body'
];

export const equipmentTypes = [
  'Barbell',
  'Dumbbell',
  'Kettlebell',
  'Bodyweight',
  'Machine',
  'Cable',
  'Resistance Bands',
  'Medicine Ball',
  'Plyometric Box',
  'Pull-up Bar'
];

export const professionalWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Advanced Back Development',
    description: 'A comprehensive back workout focusing on both width and thickness.',
    duration: '60',
    difficulty: 'Advanced',
    category: 'Bodybuilding',
    subCategory: 'Back',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
    createdBy: 'Professional Trainer',
    tags: ['Strength', 'Hypertrophy', 'Back'],
    targetMuscles: ['Lats', 'Traps', 'Rear Delts'],
    equipmentNeeded: ['Barbell', 'Dumbbells', 'Pull-up Bar'],
    restTime: '90 seconds',
    caloriesBurned: 450,
    popularity: 85,
    exercises: [
      {
        id: '1-1',
        name: 'Pull-ups',
        sets: 4,
        reps: 10,
        notes: 'Wide grip',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        muscleGroup: 'Back',
        equipment: 'Bodyweight',
        difficulty: 'Intermediate'
      },
      {
        id: '1-2',
        name: 'Bent Over Barbell Rows',
        sets: 4,
        reps: 8,
        weight: 0,
        notes: 'Keep back straight',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        muscleGroup: 'Back',
        equipment: 'Barbell',
        difficulty: 'Intermediate'
      }
    ]
  },
  {
    id: '2',
    name: 'CrossFit Hero WOD "Murph"',
    description: 'A challenging CrossFit workout honoring Navy Lieutenant Michael Murphy. This workout tests both strength and endurance.',
    duration: '45',
    difficulty: 'Advanced',
    category: 'CrossFit',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
    createdBy: 'CrossFit HQ',
    tags: ['Endurance', 'Full Body', 'Hero WOD'],
    targetMuscles: ['Full Body'],
    equipmentNeeded: ['Pull-up Bar', 'Bodyweight'],
    restTime: 'As needed',
    caloriesBurned: 800,
    popularity: 90,
    exercises: [
      {
        id: '2-1',
        name: '1 Mile Run',
        sets: 1,
        reps: 1,
        notes: 'Fast pace',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        muscleGroup: 'Full Body',
        equipment: 'Bodyweight',
        difficulty: 'Advanced'
      },
      {
        id: '2-2',
        name: '100 Pull-ups',
        sets: 1,
        reps: 100,
        notes: 'Partition as needed',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        muscleGroup: 'Back',
        equipment: 'Pull-up Bar',
        difficulty: 'Advanced'
      }
    ]
  },
  {
    id: '3',
    name: 'Powerlifting Strength Block',
    description: 'A focused powerlifting program to increase your squat, bench, and deadlift numbers.',
    duration: '90',
    difficulty: 'Advanced',
    category: 'Powerlifting',
    subCategory: 'Strength',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
    createdBy: 'Powerlifting Coach',
    tags: ['Strength', 'Powerlifting', 'Competition'],
    targetMuscles: ['Full Body'],
    equipmentNeeded: ['Barbell', 'Squat Rack', 'Bench'],
    restTime: '3-5 minutes',
    caloriesBurned: 600,
    popularity: 88,
    exercises: [
      {
        id: '3-1',
        name: 'Back Squat',
        sets: 5,
        reps: 5,
        weight: 0,
        notes: 'Heavy weight',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        muscleGroup: 'Legs',
        equipment: 'Barbell',
        difficulty: 'Advanced'
      },
      {
        id: '3-2',
        name: 'Bench Press',
        sets: 5,
        reps: 5,
        weight: 0,
        notes: 'Competition grip',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        muscleGroup: 'Chest',
        equipment: 'Barbell',
        difficulty: 'Advanced'
      }
    ]
  },
  {
    id: '4',
    name: 'Athlete Speed Training',
    description: 'A specialized workout to improve speed, agility, and explosive power for athletes.',
    duration: '60',
    difficulty: 'Intermediate',
    category: 'Athlete Training',
    subCategory: 'Speed',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
    createdBy: 'Sports Performance Coach',
    tags: ['Speed', 'Agility', 'Explosive'],
    targetMuscles: ['Legs', 'Core'],
    equipmentNeeded: ['Cones', 'Agility Ladder', 'Medicine Ball'],
    restTime: '60 seconds',
    caloriesBurned: 500,
    popularity: 82,
    exercises: [
      {
        id: '4-1',
        name: 'Sprint Intervals',
        sets: 8,
        reps: 1,
        notes: '40-yard sprints',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        muscleGroup: 'Legs',
        equipment: 'Bodyweight',
        difficulty: 'Intermediate'
      },
      {
        id: '4-2',
        name: 'Agility Ladder Drills',
        sets: 4,
        reps: 1,
        notes: 'Various patterns',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        muscleGroup: 'Legs',
        equipment: 'Agility Ladder',
        difficulty: 'Intermediate'
      }
    ]
  },
  {
    id: '5',
    name: 'Starting Strength Novice Program',
    description: 'A foundational strength program designed by Mark Rippetoe. Perfect for beginners looking to build strength.',
    duration: '60',
    difficulty: 'Beginner',
    category: 'Powerlifting',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
    createdBy: 'Mark Rippetoe',
    tags: ['Strength', 'Novice', 'Foundational'],
    targetMuscles: ['Full Body'],
    equipmentNeeded: ['Barbell', 'Squat Rack'],
    restTime: '3-5 minutes',
    caloriesBurned: 400,
    popularity: 85,
    exercises: [
      {
        id: '3-1',
        name: 'Squat',
        sets: 3,
        reps: 5,
        weight: 0,
        notes: 'Focus on form',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        muscleGroup: 'Legs',
        equipment: 'Barbell',
        difficulty: 'Beginner'
      },
      {
        id: '3-2',
        name: 'Bench Press',
        sets: 3,
        reps: 5,
        weight: 0,
        notes: 'Full range of motion',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        muscleGroup: 'Chest',
        equipment: 'Barbell',
        difficulty: 'Beginner'
      },
      {
        id: '3-3',
        name: 'Deadlift',
        sets: 1,
        reps: 5,
        weight: 0,
        notes: 'Focus on form',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        muscleGroup: 'Back',
        equipment: 'Barbell',
        difficulty: 'Beginner'
      }
    ]
  },
  {
    id: '6',
    name: 'Football Pre-Season Power Program',
    description: 'Designed for football players to build explosive power and strength during pre-season. Focuses on compound movements and plyometrics.',
    duration: '75',
    difficulty: 'Advanced',
    category: 'Athlete Training',
    subCategory: 'Football',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
    createdBy: 'NFL Performance Team',
    tags: ['Explosive Power', 'Athletic Performance', 'Pre-Season'],
    targetMuscles: ['Full Body'],
    equipmentNeeded: ['Barbell', 'Plyometric Box', 'Medicine Ball'],
    restTime: '2-3 minutes',
    caloriesBurned: 700,
    popularity: 88,
    exercises: [
      {
        id: '4-1',
        name: 'Power Clean',
        sets: 5,
        reps: 3,
        notes: 'Focus on explosive triple extension',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        muscleGroup: 'Full Body',
        equipment: 'Barbell',
        difficulty: 'Advanced'
      },
      {
        id: '4-2',
        name: 'Box Jumps',
        sets: 4,
        reps: 8,
        notes: 'Max height, controlled landing',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        muscleGroup: 'Legs',
        equipment: 'Plyometric Box',
        difficulty: 'Intermediate'
      },
      {
        id: '4-3',
        name: 'Medicine Ball Slams',
        sets: 4,
        reps: 12,
        notes: 'Full extension overhead',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        muscleGroup: 'Core',
        equipment: 'Medicine Ball',
        difficulty: 'Intermediate'
      }
    ]
  },
  {
    id: '7',
    name: 'Classic Bodybuilding Split',
    description: 'A traditional bodybuilding program focusing on muscle hypertrophy and definition. Perfect for intermediate to advanced lifters.',
    duration: '90',
    difficulty: 'Intermediate',
    category: 'Bodybuilding',
    subCategory: 'Mass Building',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
    createdBy: 'Professional Bodybuilding Team',
    tags: ['Hypertrophy', 'Muscle Growth', 'Classic'],
    targetMuscles: ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs'],
    equipmentNeeded: ['Barbell', 'Dumbbell', 'Machine', 'Cable'],
    restTime: '60-90 seconds',
    caloriesBurned: 650,
    popularity: 92,
    exercises: [
      {
        id: '5-1',
        name: 'Incline Barbell Press',
        sets: 4,
        reps: 8,
        notes: '30-degree angle, controlled tempo',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        muscleGroup: 'Chest',
        equipment: 'Barbell',
        difficulty: 'Intermediate'
      },
      {
        id: '5-2',
        name: 'Lat Pulldown',
        sets: 4,
        reps: 10,
        notes: 'Wide grip, full range of motion',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        muscleGroup: 'Back',
        equipment: 'Cable',
        difficulty: 'Intermediate'
      },
      {
        id: '5-3',
        name: 'Lateral Raises',
        sets: 4,
        reps: 12,
        notes: 'Controlled movement, slight bend in elbows',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        muscleGroup: 'Shoulders',
        equipment: 'Dumbbell',
        difficulty: 'Intermediate'
      }
    ]
  },
  {
    id: '8',
    name: 'Powerlifting Peaking Program',
    description: 'A specialized program designed to peak strength for powerlifting competitions. Focuses on the big three lifts with accessory work.',
    duration: '120',
    difficulty: 'Advanced',
    category: 'Powerlifting',
    subCategory: 'Competition Prep',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
    createdBy: 'IPF Certified Coach',
    tags: ['Strength', 'Competition', 'Peaking'],
    targetMuscles: ['Full Body'],
    equipmentNeeded: ['Barbell', 'Squat Rack', 'Bench Press'],
    restTime: '3-5 minutes',
    caloriesBurned: 800,
    popularity: 90,
    exercises: [
      {
        id: '6-1',
        name: 'Competition Squat',
        sets: 5,
        reps: 3,
        notes: 'Competition depth, competition pause',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        muscleGroup: 'Legs',
        equipment: 'Barbell',
        difficulty: 'Advanced'
      },
      {
        id: '6-2',
        name: 'Competition Bench Press',
        sets: 5,
        reps: 3,
        notes: 'Competition pause, full range of motion',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        muscleGroup: 'Chest',
        equipment: 'Barbell',
        difficulty: 'Advanced'
      },
      {
        id: '6-3',
        name: 'Competition Deadlift',
        sets: 5,
        reps: 2,
        notes: 'Competition standard',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        muscleGroup: 'Back',
        equipment: 'Barbell',
        difficulty: 'Advanced'
      }
    ]
  }
];

export const getWorkouts = async (
  filters?: {
    difficulty?: string;
    category?: string;
    search?: string;
    muscleGroup?: string;
    equipment?: string;
  },
  lastDoc?: QueryDocumentSnapshot,
  pageSize: number = 12
) => {
  try {
    let q = query(collection(db, 'workouts'), orderBy('popularity', 'desc'), limit(pageSize));
    
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }
    
    if (filters) {
      if (filters.difficulty) {
        q = query(q, where('difficulty', '==', filters.difficulty));
      }
      if (filters.category) {
        q = query(q, where('category', '==', filters.category));
      }
      if (filters.muscleGroup) {
        q = query(q, where('targetMuscles', 'array-contains', filters.muscleGroup));
      }
      if (filters.equipment) {
        q = query(q, where('equipmentNeeded', 'array-contains', filters.equipment));
      }
    }

    const querySnapshot = await getDocs(q);
    const workouts: Workout[] = [];
    let lastVisible = null;

    querySnapshot.forEach((doc) => {
      workouts.push({ id: doc.id, ...doc.data() } as Workout);
      lastVisible = doc;
    });

    return { workouts, lastVisible };
  } catch (error) {
    console.error('Error fetching workouts:', error);
    throw new Error('Failed to fetch workouts');
  }
};

export const getWorkoutById = (id: string): Workout | undefined => {
  return professionalWorkouts.find(workout => workout.id === id);
};

export const getWorkoutsByCategory = (category: string): Workout[] => {
  return professionalWorkouts.filter(workout => workout.category === category);
};

export const getWorkoutsByDifficulty = (difficulty: string): Workout[] => {
  return professionalWorkouts.filter(workout => workout.difficulty === difficulty);
};

export const searchWorkouts = async (query: string): Promise<Workout[]> => {
  try {
    const workoutsRef = collection(db, 'workouts');
    const q = query(
      workoutsRef,
      where('searchTerms', 'array-contains', query.toLowerCase())
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Workout));
  } catch (error) {
    console.error('Error searching workouts:', error);
    throw new Error('Failed to search workouts');
  }
};

export const createWorkout = async (workout: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const workoutRef = collection(db, 'workouts');
    const searchTerms = [
      ...workout.name.toLowerCase().split(' '),
      ...workout.description.toLowerCase().split(' '),
      ...workout.tags.map(tag => tag.toLowerCase()),
      ...workout.targetMuscles.map(muscle => muscle.toLowerCase()),
      ...workout.equipmentNeeded.map(equipment => equipment.toLowerCase())
    ];
    
    const newWorkout = {
      ...workout,
      searchTerms,
      createdAt: new Date(),
      updatedAt: new Date(),
      popularity: 0
    };
    
    const docRef = await addDoc(workoutRef, newWorkout);
    return { id: docRef.id, ...newWorkout };
  } catch (error) {
    console.error('Error creating workout:', error);
    throw new Error('Failed to create workout');
  }
};

export const updateWorkout = async (id: string, workout: Partial<Workout>) => {
  try {
    const workoutRef = doc(db, 'workouts', id);
    const searchTerms = [
      ...(workout.name?.toLowerCase().split(' ') || []),
      ...(workout.description?.toLowerCase().split(' ') || []),
      ...(workout.tags?.map(tag => tag.toLowerCase()) || []),
      ...(workout.targetMuscles?.map(muscle => muscle.toLowerCase()) || []),
      ...(workout.equipmentNeeded?.map(equipment => equipment.toLowerCase()) || [])
    ];
    
    await updateDoc(workoutRef, {
      ...workout,
      searchTerms,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating workout:', error);
    throw new Error('Failed to update workout');
  }
};

export const deleteWorkout = async (id: string) => {
  try {
    const workoutRef = doc(db, 'workouts', id);
    await deleteDoc(workoutRef);
  } catch (error) {
    console.error('Error deleting workout:', error);
    throw new Error('Failed to delete workout');
  }
};

export const incrementWorkoutPopularity = async (id: string) => {
  try {
    const workoutRef = doc(db, 'workouts', id);
    await updateDoc(workoutRef, {
      popularity: increment(1)
    });
  } catch (error) {
    console.error('Error incrementing workout popularity:', error);
    throw new Error('Failed to update workout popularity');
  }
}; 