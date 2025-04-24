import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Dumbbell, Heart } from 'lucide-react';
import { Workout } from '@/services/workouts';
import { useNavigate } from 'react-router-dom';

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'advanced':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card 
      className="w-full max-w-sm mx-auto cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={() => navigate(`/workouts/${workout.id}`)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{workout.name}</CardTitle>
          <Badge variant="outline" className={getDifficultyColor(workout.difficulty)}>
            {workout.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{workout.description}</p>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            {workout.duration} min
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Dumbbell className="w-4 h-4 mr-1" />
            {workout.exercises.length} exercises
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2">
        <div className="flex gap-2">
          {workout.tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Heart className="w-4 h-4 mr-1" />
          {workout.likes}
        </div>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard; 