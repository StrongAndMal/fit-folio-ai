import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        navigate("/app/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-pulse">Loading...</div>
    </div>
  );
};

export default Index;
