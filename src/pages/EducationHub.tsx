
import React from 'react';
import { Header } from '@/components/layout/Header';
import { SideNavigation } from '@/components/layout/SideNavigation';
import { EducationHub as EducationHubComponent } from '@/components/features/EducationHub';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const EducationHub = () => {
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
            <h1 className="text-3xl font-bold">Education Hub</h1>
            <p className="text-muted-foreground">Learn about skin health, hormones, and cycle syncing</p>
          </div>
          
          <EducationHubComponent />
        </main>
      </div>
    </div>
  );
};

export default EducationHub;
