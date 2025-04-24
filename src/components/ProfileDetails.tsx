import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, LogOut, Mail, CheckCircle2, AlertCircle, Phone } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import EditableAvatar from "./EditableAvatar";
import AccountActions from "./AccountActions";

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
          <Badge variant={user.emailVerified ? "default" : "destructive"} className="ml-2">
            {user.emailVerified ? (
              <>
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Verified
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3 mr-1" />
                Unverified
              </>
            )}
          </Badge>
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
