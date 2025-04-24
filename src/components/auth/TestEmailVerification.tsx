import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EmailVerification } from './EmailVerification';
import { toast } from 'sonner';
import { createContext } from 'react';

// Create a mock context with the same shape as the real AuthContext
interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const MockAuthContext = createContext<AuthContextType | undefined>(undefined);

export const TestEmailVerification = () => {
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [showComponent, setShowComponent] = useState(true);

  // Mock user data
  const mockUser: User = {
    id: 'test-user-id',
    name: 'Test User',
    email: 'test@example.com',
    profileImage: undefined,
  };

  // Mock AuthContext value
  const mockAuthValue: AuthContextType = {
    user: mockUser,
    loading: false,
    isAuthenticated: true,
    login: async () => {},
    signup: async () => {},
    logout: () => {},
  };

  const toggleVerificationStatus = () => {
    setIsUserVerified(!isUserVerified);
  };

  const toggleComponent = () => {
    setShowComponent(!showComponent);
  };

  const testToast = () => {
    toast.success('This is a test success toast!');
    setTimeout(() => {
      toast.error('This is a test error toast!');
    }, 1000);
  };

  return (
    <div className="p-8 space-y-8">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-2xl font-bold">Email Verification Test Controls</h2>
          
          <div className="space-y-2">
            <p>Current Status: {isUserVerified ? 'Verified' : 'Not Verified'}</p>
            <p>Component Visibility: {showComponent ? 'Visible' : 'Hidden'}</p>
            <p className="text-sm text-muted-foreground">Test Email: {mockUser.email}</p>
          </div>

          <div className="space-x-4">
            <Button onClick={toggleVerificationStatus}>
              Toggle Verification Status
            </Button>
            
            <Button onClick={toggleComponent} variant="outline">
              Toggle Component Visibility
            </Button>

            <Button onClick={testToast} variant="secondary">
              Test Toast Notifications
            </Button>
          </div>
        </CardContent>
      </Card>

      {showComponent && (
        <MockAuthContext.Provider value={mockAuthValue}>
          <div className="mock-auth-context" style={{ opacity: isUserVerified ? 0.5 : 1 }}>
            <EmailVerification />
            {isUserVerified && (
              <p className="text-center text-muted-foreground mt-4">
                (Component would normally be hidden when verified)
              </p>
            )}
          </div>
        </MockAuthContext.Provider>
      )}
    </div>
  );
} 