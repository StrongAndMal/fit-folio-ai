
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Mail, Bell, KeyRound, User, ShieldCheck, Star, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import SettingsSection from "@/components/SettingsSection";

const Settings = () => (
  <div className="flex flex-col items-center justify-center min-h-[75vh] px-2 bg-gradient-to-br from-fit-purple/5 to-white dark:from-fit-purple/70 dark:to-background/70">
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-4xl font-bold drop-shadow text-primary text-center">Settings &amp; Account</h2>
        <p className="text-muted-foreground text-center mt-1">Manage your account and preferences</p>
      </div>
      <Tabs defaultValue="account" className="rounded-xl shadow-xl bg-transparent backdrop-blur-xl p-1">
        <TabsList className="w-full flex gap-2 justify-center bg-fit-purple/10 rounded-xl mb-5 py-1">
          <TabsTrigger value="account" className="flex-1 flex items-center gap-1 px-0 text-base">
            <User className="w-4 h-4" /> Account
          </TabsTrigger>
          <TabsTrigger value="security" className="flex-1 flex items-center gap-1 px-0 text-base">
            <ShieldCheck className="w-4 h-4" /> Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1 flex items-center gap-1 px-0 text-base">
            <Bell className="w-4 h-4" /> Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <div className="grid grid-cols-1 gap-6">
            <SettingsSection icon={<Mail className="w-5 h-5" />} title="Change Email">
              <Button disabled size="sm" variant="outline" className="w-full">Change Email (Coming soon)</Button>
            </SettingsSection>
            <SettingsSection icon={<User className="w-5 h-5" />} title="Profile Settings">
              <Button disabled size="sm" variant="outline" className="w-full">Edit Profile (Coming soon)</Button>
            </SettingsSection>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid grid-cols-1 gap-6">
            <SettingsSection icon={<KeyRound className="w-5 h-5" />} title="Change Password">
              <Button disabled size="sm" variant="outline" className="w-full">Change Password (Coming soon)</Button>
            </SettingsSection>
            <SettingsSection icon={<ShieldCheck className="w-5 h-5" />} title="Two-Factor Authentication">
              <Button disabled size="sm" variant="outline" className="w-full">Enable 2FA (Coming soon)</Button>
            </SettingsSection>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="grid grid-cols-1 gap-6">
            <SettingsSection icon={<Bell className="w-5 h-5" />} title="App Notifications">
              <Button disabled size="sm" variant="outline" className="w-full">Manage Notifications (Coming soon)</Button>
            </SettingsSection>
          </div>
        </TabsContent>
      </Tabs>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <SettingsSection icon={<Star className="w-5 h-5 text-yellow-500" />} title="Achievements">
          <div className="text-sm text-muted-foreground">Track your badges, milestones, and special awards—feature coming soon!</div>
        </SettingsSection>
        <SettingsSection icon={<Info className="w-5 h-5 text-blue-400" />} title="App Info">
          <div className="text-sm text-muted-foreground">This is a modern fitness dashboard demo app. More features on the way. Thank you for testing!</div>
        </SettingsSection>
      </div>
    </div>
  </div>
);

export default Settings;
