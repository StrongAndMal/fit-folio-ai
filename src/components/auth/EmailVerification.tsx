import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { sendVerificationEmail } from '@/services/auth';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Loader2, Mail } from 'lucide-react';
import { User } from 'firebase/auth';

export const EmailVerification = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResendVerification = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      await sendVerificationEmail(user as User);
      setSent(true);
      toast.success('Verification email sent! Check your inbox.');
    } catch (error) {
      toast.error('Failed to send verification email. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || (user as User).emailVerified) return null;

  return (
    <Card className="w-full max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Verify Your Email
        </CardTitle>
        <CardDescription>
          Please verify your email address to access all features.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We've sent a verification email to {user.email}. Click the link in the email to verify your account.
          </p>
          <Button
            onClick={handleResendVerification}
            disabled={loading || sent}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : sent ? (
              'Email Sent!'
            ) : (
              'Resend Verification Email'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 