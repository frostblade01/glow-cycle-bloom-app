
import React from 'react';
import { Header } from '@/components/layout/Header';
import { SideNavigation } from '@/components/layout/SideNavigation';
import { Community as CommunityComponent } from '@/components/features/Community';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';

const Community = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  React.useEffect(() => {
    // Update document title to CLOVE
    document.title = "CLOVE";
    
    if (!user) {
      navigate('/');
    } else if (!user.isOnboarded) {
      navigate('/onboarding');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex bg-background">
      <SideNavigation />
      
      <div className="flex-1 md:ml-64">
        <Header />
        
        <main className="container p-4 md:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Skin Confidence Community</h1>
            <p className="text-muted-foreground">Connect with others on similar skin and cycle journeys</p>
          </div>
          
          <CommunityComponent />
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Our community guidelines ensure this is a safe, supportive space for everyone.</p>
            <p>You can choose to post anonymously for sensitive topics.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Community;
