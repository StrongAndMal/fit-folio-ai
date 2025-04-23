
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

type EditableAvatarProps = {
  src?: string;
  name?: string;
  onEdit?: () => void;
};

const getInitials = (name?: string) => {
  if (!name) return "U";
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "U";
  return (
    (parts[0][0]?.toUpperCase() ?? "") +
    (parts[1][0]?.toUpperCase() ?? "")
  );
};

const EditableAvatar: React.FC<EditableAvatarProps> = ({ src, name, onEdit }) => (
  <div className="relative group cursor-pointer transition-transform hover:scale-105">
    <Avatar className="w-24 h-24 ring-4 ring-primary shadow-lg">
      <AvatarImage src={src} alt={name} />
      <AvatarFallback className="text-2xl bg-fit-purple/70 text-white">{getInitials(name)}</AvatarFallback>
    </Avatar>
    <button
      type="button"
      tabIndex={0}
      aria-label="Edit profile picture"
      onClick={onEdit}
      className="absolute flex items-center justify-center bg-black/70 rounded-full bottom-2 right-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <Camera className="w-5 h-5 text-white" />
    </button>
  </div>
);

export default EditableAvatar;
