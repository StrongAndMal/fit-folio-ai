import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Dumbbell, Clock, Flame, Trophy, Target, Users, Loader2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { 
  workoutCategories,
  muscleGroups, 
  equipmentTypes,
  getWorkouts,
  searchWorkouts,
  incrementWorkoutPopularity
} from '@/services/workouts';
import { debounce } from 'lodash';
import { toast } from 'sonner';

const WorkoutLibrary = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const { ref, inView } = useInView();
  
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 300),
    []
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteQuery({
    queryKey: ['workouts', searchQuery, selectedCategory, selectedMuscleGroup, selectedEquipment, activeTab],
    queryFn: async ({ pageParam }) => {
      const filters = {
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
        ...(selectedMuscleGroup !== 'all' && { muscleGroup: selectedMuscleGroup }),
        ...(selectedEquipment !== 'all' && { equipment: selectedEquipment }),
        ...(searchQuery && { search: searchQuery })
      };
      
      return getWorkouts(filters, pageParam);
    },
    getNextPageParam: (lastPage) => lastPage.lastVisible || undefined,
    initialPageParam: undefined
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleWorkoutClick = async (workoutId: string) => {
    try {
      await incrementWorkoutPopularity(workoutId);
      navigate(`/workouts/${workoutId}`);
    } catch (error) {
      toast.error('Failed to load workout details');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedMuscleGroup('all');
    setSelectedEquipment('all');
    setActiveTab('all');
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">Error loading workouts</h2>
          <p className="text-muted-foreground">Please try again later</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Workout Library</h1>
          <Button onClick={() => navigate('/create-workout')}>
            <Dumbbell className="mr-2 h-4 w-4" />
            Create Custom Workout
          </Button>
        </div>

        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              <Dumbbell className="mr-2 h-4 w-4" />
              All Workouts
            </TabsTrigger>
            <TabsTrigger value="athlete">
              <Trophy className="mr-2 h-4 w-4" />
              Athlete Training
            </TabsTrigger>
            <TabsTrigger value="bodybuilding">
              <Target className="mr-2 h-4 w-4" />
              Bodybuilding
            </TabsTrigger>
            <TabsTrigger value="powerlifting">
              <Users className="mr-2 h-4 w-4" />
              Powerlifting
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search workouts..."
              onChange={(e) => debouncedSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {workoutCategories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedMuscleGroup} onValueChange={setSelectedMuscleGroup}>
            <SelectTrigger>
              <SelectValue placeholder="Muscle Group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Muscle Groups</SelectItem>
              {muscleGroups.map(group => (
                <SelectItem key={group} value={group}>{group}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
            <SelectTrigger>
              <SelectValue placeholder="Equipment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Equipment</SelectItem>
              {equipmentTypes.map(equipment => (
                <SelectItem key={equipment} value={equipment}>{equipment}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.pages.map((page, i) => (
                <React.Fragment key={i}>
                  {page.workouts.map((workout) => (
                    <Card 
                      key={workout.id} 
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleWorkoutClick(workout.id)}
                    >
                      <div className="relative h-48">
                        <img
                          src={workout.imageUrl || 'https://via.placeholder.com/300?text=No+Image'}
                          alt={workout.name}
                          className="w-full h-full object-cover rounded-t-lg"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/300?text=No+Image';
                          }}
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Badge variant="secondary" className="bg-background/80">
                            {workout.difficulty}
                          </Badge>
                          {workout.subCategory && (
                            <Badge variant="outline" className="bg-background/80">
                              {workout.subCategory}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{workout.name}</CardTitle>
                        <CardDescription>{workout.description}</CardDescription>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{workout.duration} min</span>
                          <Flame className="h-4 w-4 ml-2" />
                          <span>{workout.caloriesBurned} cal</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {workout.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Created by {workout.createdBy}
                          </span>
                          <Badge variant="secondary">
                            {workout.exercises.length} exercises
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </React.Fragment>
              ))}
            </div>

            {data?.pages[0].workouts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No workouts found matching your criteria.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            )}

            <div ref={ref} className="h-10">
              {isFetchingNextPage && (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WorkoutLibrary; 