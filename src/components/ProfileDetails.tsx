
import React from "react";
import { Pencil, Mail, Phone, User } from "lucide-react";
import EditableAvatar from "./EditableAvatar";
import AccountActions from "./AccountActions";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const ProfileDetails: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  // Mock callback for avatar edit
  const handleEditAvatar = () => {
    alert("Avatar editing is coming soon!");
  };

  return (
    <section className="flex flex-col items-center gap-2 w-full">
      <EditableAvatar src={user.profileImage} name={user.name} onEdit={handleEditAvatar} />
      <div className="mt-4 text-center flex flex-col gap-1">
        <div className="text-3xl font-bold text-gradient-primary">{user.name}</div>
        <div className="flex justify-center items-center gap-1 text-muted-foreground text-base">
          <Mail className="w-4 h-4 text-primary/80" />
          {user.email}
        </div>
        <div className="flex justify-center items-center gap-1 text-muted-foreground text-sm">
          <Phone className="w-4 h-4 text-primary/60" />
          <span className="italic text-gray-400">+1 (555) 000-0000</span> {/* Placeholder */}
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="mt-3 hover:scale-105 transition"
        aria-label="Edit profile"
        disabled
      >
        <Pencil className="w-4 h-4 mr-1" /> Edit Profile (Coming soon)
      </Button>
      <AccountActions />
    </section>
  );
};

export default ProfileDetails;
