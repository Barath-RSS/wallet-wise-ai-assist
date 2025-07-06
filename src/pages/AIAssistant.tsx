
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Bot, User, Lightbulb, DollarSign, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your AI financial assistant. I can help you analyze your spending, find savings opportunities, create shopping lists, and answer questions about your receipts. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "How much did I spend on groceries this month?",
        "What ingredients do I need for pasta dinner?",
        "Show me my biggest expenses",
        "Create a shopping list for the week"
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { icon: DollarSign, label: 'Spending Analysis', query: 'Show me my spending breakdown for this month' },
    { icon: ShoppingCart, label: 'Shopping List', query: 'Create a shopping list based on my recent purchases' },
    { icon: Lightbulb, label: 'Savings Tips', query: 'What are some ways I can save money on groceries?' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('grocery') || message.includes('groceries')) {
      return "Based on your recent receipts, you've spent $456.78 on groceries this month. That's 12% more than last month. Your most frequent purchases are: bananas ($23.45), milk ($18.67), and bread ($15.23). Would you like me to suggest ways to reduce your grocery spending?";
    }
    
    if (message.includes('shopping list') || message.includes('ingredients')) {
      return "Based on your purchase history and dietary preferences, here's a suggested shopping list:\n\n🥬 Fresh Produce:\n- Bananas (2 lbs)\n- Spinach (1 bag)\n- Tomatoes (3 lbs)\n\n🥛 Dairy:\n- Milk (1 gallon)\n- Greek yogurt (2 containers)\n\n🍞 Pantry:\n- Whole grain bread\n- Rice (2 lbs)\n- Olive oil\n\nEstimated total: $47.80. Would you like me to create a Google Wallet pass for this list?";
    }
    
    if (message.includes('save') || message.includes('savings')) {
      return "Here are 3 personalized savings opportunities I found:\n\n💡 Switch to store brands for cleaning products - Save $12.30/month\n💡 Buy bananas at Walmart instead of Target - Save $4.50/month\n💡 Use coupons for your frequent purchases - Save $8.75/month\n\nTotal potential monthly savings: $25.55! Would you like me to set up alerts for these deals?";
    }
    
    if (message.includes('spend') || message.includes('expenses')) {
      return "Your top spending categories this month:\n\n🛒 Groceries: $456.78 (36%)\n🍽️ Restaurants: $234.56 (19%)\n🚗 Transportation: $189.32 (15%)\n🛍️ Shopping: $167.89 (13%)\n⚡ Utilities: $145.67 (12%)\n🎬 Entertainment: $98.45 (8%)\n\nTotal: $1,292.67. You're tracking well within your budget!";
    }

    if (message.includes('cook') || message.includes('recipe')) {
      return "Based on your recent grocery purchases, you have ingredients to make:\n\n🍝 Spaghetti with marinara sauce\n🥗 Greek salad with feta\n🍗 Grilled chicken with vegetables\n🥪 Tuna sandwiches\n\nYou're missing: parmesan cheese and fresh basil for the pasta. Would you like me to add these to your shopping list?";
    }
    
    return "I understand you're asking about your finances. I can help you with spending analysis, budget tracking, receipt analysis, shopping lists, and savings opportunities. Could you be more specific about what you'd like to know?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
        suggestions: inputMessage.toLowerCase().includes('grocery') 
          ? ['Show me savings opportunities', 'Create a meal plan', 'Compare store prices']
          : ['Analyze my spending patterns', 'Set a budget alert', 'Find similar deals']
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (query: string) => {
    setInputMessage(query);
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            AI Financial Assistant
          </h1>
          <p className="text-lg text-muted-foreground">
            Ask questions about your spending, get personalized insights, and create smart shopping lists
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="glass-card hover-lift cursor-pointer"
              onClick={() => handleQuickAction(action.query)}
            >
              <CardContent className="p-4 text-center">
                <action.icon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">{action.label}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chat Interface */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-blue-500" />
              <span>Chat with Raseed AI</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Messages */}
            <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-white/30 dark:bg-black/20 rounded-lg">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                      : 'bg-white/50 dark:bg-black/30 border border-white/20 dark:border-white/10'
                  }`}>
                    <div className="flex items-start space-x-2">
                      {message.type === 'assistant' && (
                        <Bot className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      )}
                      {message.type === 'user' && (
                        <User className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="whitespace-pre-line">{message.content}</p>
                        <span className="text-xs opacity-70 mt-2 block">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    
                    {message.suggestions && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs opacity-70">Suggested questions:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Badge 
                              key={index}
                              variant="secondary" 
                              className="cursor-pointer hover:bg-blue-500/20 text-xs"
                              onClick={() => setInputMessage(suggestion)}
                            >
                              {suggestion}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/50 dark:bg-black/30 border border-white/20 dark:border-white/10 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-5 h-5 text-blue-500" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about your spending, request insights, or create lists..."
                  className="pr-12 glass bg-white/50 dark:bg-black/30 border-white/20 dark:border-white/10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleVoiceToggle}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 ${
                    isListening ? 'text-red-500 animate-pulse' : 'text-muted-foreground'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI responses are simulated. In production, this would connect to Gemini AI for real financial insights.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIAssistant;
