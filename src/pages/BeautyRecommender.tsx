
import React from 'react';
import { Header } from '@/components/layout/Header';
import { SideNavigation } from '@/components/layout/SideNavigation';
import { BeautyRecommender as BeautyRecommenderComponent } from '@/components/features/BeautyRecommender';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const BeautyRecommender = () => {
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
            <h1 className="text-3xl font-bold">Beauty Recommender</h1>
            <p className="text-muted-foreground">Find skincare products tailored to your cycle phase</p>
          </div>
          
          <BeautyRecommenderComponent />
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Product recommendations are personalized based on your cycle phase and skin concerns.</p>
            <p>We never receive commissions for recommendations - our suggestions are always unbiased.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BeautyRecommender;
