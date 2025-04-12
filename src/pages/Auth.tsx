
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Heart } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Redirect if already authenticated
  React.useEffect(() => {
    if (user) {
      if (!user.isOnboarded) {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  
  const handleAuthSuccess = () => {
    // Check if user needs onboarding
    if (user?.isOnboarded) {
      navigate('/dashboard');
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-r from-glow-pink-50 to-glow-purple-50">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-gradient-to-br from-glow-pink-300 to-glow-purple-400 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-glow-pink-500 to-glow-purple-500 bg-clip-text text-transparent">
              GlowCycle
            </h1>
            <p className="text-muted-foreground mt-2">Sync your skincare with your cycle</p>
          </div>
          
          <Card className="shadow-xl">
            <CardContent className="pt-6">
              {isLogin ? (
                <LoginForm 
                  onSuccess={handleAuthSuccess} 
                  onToggleForm={toggleForm} 
                />
              ) : (
                <SignupForm 
                  onSuccess={handleAuthSuccess} 
                  onToggleForm={toggleForm} 
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <footer className="py-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} GlowCycle. All rights reserved.
      </footer>
    </div>
  );
};

export default Auth;
