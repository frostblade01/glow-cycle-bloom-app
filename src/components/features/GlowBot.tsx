
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Bot, User, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useCycle, CyclePhase } from '@/context/CycleContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type MessageType = 'user' | 'bot';

interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
}

export const GlowBot: React.FC = () => {
  const { currentPhase } = useCycle();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm GlowBot, your skin and cycle assistant. How can I help you today?",
      type: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Array of suggested questions
  const suggestedQuestions = [
    "Why am I breaking out right now?",
    "What products should I use during my luteal phase?",
    "How can I reduce hormonal acne?",
    "Is my skincare routine right for my current cycle phase?",
  ];
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (content: string = inputValue) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessageId = Date.now().toString();
    const userMessage: Message = {
      id: userMessageId,
      content,
      type: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate bot response based on the question
    setTimeout(() => {
      let botResponse = "";
      
      // Simple pattern matching for responses based on current cycle phase
      const contentLower = content.toLowerCase();
      
      if (contentLower.includes('breaking out') || contentLower.includes('acne')) {
        if (currentPhase === CyclePhase.LUTEAL) {
          botResponse = "You're currently in your luteal phase, when progesterone rises. This can increase oil production and lead to clogged pores. I recommend using products with salicylic acid to prevent breakouts, and keeping your routine gentle to avoid irritation.";
        } else if (currentPhase === CyclePhase.MENSTRUATION) {
          botResponse = "During menstruation, inflammation can trigger breakouts. Focus on calming ingredients like centella asiatica and avoid harsh treatments. Hydration is key!";
        } else {
          botResponse = "You're in a phase where breakouts are less common. If you're experiencing acne, it might be related to stress, diet, or product buildup. Try a clay mask once a week and make sure you're cleansing properly.";
        }
      } else if (contentLower.includes('product') || contentLower.includes('routine')) {
        if (currentPhase === CyclePhase.FOLLICULAR) {
          botResponse = "The follicular phase is great for incorporating actives like vitamin C and gentle exfoliation. Your skin barrier is stronger now, so you can focus on brightening and renewal.";
        } else if (currentPhase === CyclePhase.OVULATION) {
          botResponse = "During ovulation, your skin is typically at its best! Focus on hydration, antioxidant protection, and SPF. This is a good time to schedule any special events as your skin is glowing naturally.";
        } else if (currentPhase === CyclePhase.LUTEAL) {
          botResponse = "In the luteal phase, prepare for potential breakouts with oil-controlling products. Use salicylic acid, avoid heavy moisturizers, and consider a zinc supplement which can help with hormonal acne.";
        } else {
          botResponse = "During menstruation, your skin may be more sensitive. Stick to gentle, hydrating products and avoid any harsh actives or exfoliants. Focus on comfort and basic hydration.";
        }
      } else if (contentLower.includes('hormonal')) {
        botResponse = "Hormonal acne is typically caused by fluctuations in estrogen and progesterone. It often appears around the jawline and chin. Beyond skincare, consider stress management, adequate sleep, and anti-inflammatory foods. Some find supplements like evening primrose oil or spearmint tea helpful.";
      } else {
        botResponse = "I'm here to help with your skin concerns throughout your cycle! Could you provide more details about your specific question so I can give you tailored advice?";
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        type: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  return (
    <Card className="flex flex-col h-[calc(100vh-12rem)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-glow-purple-400" />
          GlowBot Skin Coach
        </CardTitle>
        <CardDescription>
          Your AI skin and confidence companion
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3",
                message.type === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.type === 'bot' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-glow-purple-100 text-glow-purple-700">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={cn(
                  "rounded-lg px-4 py-2 max-w-[80%]",
                  message.type === 'user'
                    ? 'bg-glow-purple-500 text-white'
                    : 'bg-muted'
                )}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              
              {message.type === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-glow-pink-100 text-glow-pink-700">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-glow-purple-100 text-glow-purple-700">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="rounded-lg px-4 py-2 bg-muted">
                <RefreshCw className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      {/* Suggested questions */}
      {messages.length <= 2 && (
        <div className="px-6 pb-3">
          <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm" 
                className="text-xs h-auto py-1.5"
                onClick={() => handleSendMessage(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <CardFooter className="pt-3">
        <div className="flex w-full gap-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            className="flex-1"
          />
          <Button 
            size="icon" 
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            className="flex-shrink-0"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
