
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Update the document title to CLOVE
    document.title = "CLOVE";
    
    if (user) {
      if (!user.isOnboarded) {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    } else {
      // Redirect to the About page if not authenticated
      navigate('/about');
    }
  }, [user, navigate]);

  // Return null as this is just a redirector
  return null;
};

export default Index;
