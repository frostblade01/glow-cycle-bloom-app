
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Calendar, Camera, Heart, MessageSquare, ShoppingBag, 
  BookOpen, Users, Home
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon: Icon, 
  label, 
  to, 
  active = false 
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        active 
          ? "bg-glow-purple-100 text-glow-purple-700 font-semibold" 
          : "text-muted-foreground hover:bg-glow-purple-50 hover:text-glow-purple-600"
      )}
    >
      <Icon className={cn("h-5 w-5", active ? "text-glow-purple-500" : "text-muted-foreground")} />
      <span>{label}</span>
    </Link>
  );
};

export const SideNavigation: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  const navigationItems = [
    { icon: Home, label: 'Dashboard', to: '/dashboard' },
    { icon: Calendar, label: 'Cycle Predictor', to: '/cycle-predictor' },
    { icon: Camera, label: 'Skin Scanner', to: '/skin-scanner' },
    { icon: MessageSquare, label: 'GlowBot', to: '/glowbot' },
    { icon: ShoppingBag, label: 'Beauty Recommender', to: '/beauty-recommender' },
    { icon: BookOpen, label: 'Education Hub', to: '/education-hub' },
    { icon: Users, label: 'Community', to: '/community' },
  ];

  // Don't show nav if user is not authenticated
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="h-screen flex-col border-r bg-sidebar px-3 py-4 fixed left-0 top-0 w-64 hidden md:flex">
      <div className="flex h-16 items-center px-2">
        <Link to="/dashboard" className="flex items-center gap-2 font-bold text-xl">
          <Heart className="h-6 w-6 fill-glow-pink-300 text-glow-pink-300" />
          <span className="bg-gradient-to-r from-glow-pink-400 to-glow-purple-400 bg-clip-text text-transparent">
            CLOVE
          </span>
        </Link>
      </div>
      
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">Navigation</h2>
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <NavItem
                key={item.to}
                icon={item.icon}
                label={item.label}
                to={item.to}
                active={location.pathname === item.to}
              />
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div className="px-4 py-2">
          <div className="bg-gradient-to-r from-glow-pink-100 to-glow-purple-100 p-3 rounded-md">
            <h3 className="font-medium text-sm text-glow-purple-700">Skin Alert</h3>
            <p className="text-xs text-glow-purple-600 mt-1">Upcoming luteal phase may trigger breakouts. Start using your gentle cleanser now.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
