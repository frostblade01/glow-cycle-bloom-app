
import React from 'react';
import { Header } from '@/components/layout/Header';
import { SideNavigation } from '@/components/layout/SideNavigation';
import { SkinScanner as SkinScannerComponent } from '@/components/features/SkinScanner';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Info } from 'lucide-react';

const SkinScanner = () => {
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
            <h1 className="text-3xl font-bold">AI Skin Scanner</h1>
            <p className="text-muted-foreground">Upload a selfie for personalized skin analysis</p>
          </div>
          
          <Card className="mb-6 bg-gradient-to-r from-glow-pink-50 to-glow-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                How to Take the Perfect Skin Scan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/80 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">1. Clean your face</h3>
                  <p className="text-sm text-muted-foreground">
                    Remove all makeup, skincare products, and wash your face before scanning.
                  </p>
                </div>
                <div className="bg-white/80 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">2. Find good lighting</h3>
                  <p className="text-sm text-muted-foreground">
                    Use natural, even lighting. Avoid harsh shadows or direct sunlight.
                  </p>
                </div>
                <div className="bg-white/80 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">3. Position correctly</h3>
                  <p className="text-sm text-muted-foreground">
                    Take a front-facing photo with your full face clearly visible.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <SkinScannerComponent />
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Your skin scans are not stored on our servers unless you explicitly save them.</p>
            <p>Analysis is performed locally on your device for privacy.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SkinScanner;
