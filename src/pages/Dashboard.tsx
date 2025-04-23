
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { mockWorkouts, mockProgressEntries, mockUserProfile } from '../services/mockData';
import { Dumbbell, Camera, Scale, ArrowRight, Award, HeartPulse, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const latestProgress = mockProgressEntries[mockProgressEntries.length - 1];
  const featuredWorkouts = mockWorkouts.filter(workout => workout.featured);
  
  // Calculate weight loss percentage
  const weightLossTotal = mockUserProfile.startingWeight - mockUserProfile.currentWeight;
  const weightLossGoalTotal = mockUserProfile.startingWeight - (mockUserProfile.goalWeight || mockUserProfile.currentWeight);
  const weightLossPercentage = Math.round((weightLossTotal / weightLossGoalTotal) * 100);
  
  // Calculate streak (mock data)
  const streak = 7;
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {mockUserProfile.name}!</h1>
          <p className="text-muted-foreground">Here's your fitness summary and progress.</p>
        </div>
        <Button onClick={() => navigate('/progress/new')} className="hidden sm:flex">
          <Camera className="mr-2 h-4 w-4" />
          Log Progress
        </Button>
      </div>

      {/* Progress overview cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Weight Progress</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUserProfile.currentWeight} kg</div>
            <p className="text-xs text-muted-foreground">
              Goal: {mockUserProfile.goalWeight} kg
            </p>
            <Progress value={weightLossPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {weightLossPercentage}% to goal
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streak} days</div>
            <p className="text-xs text-muted-foreground">
              Keep it up! You're doing great.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">AI Form Score</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestProgress.aiScore || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">
              {latestProgress.aiScore ? '+6 pts since last week' : 'Upload a progress photo'}
            </p>
            {latestProgress.aiScore && (
              <Progress value={latestProgress.aiScore} className="mt-2" />
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Fitness Level</CardTitle>
            <HeartPulse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{mockUserProfile.fitnessLevel}</div>
            <p className="text-xs text-muted-foreground">
              Goal: {mockUserProfile.goal.replace(/([A-Z])/g, ' $1').trim()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Featured workouts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Suggested Workouts</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/workouts')}>
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredWorkouts.length > 0 ? (
            featuredWorkouts.map((workout) => (
              <Card key={workout.id} className="workout-card group cursor-pointer" onClick={() => navigate(`/workouts/${workout.id}`)}>
                {workout.imageUrl && (
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img
                      src={workout.imageUrl}
                      alt={workout.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="line-clamp-1">{workout.name}</CardTitle>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${
                      workout.intensity === 'light' ? 'bg-green-100 text-green-800' :
                      workout.intensity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {workout.intensity}
                    </span>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {workout.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex items-center justify-between">
                  <div className="flex items-center">
                    <Dumbbell className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{workout.exercises.length} exercises</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{workout.duration} min</span>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground">No workouts found. Check back later!</p>
          )}
        </div>
      </div>

      {/* Progress history preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Progress</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/progress')}>
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        {mockProgressEntries.length > 0 ? (
          <div className="space-y-4">
            {mockProgressEntries.slice(-2).reverse().map((entry) => (
              <Card key={entry.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {entry.photos && entry.photos.length > 0 && (
                    <div className="sm:w-1/3">
                      <img
                        src={entry.photos[0]}
                        alt="Progress"
                        className="h-48 w-full object-cover sm:h-full"
                      />
                    </div>
                  )}
                  <div className="p-4 sm:w-2/3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">
                        {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
                      </h3>
                      {entry.aiScore && (
                        <span className="flex items-center text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          <LineChart className="mr-1 h-3 w-3" />
                          Score: {entry.aiScore}
                        </span>
                      )}
                    </div>
                    <div className="my-2 flex items-center">
                      <Scale className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{entry.weight} kg</span>
                    </div>
                    {entry.aiAnalysis && (
                      <div className="rounded-md bg-muted p-3 text-sm my-2">
                        <p className="font-medium">AI Analysis:</p>
                        <p className="text-muted-foreground">{entry.aiAnalysis}</p>
                      </div>
                    )}
                    {entry.notes && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{entry.notes}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground mb-4">No progress entries yet. Start tracking your fitness journey!</p>
            <Button onClick={() => navigate('/progress/new')}>
              <Camera className="mr-2 h-4 w-4" />
              Add First Entry
            </Button>
          </Card>
        )}
      </div>

      {/* Mobile quick action button */}
      <Button 
        onClick={() => navigate('/progress/new')} 
        className="fixed bottom-20 right-4 shadow-lg rounded-full md:hidden bg-fit-green hover:bg-fit-green-dark"
        size="icon"
      >
        <Camera className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Dashboard;
