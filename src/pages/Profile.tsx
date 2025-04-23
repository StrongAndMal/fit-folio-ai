
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ProfileDetails from "@/components/ProfileDetails";

const Profile = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] px-2">
    <Card className="w-full max-w-lg mx-auto glass-morphism card-gradient shadow-xl animate-fade-in">
      <CardHeader className="bg-gradient-to-br from-fit-purple via-primary to-fit-purple/60 rounded-t-lg pb-2">
        <CardTitle className="text-white drop-shadow text-3xl font-bold">
          Your Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ProfileDetails />
        <div className="my-6">
          <h3 className="text-lg font-semibold mb-1">Personal Stats</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>— Modern UI, ready for custom data integration —</li>
            <li>— Stats, progress charts and badges coming soon —</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Profile;
