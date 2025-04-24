import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Camera, 
  Flame, 
  Trophy, 
  BookOpen, 
  Image as ImageIcon,
  Plus,
  Weight,
  Timer
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ProgressGraph from '@/components/ProgressGraph';

// Mock data for demonstration
const mockPhotos = [
  { id: 1, url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac1348?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', date: '2024-03-20' },
  { id: 2, url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', date: '2024-03-18' },
  { id: 3, url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', date: '2024-03-15' },
];

const mockJournalEntries = [
  { id: 1, date: '2024-03-20', title: 'Great workout today! 💪', content: 'Hit a new PR on squats! Feeling strong and motivated.' },
  { id: 2, date: '2024-03-18', title: 'Rest day 🧘‍♂️', content: 'Took it easy today, focusing on recovery and mobility.' },
  { id: 3, date: '2024-03-15', title: 'Cardio session 🏃‍♂️', content: 'Completed 5K in under 25 minutes! Making progress.' },
];

// Mock progress data for graphs
const mockProgressData = [
  { date: '2024-03-15', weight: 75, reps: 12, sets: 3, duration: 45, calories: 350 },
  { date: '2024-03-16', weight: 76, reps: 10, sets: 4, duration: 50, calories: 400 },
  { date: '2024-03-17', weight: 75.5, reps: 15, sets: 3, duration: 55, calories: 450 },
  { date: '2024-03-18', weight: 75, reps: 12, sets: 4, duration: 60, calories: 500 },
  { date: '2024-03-19', weight: 74.5, reps: 14, sets: 3, duration: 50, calories: 425 },
  { date: '2024-03-20', weight: 74, reps: 16, sets: 4, duration: 65, calories: 550 },
];

const Progress = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('journal');
  const [currentStreak, setCurrentStreak] = useState(5);
  const [weeklyCheckIns, setWeeklyCheckIns] = useState([true, true, false, true, true, true, false]);
  const [newJournalEntry, setNewJournalEntry] = useState({ title: '', content: '' });
  const [photos, setPhotos] = useState(mockPhotos);
  const [journalEntries, setJournalEntries] = useState(mockJournalEntries);

  const handleAddJournalEntry = () => {
    if (!newJournalEntry.title || !newJournalEntry.content) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in both title and content for your journal entry.',
        variant: 'destructive',
      });
      return;
    }

    const newEntry = {
      id: journalEntries.length + 1,
      date: new Date().toISOString().split('T')[0],
      ...newJournalEntry,
    };

    setJournalEntries([newEntry, ...journalEntries]);
    setNewJournalEntry({ title: '', content: '' });
    toast({
      title: 'Journal Entry Added',
      description: 'Your progress has been recorded! 🎉',
    });
  };

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const mockUrl = URL.createObjectURL(file);
      const newPhoto = {
        id: photos.length + 1,
        url: mockUrl,
        date: new Date().toISOString().split('T')[0],
      };
      setPhotos([newPhoto, ...photos]);
      toast({
        title: 'Photo Added',
        description: 'Your progress photo has been saved! 📸',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Progress & Journal</h1>
            <p className="text-muted-foreground">Track your fitness journey and celebrate your achievements</p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <span className="text-2xl">🔥</span>
            <span className="text-xl font-semibold">{currentStreak} Day Streak</span>
          </div>
        </div>

        <Tabs defaultValue="journal" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="journal" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Journal
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Progress Photos
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="journal" className="mt-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>New Journal Entry</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Title your entry..."
                    value={newJournalEntry.title}
                    onChange={(e) => setNewJournalEntry({ ...newJournalEntry, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="Write about your progress, thoughts, or achievements..."
                    value={newJournalEntry.content}
                    onChange={(e) => setNewJournalEntry({ ...newJournalEntry, content: e.target.value })}
                    className="min-h-[100px]"
                  />
                  <Button onClick={handleAddJournalEntry} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Entry
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {journalEntries.map((entry) => (
                <Card key={entry.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{entry.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          <Calendar className="inline mr-1 h-3 w-3" />
                          {entry.date}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{entry.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="photos" className="mt-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add Progress Photo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="photo-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                    </div>
                    <input
                      id="photo-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleAddPhoto}
                    />
                  </label>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <Card key={photo.id} className="overflow-hidden">
                  <img
                    src={photo.url}
                    alt={`Progress photo from ${photo.date}`}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">
                      <Calendar className="inline mr-1 h-3 w-3" />
                      {photo.date}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                    Current Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{currentStreak} days</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Keep going! You're on fire! 🔥
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    Weekly Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    {weeklyCheckIns.map((checked, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          checked ? 'bg-green-500' : 'bg-gray-200'
                        }`}>
                          {checked ? '✓' : ''}
                        </div>
                        <span className="text-xs mt-1">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Total Entries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{journalEntries.length}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Journal entries recorded
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Weight className="h-5 w-5 text-purple-500" />
                    Weight Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProgressGraph
                    data={mockProgressData}
                    type="weight"
                    title="Weight (kg)"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Timer className="h-5 w-5 text-green-500" />
                    Workout Duration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProgressGraph
                    data={mockProgressData}
                    type="duration"
                    title="Duration (minutes)"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-red-500" />
                    Calories Burned
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProgressGraph
                    data={mockProgressData}
                    type="calories"
                    title="Calories"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-blue-500" />
                    Exercise Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProgressGraph
                    data={mockProgressData}
                    type="reps"
                    title="Reps per Set"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Progress;
