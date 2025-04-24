import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Dumbbell, Clock, Target, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateWorkoutPDF } from '../services/pdf';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
}

interface Workout {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: string;
  category: string;
  exercisesList: Exercise[];
}

const Workouts: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  // Mock data for saved workouts
  const savedWorkouts = [
    {
      id: '1',
      name: 'Upper Body Power',
      description: 'Focus on chest, shoulders, and arms',
      duration: '45 min',
      difficulty: 'Intermediate',
      category: 'Strength',
      lastCompleted: '2024-03-15',
      exercises: 8,
      exercisesList: [
        { name: 'Bench Press', sets: 4, reps: 8, weight: 60 },
        { name: 'Shoulder Press', sets: 3, reps: 10, weight: 30 },
        { name: 'Bicep Curls', sets: 3, reps: 12, weight: 15 },
        { name: 'Tricep Dips', sets: 3, reps: 12 },
        { name: 'Lateral Raises', sets: 3, reps: 12, weight: 10 },
        { name: 'Push-ups', sets: 3, reps: 15 },
        { name: 'Dumbbell Rows', sets: 3, reps: 12, weight: 20 },
        { name: 'Face Pulls', sets: 3, reps: 15, weight: 15 }
      ]
    },
    {
      id: '2',
      name: 'Lower Body Burn',
      description: 'Intense leg and glute workout',
      duration: '60 min',
      difficulty: 'Advanced',
      category: 'Strength',
      lastCompleted: '2024-03-12',
      exercises: 10,
      exercisesList: [
        { name: 'Squats', sets: 4, reps: 8, weight: 80 },
        { name: 'Deadlifts', sets: 4, reps: 6, weight: 100 },
        { name: 'Lunges', sets: 3, reps: 12, weight: 20 },
        { name: 'Leg Press', sets: 3, reps: 10, weight: 120 },
        { name: 'Romanian Deadlifts', sets: 3, reps: 10, weight: 60 },
        { name: 'Calf Raises', sets: 4, reps: 15, weight: 40 },
        { name: 'Hip Thrusts', sets: 3, reps: 12, weight: 80 },
        { name: 'Step-ups', sets: 3, reps: 10, weight: 20 },
        { name: 'Glute Bridges', sets: 3, reps: 15 },
        { name: 'Leg Extensions', sets: 3, reps: 12, weight: 50 }
      ]
    },
    {
      id: '3',
      name: 'Full Body HIIT',
      description: 'High-intensity interval training',
      duration: '30 min',
      difficulty: 'Beginner',
      category: 'Cardio',
      lastCompleted: '2024-03-10',
      exercises: 12,
      exercisesList: [
        { name: 'Jumping Jacks', sets: 1, reps: 30, notes: '1 minute' },
        { name: 'Burpees', sets: 1, reps: 10, notes: '30 seconds' },
        { name: 'Mountain Climbers', sets: 1, reps: 20, notes: '30 seconds' },
        { name: 'High Knees', sets: 1, reps: 30, notes: '1 minute' },
        { name: 'Push-ups', sets: 1, reps: 15, notes: '30 seconds' },
        { name: 'Squat Jumps', sets: 1, reps: 15, notes: '30 seconds' },
        { name: 'Plank', sets: 1, reps: 1, notes: '1 minute' },
        { name: 'Lunges', sets: 1, reps: 10, notes: '30 seconds' },
        { name: 'Russian Twists', sets: 1, reps: 20, notes: '30 seconds' },
        { name: 'Jump Rope', sets: 1, reps: 50, notes: '1 minute' },
        { name: 'Bicycle Crunches', sets: 1, reps: 20, notes: '30 seconds' },
        { name: 'Wall Sit', sets: 1, reps: 1, notes: '1 minute' }
      ]
    }
  ];

  const handleCreateWorkout = () => {
    navigate('/workouts/new');
  };

  const handleWorkoutClick = (id: string) => {
    navigate(`/workouts/${id}`);
  };

  const handleDownloadPDF = async (workout: Workout) => {
    const qrCodeUrl = `${window.location.origin}/workouts/${workout.id}`;
    try {
      await generateWorkoutPDF({
        id: workout.id,
        name: workout.name,
        description: workout.description,
        duration: workout.duration,
        difficulty: workout.difficulty,
        category: workout.category,
        exercises: workout.exercisesList
      }, qrCodeUrl);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Error generating PDF:', errorMessage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Workouts</h1>
          <p className="text-lg text-muted-foreground">
            Manage your saved workout routines
          </p>
        </div>
        <Button onClick={handleCreateWorkout} className="mt-4 md:mt-0">
          <Plus className="mr-2 h-4 w-4" />
          Create New Workout
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search workouts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('all')}
          >
            All
          </Button>
          <Button
            variant={selectedFilter === 'strength' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('strength')}
          >
            Strength
          </Button>
          <Button
            variant={selectedFilter === 'cardio' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('cardio')}
          >
            Cardio
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedWorkouts.map((workout) => (
          <Card
            key={workout.id}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{workout.name}</CardTitle>
                <Badge variant="secondary">{workout.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{workout.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">
                  <Clock className="mr-1 h-3 w-3" />
                  {workout.duration}
                </Badge>
                <Badge variant="outline">
                  <Target className="mr-1 h-3 w-3" />
                  {workout.difficulty}
                </Badge>
                <Badge variant="outline">
                  <Dumbbell className="mr-1 h-3 w-3" />
                  {workout.exercises} exercises
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Last completed: {workout.lastCompleted}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleWorkoutClick(workout.id)}
                >
                  View Details
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDownloadPDF(workout)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Workouts;
