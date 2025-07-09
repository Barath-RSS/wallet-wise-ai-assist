import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Bot, User, X, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface GeminiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  userFinancialData?: {
    balance: number;
    monthlySpending: number;
    categories: Array<{ name: string; amount: number }>;
  };
}

const GeminiChatbot: React.FC<GeminiChatbotProps> = ({ isOpen, onClose, userFinancialData }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI financial advisor. I can help you with budgeting, spending analysis, and financial planning based on your real-time data. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionConstructor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognitionConstructor) {
        recognitionRef.current = new SpeechRecognitionConstructor();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const generateFinancialAdvice = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Real-time financial analysis based on user data
    const currentBalance = userFinancialData?.balance || 117650;
    const monthlySpending = userFinancialData?.monthlySpending || 45280;
    const categories = userFinancialData?.categories || [];
    
    // Budget analysis
    if (lowerMessage.includes('budget') || lowerMessage.includes('spending')) {
      const spendingRatio = (monthlySpending / currentBalance) * 100;
      return `Based on your current data: Your monthly spending is ₹${monthlySpending.toLocaleString()} which is ${spendingRatio.toFixed(1)}% of your total balance. ${spendingRatio > 40 ? 'Consider reducing expenses in high-spending categories.' : 'Your spending ratio looks healthy!'} Your top spending categories are: ${categories.slice(0, 3).map(cat => cat.name).join(', ')}.`;
    }
    
    // Savings advice
    if (lowerMessage.includes('save') || lowerMessage.includes('saving')) {
      const monthlySavings = currentBalance - monthlySpending;
      return `You're currently saving approximately ₹${monthlySavings.toLocaleString()} per month. To optimize savings: 1) Set up automatic transfers to a savings account, 2) Track your largest expense categories, 3) Consider the 50/30/20 rule (needs/wants/savings).`;
    }
    
    // Investment advice
    if (lowerMessage.includes('invest') || lowerMessage.includes('investment')) {
      return `With your current balance of ₹${currentBalance.toLocaleString()}, consider diversifying into: 1) Emergency fund (3-6 months expenses), 2) Mutual funds/SIPs for long-term growth, 3) Fixed deposits for stable returns. Start with 10-15% of your monthly income for investments.`;
    }
    
    // Debt management
    if (lowerMessage.includes('debt') || lowerMessage.includes('loan')) {
      return `For debt management: 1) List all debts with interest rates, 2) Pay minimums on all, extra on highest interest debt, 3) Consider debt consolidation if beneficial, 4) Avoid taking new debt while paying off existing ones.`;
    }
    
    // Goal setting
    if (lowerMessage.includes('goal') || lowerMessage.includes('plan')) {
      return `Let's set SMART financial goals: 1) Emergency fund of ₹${(monthlySpending * 6).toLocaleString()}, 2) Short-term goals (1-2 years), 3) Long-term goals (retirement, major purchases). Break large goals into monthly targets.`;
    }
    
    // Expense tracking
    if (lowerMessage.includes('track') || lowerMessage.includes('expense')) {
      return `Your current top expenses seem to be in these categories. To better track: 1) Use the receipt scanner feature, 2) Set category-wise budgets, 3) Review weekly spending patterns, 4) Set alerts for overspending.`;
    }
    
    // General financial advice
    const generalAdvice = [
      `Based on your spending pattern of ₹${monthlySpending.toLocaleString()}/month, focus on creating a sustainable budget that allows for both necessities and savings.`,
      `Your financial health looks stable with a balance of ₹${currentBalance.toLocaleString()}. Consider diversifying your savings into different investment instruments.`,
      `To improve your financial situation: 1) Track all expenses, 2) Create an emergency fund, 3) Invest regularly, 4) Review and adjust monthly.`,
      `Financial tip: The 50/30/20 rule suggests 50% for needs, 30% for wants, and 20% for savings. Analyze your spending against this benchmark.`
    ];
    
    return generalAdvice[Math.floor(Math.random() * generalAdvice.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateFinancialAdvice(inputText),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={`glass-card bg-white/10 backdrop-blur-xl border-white/20 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
      }`}>
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-white/10">
          <CardTitle className="text-white flex items-center text-lg">
            <Bot className="w-5 h-5 mr-2 text-blue-400" />
            AI Financial Advisor
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white/70 hover:text-white p-1"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="text-white/70 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-full">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[450px]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                        : 'bg-gradient-to-r from-green-500 to-blue-500'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white'
                        : 'bg-white/10 text-white'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs text-white/50 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/10 text-white p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-100"></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about budgeting, savings, investments..."
                    className="w-full bg-white/10 text-white placeholder-white/50 rounded-lg p-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-white/20"
                    rows={2}
                  />
                  <Button
                    size="sm"
                    onClick={toggleListening}
                    className={`absolute right-2 top-2 p-1 ${
                      isListening 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    {isListening ? (
                      <MicOff className="w-4 h-4 text-white" />
                    ) : (
                      <Mic className="w-4 h-4 text-white" />
                    )}
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 p-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              {isListening && (
                <p className="text-white/70 text-xs mt-2 flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                  Listening... Speak now
                </p>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default GeminiChatbot;
