
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Bell, KeyRound, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Settings = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] px-2">
    <Card className="w-full max-w-lg mx-auto glass-morphism card-gradient shadow-xl animate-fade-in">
      <CardHeader className="rounded-t-lg bg-gradient-to-br from-fit-purple via-primary to-fit-purple/50 pb-2">
        <CardTitle className="text-white drop-shadow text-3xl font-bold">
          Settings & Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="account" className="">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="account" className="flex-1 flex items-center gap-1">
              <User className="w-4 h-4" /> Account
            </TabsTrigger>
            <TabsTrigger value="security" className="flex-1 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1 flex items-center gap-1">
              <Bell className="w-4 h-4" /> Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <div className="space-y-5">
              <div>
                <div className="font-medium mb-1">Change Email</div>
                <Button disabled size="sm" variant="outline" className="w-full"><User className="w-4 h-4 mr-1" />Change Email (Coming soon)</Button>
              </div>
              <div>
                <div className="font-medium mb-1">Profile Settings</div>
                <Button disabled size="sm" variant="outline" className="w-full"><User className="w-4 h-4 mr-1" />Edit Profile (Coming soon)</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-5">
              <div>
                <div className="font-medium mb-1">Change Password</div>
                <Button disabled size="sm" variant="outline" className="w-full"><KeyRound className="w-4 h-4 mr-1" />Change Password (Coming soon)</Button>
              </div>
              <div>
                <div className="font-medium mb-1">Two-Factor Auth</div>
                <Button disabled size="sm" variant="outline" className="w-full"><ShieldCheck className="w-4 h-4 mr-1" />Enable 2FA (Coming soon)</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="space-y-5">
              <div>
                <div className="font-medium mb-1">App Notifications</div>
                <Button disabled size="sm" variant="outline" className="w-full"><Bell className="w-4 h-4 mr-1" />Manage Notifications (Coming soon)</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </div>
);

export default Settings;
