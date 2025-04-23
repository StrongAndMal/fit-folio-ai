
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, LogOut, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const getInitials = (name: string) => {
  if (!name) return "U";
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "U";
  return (
    (parts[0][0]?.toUpperCase() ?? "") +
    (parts[1][0]?.toUpperCase() ?? "")
  );
};

const ProfileDetails: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col items-center py-6">
      <div className="relative group">
        <Avatar className="w-20 h-20 ring-4 ring-primary shadow-lg">
          <AvatarImage src={user.profileImage} alt={user.name} />
          <AvatarFallback>
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="mt-4 text-center">
        <div className="text-2xl font-bold text-gradient-primary">{user.name}</div>
        <div className="text-base text-muted-foreground flex items-center justify-center gap-2 mt-1">
          <Mail className="w-4 h-4 text-primary/80" />
          {user.email}
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <Button variant="outline" size="sm" className="hover:scale-105 transition" aria-label="Edit profile">
          <Pencil className="w-4 h-4 mr-1" /> Edit Profile
        </Button>
        <Button variant="destructive" size="sm" onClick={logout} className="hover:scale-105 transition" aria-label="Log out">
          <LogOut className="w-4 h-4 mr-1" /> Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfileDetails;
