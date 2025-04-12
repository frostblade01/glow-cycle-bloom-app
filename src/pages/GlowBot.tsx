
import React from 'react';
import { Header } from '@/components/layout/Header';
import { SideNavigation } from '@/components/layout/SideNavigation';
import { GlowBot as GlowBotComponent } from '@/components/features/GlowBot';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Info } from 'lucide-react';

const GlowBot = () => {
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
            <h1 className="text-3xl font-bold">GlowBot</h1>
            <p className="text-muted-foreground">Your AI skin & confidence coach</p>
          </div>
          
          <Card className="mb-6 bg-gradient-to-r from-glow-pink-50 to-glow-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                About GlowBot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                GlowBot is your personal AI assistant for all things related to skincare, cycles, and confidence.
                Ask about your current cycle phase, get product recommendations, or seek advice for specific skin concerns.
              </p>
            </CardContent>
          </Card>
          
          <GlowBotComponent />
        </main>
      </div>
    </div>
  );
};

export default GlowBot;
