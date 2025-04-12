
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CycleForm } from '@/components/onboarding/CycleForm';
import { useAuth } from '@/context/AuthContext';
import { Heart } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Redirect if not authenticated
  React.useEffect(() => {
    // Update document title to CLOVE
    document.title = "CLOVE";
    
    if (!user) {
      navigate('/');
    } else if (user.isOnboarded) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleComplete = () => {
    navigate('/dashboard');
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
            <p className="text-muted-foreground mt-2">Let's set up your personalized experience</p>
          </div>
          
          <CycleForm onComplete={handleComplete} />
        </div>
      </div>
      
      <footer className="py-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} GlowCycle. All rights reserved.
      </footer>
    </div>
  );
};

export default Onboarding;
