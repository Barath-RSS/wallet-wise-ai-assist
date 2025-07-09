
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Mic, MicOff, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface GeminiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const GeminiChatbot: React.FC<GeminiChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI financial assistant powered by Gemini. How can I help you manage your finances today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response (replace with actual Gemini API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('budget') || input.includes('spending')) {
      return "I can help you analyze your spending patterns and create a personalized budget. Based on your transaction history, I notice you spend most on dining and entertainment. Would you like me to suggest some budget optimizations?";
    } else if (input.includes('save') || input.includes('saving')) {
      return "Great question about savings! I recommend the 50/30/20 rule: 50% needs, 30% wants, 20% savings. Based on your current spending, you could potentially save an additional $200 per month by optimizing your subscription services.";
    } else if (input.includes('receipt') || input.includes('scan')) {
      return "I can help you process receipts! Simply upload a photo of your receipt, and I'll extract all the important information including amount, merchant, category, and date. This helps keep your expense tracking accurate and automated.";
    } else if (input.includes('hello') || input.includes('hi')) {
      return "Hello! I'm here to help you with all your financial questions. I can assist with budgeting, expense tracking, savings goals, receipt processing, and financial insights. What would you like to know?";
    } else {
      return "I understand you're asking about financial management. I'm here to help with budgeting, expense tracking, savings goals, and financial insights. Could you tell me more specifically what you'd like assistance with?";
    }
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here with Web Speech API
    if (!isListening) {
      // Start voice recognition
      console.log('Starting voice recognition...');
    } else {
      // Stop voice recognition
      console.log('Stopping voice recognition...');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[80vh] glass-card backdrop-blur-xl border border-white/20 rounded-2xl flex flex-col animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center animate-glow">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Gemini AI Assistant</h3>
              <p className="text-white/60 text-sm">Financial Intelligence</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.isUser ? 'flex-row-reverse space-x-reverse' : ''
              } animate-fade-in`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.isUser 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-600'
              }`}>
                {message.isUser ? 
                  <User className="w-4 h-4 text-white" /> : 
                  <Bot className="w-4 h-4 text-white" />
                }
              </div>
              <div className={`max-w-[70%] p-3 rounded-2xl ${
                message.isUser
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-white/10 backdrop-blur-xl border border-white/20 text-white'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-3 animate-fade-in">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white p-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-white/10">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about your finances..."
                className="bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/60 pr-12"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleVoiceToggle}
                className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 ${
                  isListening ? 'text-red-400 animate-pulse' : 'text-white/60 hover:text-white'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-white/40 text-xs mt-2 text-center">
            This is a demo. Backend integration with Gemini AI will be implemented later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeminiChatbot;
