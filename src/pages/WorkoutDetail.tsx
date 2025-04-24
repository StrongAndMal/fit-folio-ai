import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Workout, Exercise } from '../services/workouts';
import { generateWorkoutPDF } from '../components/WorkoutPDF';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, Download, Share2, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

// Extend the Exercise interface to include completed property
interface ExtendedExercise extends Exercise {
  completed: boolean;
}

// Mock data for testing
const mockWorkout: Workout = {
  id: '1',
  name: 'Full Body Workout',
  description: 'A comprehensive full body workout targeting all major muscle groups',
  duration: '45',
  difficulty: 'Intermediate',
  category: 'Strength',
  exercises: [
    {
      id: '1',
      name: 'Squats',
      sets: 3,
      reps: 12,
      weight: 0,
      notes: 'Keep back straight',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      muscleGroup: 'Legs',
      equipment: 'Bodyweight',
      difficulty: 'Beginner'
    },
    {
      id: '2',
      name: 'Push-ups',
      sets: 3,
      reps: 10,
      weight: 0,
      notes: 'Keep core tight',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      muscleGroup: 'Chest',
      equipment: 'Bodyweight',
      difficulty: 'Beginner'
    }
  ],
  imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
  createdBy: 'System',
  tags: ['Full Body', 'Strength'],
  targetMuscles: ['Legs', 'Chest', 'Core'],
  equipmentNeeded: ['Bodyweight'],
  restTime: '60 seconds',
  caloriesBurned: 300,
  popularity: 85
};

export function WorkoutDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [exercises, setExercises] = useState<ExtendedExercise[]>([]);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);

  useEffect(() => {
    // TODO: Replace with actual API call
    setWorkout(mockWorkout);
    setExercises(mockWorkout.exercises.map(ex => ({ ...ex, completed: false })));
  }, [id]);

  const handleExerciseComplete = (exerciseId: string) => {
    setExercises(prevExercises =>
      prevExercises.map(exercise =>
        exercise.id === exerciseId
          ? { ...exercise, completed: !exercise.completed }
          : exercise
      )
    );
  };

  const handleDownloadPDF = async () => {
    if (workout) {
      const qrCodeUrl = `${window.location.origin}/workout/${workout.id}`;
      await generateWorkoutPDF(workout, qrCodeUrl);
    }
  };

  const handleGenerateQRCode = () => {
    setShowQRCode(true);
  };

  if (!workout) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">{workout.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Workout Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{workout.duration} minutes</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Difficulty</p>
                <p className="font-medium">{workout.difficulty}</p>
              </div>
            </div>
            <p className="mt-4 text-gray-600">{workout.description}</p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Exercises</h2>
            <div className="space-y-4">
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center">
                    <button
                      onClick={() => handleExerciseComplete(exercise.id)}
                      className="mr-4"
                    >
                      {exercise.completed ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : (
                        <Circle className="h-6 w-6 text-gray-300" />
                      )}
                    </button>
                    <div>
                      <h3 className="font-medium">{exercise.name}</h3>
                      <p className="text-sm text-gray-500">
                        {exercise.sets} sets × {exercise.reps} reps
                        {exercise.weight ? ` × ${exercise.weight}kg` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Equipment: {exercise.equipment}
                    </p>
                    {exercise.notes && (
                      <p className="text-sm text-gray-500">{exercise.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Progress</h2>
            <div className="text-center">
              <p className="text-4xl font-bold">{currentStreak}</p>
              <p className="text-gray-500">Day Streak</p>
            </div>
          </Card>

          <div className="space-y-4">
            <Button
              className="w-full"
              onClick={handleDownloadPDF}
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGenerateQRCode}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Workout
            </Button>
          </div>

          {showQRCode && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Share Workout</h2>
              <div className="flex flex-col items-center space-y-4">
                <QRCodeSVG
                  value={`${window.location.origin}/workout/${workout.id}`}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
                <p className="text-sm text-gray-500 text-center">
                  Scan this QR code to share this workout with others
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
