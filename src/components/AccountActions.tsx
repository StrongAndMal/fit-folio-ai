
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const AccountActions: React.FC = () => {
  const { logout } = useAuth();
  return (
    <div className="flex justify-center gap-3 mt-4">
      <Button
        variant="destructive"
        size="sm"
        onClick={logout}
        className="hover:scale-105 transition"
        aria-label="Log out"
      >
        <LogOut className="w-4 h-4 mr-1" /> Logout
      </Button>
    </div>
  );
};

export default AccountActions;
