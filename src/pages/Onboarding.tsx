import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Onboarding = () => {
  const [goal, setGoal] = useState('');
  const [experience, setExperience] = useState('beginner');
  const [days, setDays] = useState(3);
  const [injuries, setInjuries] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => navigate('/app/dashboard'), 1200);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-muted">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to FitFolio AI!</CardTitle>
          <CardDescription>Tell us about yourself to personalize your workout plan.</CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center text-green-600 font-semibold py-8">Onboarding complete! Redirecting to your dashboard...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal">Fitness Goal</Label>
                <Input
                  id="goal"
                  type="text"
                  placeholder="e.g. Lose weight, Build muscle, Get fit"
                  value={goal}
                  onChange={e => setGoal(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <select
                  id="experience"
                  className="w-full border rounded px-3 py-2"
                  value={experience}
                  onChange={e => setExperience(e.target.value)}
                  required
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="days">Preferred Workout Days/Week</Label>
                <Input
                  id="days"
                  type="number"
                  min={1}
                  max={7}
                  value={days}
                  onChange={e => setDays(Number(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="injuries">Injuries or Limitations (optional)</Label>
                <Input
                  id="injuries"
                  type="text"
                  placeholder="e.g. Knee pain, Shoulder injury"
                  value={injuries}
                  onChange={e => setInjuries(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Saving...' : 'Finish Onboarding'}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="text-center text-xs text-muted-foreground">
          You can update this info later in your profile settings.
        </CardFooter>
      </Card>
    </div>
  );
};

export default Onboarding;
