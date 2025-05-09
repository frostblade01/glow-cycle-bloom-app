
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Calendar, 
  Camera, 
  MessageSquare, 
  ShoppingBag, 
  BookOpen, 
  Users,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { useAuth } from '@/context/AuthContext';

const AboutClove = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    // Update document title to CLOVE
    document.title = "About CLOVE";
    
    // Redirect if already authenticated
    if (user) {
      if (!user.isOnboarded) {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const features = [
    {
      title: "Cycle Predictor",
      description: "Track and predict your menstrual cycle with precision, helping you plan ahead and understand your body better.",
      icon: Calendar
    },
    {
      title: "Skin Scanner",
      description: "Analyze your skin condition in real-time and receive personalized skincare recommendations based on your cycle phase.",
      icon: Camera
    },
    {
      title: "GlowBot",
      description: "Your AI skincare assistant that answers questions and provides guidance tailored to your unique skin needs.",
      icon: MessageSquare
    },
    {
      title: "Beauty Recommender",
      description: "Discover skincare products specifically recommended for your current cycle phase and skin concerns.",
      icon: ShoppingBag
    },
    {
      title: "Education Hub",
      description: "Access a wealth of educational resources about hormonal health, skincare, and the connection between them.",
      icon: BookOpen
    },
    {
      title: "Community",
      description: "Connect with others on similar journeys, share experiences, and learn from a supportive community.",
      icon: Users
    }
  ];

  const faqs = [
    {
      question: "How does CLOVE know which skincare products to recommend?",
      answer: "CLOVE analyzes your menstrual cycle phase, skin concerns, and unique needs to recommend products that are most suitable for your current hormonal state. Our recommendations are based on products highly recommended by senior dermatologists and scientific research on hormonal impacts on skin."
    },
    {
      question: "Is my data private and secure?",
      answer: "Absolutely. At CLOVE, we prioritize your privacy and data security. All your personal information and cycle data are encrypted and securely stored. We never share your data with third parties without your explicit consent."
    },
    {
      question: "How accurate is the Cycle Predictor?",
      answer: "Our Cycle Predictor becomes more accurate over time as it learns your unique cycle patterns. While initial predictions are based on averages, the system adapts to your specific data as you continue to use it, leading to increasingly personalized and accurate predictions."
    },
    {
      question: "Can I use CLOVE if I have irregular periods?",
      answer: "Yes! CLOVE is designed to work for all cycle patterns, including irregular ones. The more data you input, the better the system becomes at understanding your unique cycle patterns and making appropriate predictions and recommendations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-glow-pink-50 to-glow-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-gradient-to-br from-glow-pink-300 to-glow-purple-400 rounded-full flex items-center justify-center">
            <Heart className="h-10 w-10 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-glow-pink-500 to-glow-purple-500 bg-clip-text text-transparent">
          CLOVE
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
          Sync your skincare with your cycle for transformative results
        </p>
        <Button onClick={handleGetStarted} size="lg" className="gap-2">
          Get Started
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Mission Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg mb-6 text-muted-foreground">
              At CLOVE, we believe in the profound connection between hormonal cycles and skin health. 
              Our mission is to empower individuals to understand this relationship and optimize their 
              skincare routines accordingly.
            </p>
            <p className="text-lg text-muted-foreground">
              We combine cutting-edge technology with scientific research to provide personalized 
              skincare recommendations that adapt to your body's natural rhythms, helping you achieve 
              your best skin at every phase of your cycle.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="mb-4 h-12 w-12 bg-gradient-to-br from-glow-pink-200 to-glow-purple-300 rounded-md flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to transform your skincare journey?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
          Join CLOVE today and discover skincare that works in harmony with your body's natural cycles.
        </p>
        <Button onClick={handleGetStarted} size="lg" className="gap-2">
          Get Started
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} CLOVE. All rights reserved.
      </footer>
    </div>
  );
};

export default AboutClove;
