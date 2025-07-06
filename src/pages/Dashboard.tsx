
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Receipt, BarChart3, MessageSquare, Wallet, Upload, TrendingUp, DollarSign, Target, PiggyBank, Calculator, CreditCard, Smartphone, Building, Plus, CheckCircle } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';
import BudgetManager from '@/components/BudgetManager';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);
  const [showBankingModal, setShowBankingModal] = useState(false);

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: bankingRef, isVisible: bankingVisible } = useScrollAnimation();
  const { containerRef: featuresRef, visibleItems: featuresVisible } = useStaggeredAnimation(6, 0.15);

  const quickStats = [
    { label: 'This Month Spending', value: '$1,247.50', change: '+12%', trend: 'up' },
    { label: 'Receipts Processed', value: '84', change: '+23%', trend: 'up' },
    { label: 'Savings Identified', value: '$127.30', change: '+8%', trend: 'up' },
    { label: 'Active Goals', value: '3', change: '0%', trend: 'neutral' },
  ];

  const bankingOptions = [
    { id: 'bank', name: 'Bank Account', icon: Building, description: 'Connect your bank account for automatic transaction tracking' },
    { id: 'upi', name: 'UPI Apps', icon: Smartphone, description: 'Link UPI apps like Google Pay, PhonePe, Paytm' },
    { id: 'card', name: 'Credit Cards', icon: CreditCard, description: 'Add credit and debit cards for expense monitoring' },
  ];

  const recentActivities = [
    { type: 'receipt', description: 'Walmart receipt processed', amount: '$45.67', time: '2 hours ago' },
    { type: 'insight', description: 'Savings opportunity identified', amount: '$12.30', time: '5 hours ago' },
    { type: 'goal', description: 'Monthly budget goal updated', amount: '$800.00', time: '1 day ago' },
  ];

  const connectAccount = (accountType: string) => {
    // This would normally integrate with actual banking APIs
    setConnectedAccounts(prev => [...prev, accountType]);
    setShowBankingModal(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div 
          ref={heroRef}
          className={`text-center mb-12 transition-all duration-1000 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4 animate-fade-in">
            Welcome to Project Raseed
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-delayed-fade">
            Your AI-powered financial assistant for smart receipt management and spending insights
          </p>
        </div>

        {/* Banking Connection Section */}
        <div 
          ref={bankingRef}
          className={`mb-12 transition-all duration-1000 ${
            bankingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold gradient-text flex items-center">
                <Wallet className="w-6 h-6 mr-2" />
                Connect Your Financial Accounts
              </CardTitle>
              <p className="text-muted-foreground">
                Link your bank accounts and payment apps to enable AI-powered expense tracking
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bankingOptions.map((option) => {
                  const Icon = option.icon;
                  const isConnected = connectedAccounts.includes(option.id);
                  
                  return (
                    <div
                      key={option.id}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer hover-lift ${
                        isConnected 
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-500'
                      }`}
                      onClick={() => !isConnected && connectAccount(option.id)}
                    >
                      <div className="text-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                          isConnected 
                            ? 'bg-green-500' 
                            : 'bg-gradient-to-r from-blue-500 to-purple-600'
                        }`}>
                          {isConnected ? (
                            <CheckCircle className="w-8 h-8 text-white" />
                          ) : (
                            <Icon className="w-8 h-8 text-white" />
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{option.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                        
                        {isConnected ? (
                          <Button disabled className="w-full bg-green-500">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Connected
                          </Button>
                        ) : (
                          <Button className="w-full">
                            <Plus className="w-4 h-4 mr-2" />
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {connectedAccounts.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No accounts connected yet. Connect your first account to start tracking expenses.
                  </p>
                  <Button variant="outline" onClick={() => setShowBankingModal(true)}>
                    Skip for Now
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div 
          ref={statsRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 transition-all duration-1000 ${
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {quickStats.map((stat, index) => (
            <Card 
              key={index} 
              className={`glass-card hover-lift floating-card animate-bounce-in animate-stagger-${index + 1}`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <TrendingUp className={`h-4 w-4 animate-float ${stat.trend === 'up' ? 'text-green-500' : 'text-gray-500'}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-gray-500'}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Budget Manager Section */}
        <div className="mb-12">
          <BudgetManager />
        </div>

        {/* Main Features Grid */}
        <div 
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          <div className={`transition-all duration-700 ${featuresVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <FeatureCard
              icon={Receipt}
              title="Smart Receipt Scanner"
              description="Upload and analyze receipts with AI"
              onClick={() => navigate('/receipt-scanner')}
              className="animate-float"
            >
              <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Upload className="w-4 h-4 mr-2" />
                Scan Receipt
              </Button>
            </FeatureCard>
          </div>

          <div className={`transition-all duration-700 ${featuresVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <FeatureCard
              icon={BarChart3}
              title="Spending Analytics"
              description="Track expenses and identify patterns"
              onClick={() => navigate('/analytics')}
              className="animate-float"
            >
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Groceries</span>
                  <span>$456.78</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full animate-pulse" style={{ width: '65%' }}></div>
                </div>
              </div>
            </FeatureCard>
          </div>

          <div className={`transition-all duration-700 ${featuresVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <FeatureCard
              icon={MessageSquare}
              title="AI Assistant"
              description="Chat with your financial advisor"
              onClick={() => navigate('/ai-assistant')}
              className="animate-float"
            >
              <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse">
                <p className="text-sm text-muted-foreground">
                  "How much did I spend on groceries this week?"
                </p>
              </div>
            </FeatureCard>
          </div>

          <div className={`transition-all duration-700 ${featuresVisible[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <FeatureCard
              icon={PiggyBank}
              title="Budget Planner"
              description="Set and track spending limits"
              onClick={() => navigate('/analytics')}
              className="animate-float"
            >
              <Button className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 animate-glow">
                <Calculator className="w-4 h-4 mr-2" />
                Manage Budget
              </Button>
            </FeatureCard>
          </div>

          <div className={`transition-all duration-700 ${featuresVisible[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <FeatureCard
              icon={Target}
              title="Savings Goals"
              description="Set and track financial objectives"
              onClick={() => navigate('/analytics')}
              className="animate-float"
            >
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Vacation Fund</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                </div>
              </div>
            </FeatureCard>
          </div>

          <div className={`transition-all duration-700 ${featuresVisible[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <FeatureCard
              icon={DollarSign}
              title="Smart Insights"
              description="AI-powered financial recommendations"
              onClick={() => navigate('/analytics')}
              className="animate-float"
            >
              <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 animate-glow">
                <p className="text-sm text-green-700 dark:text-green-300">
                  💡 You could save $23 by switching brands
                </p>
              </div>
            </FeatureCard>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="glass-card animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg floating-card animate-slide-in-right animate-stagger-${index + 1}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${activity.type === 'receipt' ? 'bg-blue-500' : activity.type === 'insight' ? 'bg-green-500' : 'bg-purple-500'}`}></div>
                    <div>
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold hover:scale-110 transition-transform">{activity.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
