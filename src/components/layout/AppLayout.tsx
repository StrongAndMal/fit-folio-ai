import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Dumbbell, Home, User, LineChart, Menu, Library, Plus, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AppLayout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center px-4">
          <div className="flex items-center space-x-2">
            <Dumbbell className="h-6 w-6 text-fit-purple" />
            <span className="font-bold text-xl">FitFolio AI</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <div className="pt-6">
                      <div className="flex flex-col space-y-6">
                        <div className="flex items-center gap-3">
                          <img 
                            src={user?.profileImage || 'https://images.unsplash.com/photo-1500673922987-e212871fec22'} 
                            alt="Profile" 
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-medium">{user?.name}</h3>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                          </div>
                        </div>
                        <nav className="flex flex-col space-y-1">
                          <Button 
                            variant={isActive('/dashboard') ? "secondary" : "ghost"} 
                            className="justify-start"
                            onClick={() => navigate('/dashboard')}
                          >
                            <Home className="mr-2 h-4 w-4" />
                            Dashboard
                          </Button>
                          <Button 
                            variant={isActive('/workout-library') ? "secondary" : "ghost"} 
                            className="justify-start"
                            onClick={() => navigate('/workout-library')}
                          >
                            <Library className="mr-2 h-4 w-4" />
                            Workout Library
                          </Button>
                          <Button 
                            variant={isActive('/workouts') ? "secondary" : "ghost"} 
                            className="justify-start"
                            onClick={() => navigate('/workouts')}
                          >
                            <Dumbbell className="mr-2 h-4 w-4" />
                            My Workouts
                          </Button>
                          <Button 
                            variant={isActive('/progress') ? "secondary" : "ghost"} 
                            className="justify-start"
                            onClick={() => navigate('/progress')}
                          >
                            <LineChart className="mr-2 h-4 w-4" />
                            Progress
                          </Button>
                          <Button
                            variant={location.pathname === '/create-workout' ? 'default' : 'ghost'}
                            className="w-full justify-start"
                            onClick={() => navigate('/create-workout')}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Create Workout
                          </Button>
                          <Button 
                            variant={isActive('/profile') ? "secondary" : "ghost"} 
                            className="justify-start"
                            onClick={() => navigate('/profile')}
                          >
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </Button>
                        </nav>
                        <Button onClick={logout} variant="outline" className="mt-auto">
                          Logout
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <img 
                        src={user?.profileImage || 'https://images.unsplash.com/photo-1500673922987-e212871fec22'} 
                        alt="Profile" 
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <Settings className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button onClick={() => navigate('/login')}>Sign In</Button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile bottom navigation */}
      {isAuthenticated && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
          <nav className="flex justify-around">
            <Button 
              variant="ghost" 
              className={`flex-1 flex-col py-2 ${isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground'}`}
              onClick={() => navigate('/dashboard')}
            >
              <Home className="h-5 w-5 mb-1" />
              <span className="text-xs">Home</span>
            </Button>
            <Button 
              variant="ghost" 
              className={`flex-1 flex-col py-2 ${isActive('/workout-library') ? 'text-primary' : 'text-muted-foreground'}`}
              onClick={() => navigate('/workout-library')}
            >
              <Library className="h-5 w-5 mb-1" />
              <span className="text-xs">Workout Library</span>
            </Button>
            <Button 
              variant="ghost" 
              className={`flex-1 flex-col py-2 ${isActive('/workouts') ? 'text-primary' : 'text-muted-foreground'}`}
              onClick={() => navigate('/workouts')}
            >
              <Dumbbell className="h-5 w-5 mb-1" />
              <span className="text-xs">My Workouts</span>
            </Button>
            <Button 
              variant="ghost" 
              className={`flex-1 flex-col py-2 ${isActive('/progress') ? 'text-primary' : 'text-muted-foreground'}`}
              onClick={() => navigate('/progress')}
            >
              <LineChart className="h-5 w-5 mb-1" />
              <span className="text-xs">Progress</span>
            </Button>
            <Button 
              variant="ghost" 
              className={`flex-1 flex-col py-2 ${isActive('/profile') ? 'text-primary' : 'text-muted-foreground'}`}
              onClick={() => navigate('/profile')}
            >
              <User className="h-5 w-5 mb-1" />
              <span className="text-xs">Profile</span>
            </Button>
          </nav>
        </div>
      )}

      {/* Desktop sidebar - only shown on medium screens and up */}
      {isAuthenticated && (
        <div className="hidden md:flex">
          <aside className="fixed bottom-0 left-0 top-14 w-64 border-r bg-background">
            <div className="flex flex-col h-full p-4">
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src={user?.profileImage || 'https://images.unsplash.com/photo-1500673922987-e212871fec22'} 
                  alt="Profile" 
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{user?.name}</h3>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <nav className="flex flex-col space-y-1">
                <Button 
                  variant={isActive('/dashboard') ? "secondary" : "ghost"} 
                  className="justify-start"
                  onClick={() => navigate('/dashboard')}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button 
                  variant={isActive('/workout-library') ? "secondary" : "ghost"} 
                  className="justify-start"
                  onClick={() => navigate('/workout-library')}
                >
                  <Library className="mr-2 h-4 w-4" />
                  Workout Library
                </Button>
                <Button 
                  variant={isActive('/workouts') ? "secondary" : "ghost"} 
                  className="justify-start"
                  onClick={() => navigate('/workouts')}
                >
                  <Dumbbell className="mr-2 h-4 w-4" />
                  My Workouts
                </Button>
                <Button 
                  variant={isActive('/progress') ? "secondary" : "ghost"} 
                  className="justify-start"
                  onClick={() => navigate('/progress')}
                >
                  <LineChart className="mr-2 h-4 w-4" />
                  Progress
                </Button>
                <Button
                  variant={location.pathname === '/create-workout' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => navigate('/create-workout')}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Workout
                </Button>
                <Button 
                  variant={isActive('/profile') ? "secondary" : "ghost"} 
                  className="justify-start"
                  onClick={() => navigate('/profile')}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </nav>
              <Button onClick={logout} variant="outline" className="mt-auto">
                Logout
              </Button>
            </div>
          </aside>
          <div className="ml-64 flex-1">
            {/* This creates space for the fixed sidebar */}
          </div>
        </div>
      )}
      
      {/* Main content */}
      <main className={`flex-1 pb-16 md:pb-0 ${isAuthenticated ? 'md:ml-64' : ''}`}>
        <div className="container px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
