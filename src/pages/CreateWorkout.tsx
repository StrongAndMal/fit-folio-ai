import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Save } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
}

const CreateWorkout = () => {
  const navigate = useNavigate();
  const [workoutName, setWorkoutName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      {
        id: uuidv4(),
        name: '',
        sets: 3,
        reps: 10,
        weight: 0,
        notes: ''
      }
    ]);
  };

  const handleRemoveExercise = (id: string) => {
    setExercises(exercises.filter(exercise => exercise.id !== id));
  };

  const handleExerciseChange = (id: string, field: keyof Exercise, value: string | number) => {
    setExercises(exercises.map(exercise => 
      exercise.id === id ? { ...exercise, [field]: value } : exercise
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically save the workout to your backend
    const newWorkout = {
      id: uuidv4(),
      name: workoutName,
      description,
      duration,
      difficulty,
      category,
      exercises
    };

    // For now, we'll just navigate to the workout detail page
    navigate(`/workouts/${newWorkout.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Workout</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Workout Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Workout Name</label>
                  <Input
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    placeholder="Enter workout name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration (minutes)</label>
                  <Input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g., 45"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your workout"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty</label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strength">Strength</SelectItem>
                      <SelectItem value="cardio">Cardio</SelectItem>
                      <SelectItem value="hiit">HIIT</SelectItem>
                      <SelectItem value="flexibility">Flexibility</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Exercises</CardTitle>
              <Button type="button" onClick={handleAddExercise} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Exercise
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {exercises.map((exercise) => (
                <div key={exercise.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1 mr-4">
                      <label className="text-sm font-medium">Exercise Name</label>
                      <Input
                        value={exercise.name}
                        onChange={(e) => handleExerciseChange(exercise.id, 'name', e.target.value)}
                        placeholder="Enter exercise name"
                        required
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveExercise(exercise.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Sets</label>
                      <Input
                        type="number"
                        value={exercise.sets}
                        onChange={(e) => handleExerciseChange(exercise.id, 'sets', parseInt(e.target.value))}
                        min="1"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Reps</label>
                      <Input
                        type="number"
                        value={exercise.reps}
                        onChange={(e) => handleExerciseChange(exercise.id, 'reps', parseInt(e.target.value))}
                        min="1"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Weight (kg)</label>
                      <Input
                        type="number"
                        value={exercise.weight}
                        onChange={(e) => handleExerciseChange(exercise.id, 'weight', parseFloat(e.target.value))}
                        min="0"
                        step="0.5"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Notes</label>
                    <Textarea
                      value={exercise.notes}
                      onChange={(e) => handleExerciseChange(exercise.id, 'notes', e.target.value)}
                      placeholder="Add any notes about the exercise"
                    />
                  </div>
                </div>
              ))}

              {exercises.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No exercises added yet. Click "Add Exercise" to get started.
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="w-full md:w-auto">
              <Save className="w-4 h-4 mr-2" />
              Create Workout
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkout; 