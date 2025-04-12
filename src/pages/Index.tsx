
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Auth from './Auth';

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
    }
  }, [user, navigate]);

  // Render the Auth component directly
  return <Auth />;
};

export default Index;
