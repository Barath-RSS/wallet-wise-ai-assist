
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Receipt, BarChart3, MessageSquare, Wallet, Upload, TrendingUp, DollarSign, Target, PiggyBank, Calculator, CreditCard, Smartphone, Building, Plus, CheckCircle } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';
import BudgetManager from '@/components/BudgetManager';
import BankingModal from '@/components/BankingModal';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [connectedAccounts, setConnectedAccounts] = useState<Array<{type: string, name: string}>>([]);
  const [showBankingModal, setShowBankingModal] = useState(false);

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: bankingRef, isVisible: bankingVisible } = useScrollAnimation();
  const { containerRef: featuresRef, visibleItems: featuresVisible } = useStaggeredAnimation(6, 0.15);

  const quickStats = [
    { label: 'This Month Spending', value: '$0.00', change: '0%', trend: 'neutral' },
    { label: 'Receipts Processed', value: '0', change: '0%', trend: 'neutral' },
    { label: 'Savings Identified', value: '$0.00', change: '0%', trend: 'neutral' },
    { label: 'Active Goals', value: '0', change: '0%', trend: 'neutral' },
  ];

  const bankingOptions = [
    { id: 'bank', name: 'Bank Account', icon: Building, description: 'Connect your bank account for automatic transaction tracking' },
    { id: 'upi', name: 'UPI Apps', icon: Smartphone, description: 'Link UPI apps like Google Pay, PhonePe, Paytm' },
    { id: 'card', name: 'Credit Cards', icon: CreditCard, description: 'Add credit and debit cards for expense monitoring' },
  ];

  const connectAccount = (type: string, name: string) => {
    const newAccount = { type, name };
    setConnectedAccounts(prev => [...prev, newAccount]);
    setShowBankingModal(false);
  };

  const openBankingModal = () => {
    setShowBankingModal(true);
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 cursor-custom">
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
                  const connectedAccount = connectedAccounts.find(acc => acc.type === option.id);
                  const isConnected = !!connectedAccount;
                  
                  return (
                    <div
                      key={option.id}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer hover-lift ${
                        isConnected 
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-500'
                      }`}
                      onClick={() => !isConnected && openBankingModal()}
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
                          <div>
                            <Button disabled className="w-full bg-green-500 mb-2">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Connected
                            </Button>
                            <p className="text-xs text-green-600 dark:text-green-400">
                              {connectedAccount?.name}
                            </p>
                          </div>
                        ) : (
                          <Button className="w-full" onClick={openBankingModal}>
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
                  <Button variant="outline" onClick={() => navigate('/receipt-scanner')}>
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
              <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  Connect accounts to view analytics
                </p>
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
              <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  "Connect your accounts first to get started"
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
                Create Budget
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
              <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  Set your first savings goal
                </p>
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
              <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-600 dark:text-blue-400 text-center">
                  Connect accounts to get insights
                </p>
              </div>
            </FeatureCard>
          </div>
        </div>

        {/* Getting Started Guide */}
        <Card className="glass-card animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-sm font-medium">Connect your first account</p>
                    <p className="text-xs text-muted-foreground">Link a bank account or UPI app to start tracking</p>
                  </div>
                </div>
                <Button size="sm" onClick={openBankingModal}>Connect</Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg opacity-50">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  <div>
                    <p className="text-sm font-medium">Upload your first receipt</p>
                    <p className="text-xs text-muted-foreground">Scan a receipt to see AI analysis</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" disabled>Coming Next</Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg opacity-50">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  <div>
                    <p className="text-sm font-medium">Set your budget goals</p>
                    <p className="text-xs text-muted-foreground">Create spending limits and savings targets</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" disabled>Coming Soon</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BankingModal 
        isOpen={showBankingModal}
        onClose={() => setShowBankingModal(false)}
        onConnect={connectAccount}
      />
    </div>
  );
};

export default Dashboard;
