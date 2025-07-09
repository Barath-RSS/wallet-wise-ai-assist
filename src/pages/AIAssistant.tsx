
import React, { useState } from 'react';
import { Bot, User, Send, Mic, MicOff, Settings, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeminiChatbot from '@/components/GeminiChatbot';

const AIAssistant: React.FC = () => {
  const [showChatbot, setShowChatbot] = useState(true);

  const chatSuggestions = [
    {
      category: "Budget Planning",
      color: "from-blue-500 to-purple-600",
      suggestions: [
        "Help me create a monthly budget",
        "How can I reduce my expenses?",
        "What's the 50/30/20 rule?",
        "Analyze my spending patterns"
      ]
    },
    {
      category: "Investment Advice", 
      color: "from-green-500 to-blue-600",
      suggestions: [
        "Best investment options for beginners",
        "Should I invest in mutual funds?",
        "How to start a SIP?",
        "Risk assessment for my portfolio"
      ]
    },
    {
      category: "Savings Goals",
      color: "from-purple-500 to-pink-600", 
      suggestions: [
        "How much should I save monthly?",
        "Emergency fund planning",
        "Saving for a house down payment",
        "Retirement planning strategies"
      ]
    },
    {
      category: "Debt Management",
      color: "from-orange-500 to-red-600",
      suggestions: [
        "How to pay off credit card debt?",
        "Debt consolidation options",
        "EMI vs lump sum payment",
        "Credit score improvement tips"
      ]
    }
  ];

  const financialTips = [
    {
      title: "Track Every Expense",
      description: "Monitor all your spending to identify areas for improvement",
      icon: "💰",
      color: "from-blue-500/20 to-purple-500/20"
    },
    {
      title: "Automate Savings",
      description: "Set up automatic transfers to build wealth consistently", 
      icon: "🎯",
      color: "from-green-500/20 to-blue-500/20"
    },
    {
      title: "Emergency Fund First",
      description: "Build 3-6 months of expenses before investing",
      icon: "🛡️", 
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Diversify Investments",
      description: "Don't put all your money in one investment type",
      icon: "📊",
      color: "from-orange-500/20 to-red-500/20"
    }
  ];

  const aiFeatures = [
    {
      title: "Real-time Analysis",
      description: "Get instant insights based on your current financial data",
      icon: "⚡",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Voice Commands", 
      description: "Ask questions using voice input for hands-free interaction",
      icon: "🎤",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Personalized Advice",
      description: "Receive customized recommendations based on your spending patterns",
      icon: "🎯",
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "24/7 Availability",
      description: "Get financial guidance whenever you need it",
      icon: "🌙",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-glow">
            AI Financial Assistant
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get personalized financial advice powered by AI and real-time analytics
          </p>
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-xl mb-8">
            <TabsTrigger value="chat" className="text-white data-[state=active]:bg-blue-500/30 data-[state=active]:text-blue-200">
              AI Chat
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="text-white data-[state=active]:bg-purple-500/30 data-[state=active]:text-purple-200">
              Quick Questions
            </TabsTrigger>
            <TabsTrigger value="tips" className="text-white data-[state=active]:bg-green-500/30 data-[state=active]:text-green-200">
              Financial Tips
            </TabsTrigger>
            <TabsTrigger value="features" className="text-white data-[state=active]:bg-orange-500/30 data-[state=active]:text-orange-200">
              AI Features
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Chat Interface */}
              <div className="lg:col-span-2">
                <Card className="glass-card bg-white/5 backdrop-blur-xl border-white/10 h-[600px]">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <div className="flex items-center">
                        <Bot className="w-6 h-6 mr-2 text-blue-400" />
                        Financial AI Assistant
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-white border-white/20">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-white border-white/20">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-white border-white/20">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-center py-20">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Bot className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">AI Assistant Ready</h3>
                      <p className="text-white/70 mb-6">
                        The AI chatbot is available in the bottom-right corner. Click to start a conversation about your finances!
                      </p>
                      <Button 
                        onClick={() => setShowChatbot(true)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        Open AI Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <Card className="glass-card bg-white/5 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Your Financial Snapshot</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Total Balance</span>
                      <span className="text-white font-bold">₹1,17,650</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Monthly Spending</span>
                      <span className="text-red-400 font-bold">₹45,280</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Savings Rate</span>
                      <span className="text-green-400 font-bold">42.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Investment Value</span>
                      <span className="text-blue-400 font-bold">₹85,430</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card bg-white/5 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">AI Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                        <p className="text-green-300 text-sm">
                          ✅ Your savings rate is above average!
                        </p>
                      </div>
                      <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                        <p className="text-yellow-300 text-sm">
                          ⚠️ Food expenses increased by 15% this month
                        </p>
                      </div>
                      <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                        <p className="text-blue-300 text-sm">
                          💡 Consider increasing your emergency fund
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {chatSuggestions.map((category, index) => (
                <Card key={index} className={`glass-card bg-white/5 backdrop-blur-xl border-white/10 hover-lift`}>
                  <CardHeader>
                    <CardTitle className={`text-white bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.suggestions.map((suggestion, suggestionIndex) => (
                        <Button
                          key={suggestionIndex}
                          variant="outline"
                          className="w-full text-left justify-start text-white border-white/20 hover:bg-white/10 text-sm"
                          onClick={() => setShowChatbot(true)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {financialTips.map((tip, index) => (
                <Card key={index} className={`glass-card bg-gradient-to-br ${tip.color} backdrop-blur-xl border-white/10 hover-lift`}>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{tip.icon}</div>
                    <h3 className="text-white font-bold text-lg mb-2">{tip.title}</h3>
                    <p className="text-white/70 text-sm">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="glass-card bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-center">Daily Financial Wisdom</CardTitle>  
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">💡</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Today's Tip</h3>
                  <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                    "The best time to plant a tree was 20 years ago. The second-best time is now. 
                    The same applies to your financial planning and investments."
                  </p>
                  <Button 
                    className="mt-6 bg-gradient-to-r from-green-500 to-blue-600"
                    onClick={() => setShowChatbot(true)}
                  >
                    Ask AI for Personalized Tips
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {aiFeatures.map((feature, index) => (
                <Card key={index} className="glass-card bg-white/5 backdrop-blur-xl border-white/10 hover-lift">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-6`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-white/70 text-lg leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="glass-card bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-center text-2xl">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                      1️⃣
                    </div>
                    <h4 className="text-white font-bold text-lg mb-2">Connect Your Data</h4>
                    <p className="text-white/70">Link your accounts for real-time financial analysis</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                      2️⃣
                    </div>
                    <h4 className="text-white font-bold text-lg mb-2">Ask Questions</h4>
                    <p className="text-white/70">Type or speak your financial questions naturally</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                      3️⃣
                    </div>
                    <h4 className="text-white font-bold text-lg mb-2">Get Smart Advice</h4>
                    <p className="text-white/70">Receive personalized recommendations and insights</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Chatbot Component */}
      <GeminiChatbot 
        isOpen={showChatbot}
        onClose={() => setShowChatbot(false)}
        userFinancialData={{
          balance: 117650,
          monthlySpending: 45280,
          categories: [
            { name: 'Food', amount: 15000 },
            { name: 'Transport', amount: 12000 },
            { name: 'Entertainment', amount: 9000 }
          ]
        }}
      />
    </div>
  );
};

export default AIAssistant;
