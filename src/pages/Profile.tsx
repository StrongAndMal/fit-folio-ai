
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ProfileDetails from "@/components/ProfileDetails";
import { Star, Heart } from "lucide-react";

const stats = [
  {
    icon: <Star className="text-yellow-500 w-5 h-5 mr-1" />,
    label: "Consistency",
    value: "92%",
  },
  {
    icon: <Heart className="text-pink-500 w-5 h-5 mr-1" />,
    label: "Workouts",
    value: "148",
  },
  {
    icon: <Star className="text-primary w-5 h-5 mr-1" />,
    label: "Streak",
    value: "21 days",
  },
];

const Profile = () => (
  <div className="flex flex-col items-center justify-center min-h-[75vh] px-2 bg-gradient-to-br from-fit-purple/5 to-white dark:from-fit-purple/60 dark:to-background/80">
    <Card className="w-full max-w-2xl mx-auto glass-morphism card-gradient shadow-2xl animate-fade-in rounded-2xl border-0">
      <CardHeader className="bg-gradient-to-br from-fit-purple via-primary to-fit-purple/70 rounded-t-2xl pb-3 text-center">
        <CardTitle className="text-white drop-shadow text-4xl font-bold tracking-tight">
          My Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center px-8">
        <ProfileDetails />
        <div className="my-8 w-full">
          <h3 className="text-xl font-semibold mb-4 text-left text-primary">Personal Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-fit-purple/5 dark:bg-fit-purple/20 rounded-xl py-4 px-3 flex flex-col items-center shadow-inner border border-white/10">
                <div>{stat.icon}</div>
                <div className="text-lg font-bold mt-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full text-center text-sm text-muted-foreground opacity-60 font-medium italic mb-6">
          More progress charts, badges, and stats coming soon!
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Profile;
