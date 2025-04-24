import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Flame, Calendar, Trophy, Dumbbell, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [showStreakPopup, setShowStreakPopup] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(5);
  const [weeklyCheckIns, setWeeklyCheckIns] = useState([true, true, false, true, true, true, false]);

  // Show streak popup on component mount
  useEffect(() => {
    setShowStreakPopup(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Streak Popup */}
      <Dialog open={showStreakPopup} onOpenChange={setShowStreakPopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Flame className="text-orange-500" />
              {currentStreak} Day Streak! 🔥
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-lg mb-4">Keep up the great work! Here's your weekly progress:</p>
            <div className="flex justify-between">
              {weeklyCheckIns.map((checked, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    checked ? 'bg-green-500' : 'bg-gray-200'
                  }`}>
                    {checked ? '✓' : ''}
                  </div>
                  <span className="text-xs mt-1">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back! 👋</h1>
            <p className="text-muted-foreground">Ready to crush your fitness goals today?</p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <span className="text-2xl">🔥</span>
            <span className="text-xl font-semibold">{currentStreak} Day Streak</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/workouts')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-blue-500" />
                Today's Workout
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Upper Body Strength</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-muted-foreground">45 min</span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">6 exercises</span>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/progress')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Last 7 days</p>
              <div className="flex justify-between mt-2">
                {weeklyCheckIns.map((checked, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full ${
                      checked ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                    <span className="text-xs mt-1">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/workout-library')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-red-500" />
                Workout Library
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Browse professional workouts</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-muted-foreground">100+ workouts</span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">3 categories</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-500" />
                Upcoming Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((day) => (
                  <div key={day} className="flex items-center justify-between p-2 hover:bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Day {day} - {['Monday', 'Tuesday', 'Wednesday'][day - 1]}</p>
                      <p className="text-sm text-muted-foreground">Full Body Workout</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-purple-500" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: '5 Day Streak!', date: 'Today', emoji: '🔥' },
                  { title: 'New PR: Deadlift', date: 'Yesterday', emoji: '💪' },
                  { title: 'Completed 10 Workouts', date: '2 days ago', emoji: '🏆' },
                ].map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{achievement.emoji}</span>
                      <div>
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-sm text-muted-foreground">{achievement.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home; 