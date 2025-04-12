
import React from 'react';
import { Header } from '@/components/layout/Header';
import { SideNavigation } from '@/components/layout/SideNavigation';
import { CycleTracker } from '@/components/dashboard/CycleTracker';
import { CyclePhaseInfo } from '@/components/dashboard/CyclePhaseInfo';
import { SkinRecommendations } from '@/components/dashboard/SkinRecommendations';
import { UpcomingEvents } from '@/components/dashboard/UpcomingEvents';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  React.useEffect(() => {
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
            <h1 className="text-3xl font-bold">Welcome, {user?.name.split(' ')[0] || 'there'}!</h1>
            <p className="text-muted-foreground">Here's your personalized skin and cycle dashboard</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <CycleTracker />
            <CyclePhaseInfo />
          </div>
          
          <div className="bg-gradient-to-r from-glow-pink-50 to-glow-purple-50 p-6 rounded-lg mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-glow-purple-400" />
              <h2 className="text-xl font-bold">Upcoming Events & Reminders</h2>
            </div>
            <UpcomingEvents />
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Recommended Products</h2>
            <SkinRecommendations />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
