import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AppLayout from "./components/layout/AppLayout";
import { useState } from "react";

// Pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Workouts from "./pages/Workouts";
import { WorkoutDetail } from "./pages/WorkoutDetail";
import WorkoutLibrary from "./pages/WorkoutLibrary";
import Progress from "./pages/Progress";
import ProgressEntryNew from "./pages/ProgressEntryNew";
import ProgressEntryDetail from "./pages/ProgressEntryDetail";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding";
import Settings from "./pages/Settings";
import TeamScore from "./pages/TeamScore";
import ForgotPassword from "./pages/ForgotPassword";
import { TestEmailVerification } from "./components/auth/TestEmailVerification";
import CreateWorkout from './pages/CreateWorkout';
import ProgressJournal from './pages/ProgressJournal';
import Upload from './pages/Upload';
import Subscription from './pages/Subscription';
import SubscriptionSuccess from './pages/SubscriptionSuccess';
import SubscriptionCancel from './pages/SubscriptionCancel';
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public route wrapper (redirects to dashboard if already logged in)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  return isAuthenticated ? <Navigate to="/app/dashboard" replace /> : <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
    <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
    <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
    <Route path="/onboarding" element={<PublicRoute><Onboarding /></PublicRoute>} />
    <Route path="/test-email-verification" element={<TestEmailVerification />} />
    <Route path="/subscription/success" element={<SubscriptionSuccess />} />
    <Route path="/subscription/cancel" element={<SubscriptionCancel />} />

    {/* Protected routes */}
    <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
      <Route index element={<Navigate to="/app/dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="workout-library" element={<WorkoutLibrary />} />
      <Route path="workouts" element={<Workouts />} />
      <Route path="workouts/:id" element={<WorkoutDetail />} />
      <Route path="progress" element={<Progress />} />
      <Route path="progress/new" element={<ProgressEntryNew />} />
      <Route path="progress/:entryId" element={<ProgressEntryDetail />} />
      <Route path="progress-journal" element={<ProgressJournal />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
      <Route path="team-score" element={<TeamScore />} />
      <Route path="create-workout" element={<CreateWorkout />} />
      <Route path="upload" element={<Upload />} />
      <Route path="subscription" element={<Subscription />} />
    </Route>
    
    {/* Fallback route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
