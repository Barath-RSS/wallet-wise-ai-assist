
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Receipt, BarChart3, MessageSquare, Wallet, Upload, TrendingUp, DollarSign, Target, PiggyBank, Calculator, CreditCard, Smartphone, Building, Plus, CheckCircle, ArrowUp, ArrowDown, Activity, Users, Zap, Eye, EyeOff } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';
import BudgetManager from '@/components/BudgetManager';
import BankingModal from '@/components/BankingModal';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [connectedAccounts, setConnectedAccounts] = useState<Array<{type: string, name: string}>>([]);
  const [showBankingModal, setShowBankingModal] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(true);

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { containerRef: featuresRef, visibleItems: featuresVisible } = useStaggeredAnimation(6, 0.15);

  const mainStats = [
    { label: 'Total Balance', value: '₹1,17,650', change: '+12.5%', trend: 'up', gradient: 'from-blue-500 to-purple-600' },
    { label: 'Monthly Spending', value: '₹45,280', change: '-5.2%', trend: 'down', gradient: 'from-purple-500 to-pink-600' },
    { label: 'Savings Goal', value: '₹2,50,000', change: '68%', trend: 'up', gradient: 'from-green-500 to-blue-500' },
    { label: 'Investments', value: '₹85,430', change: '+18.7%', trend: 'up', gradient: 'from-orange-500 to-red-500' },
  ];

  const recentTransactions = [
    { name: 'Swiggy Food Order', amount: '-₹420', time: '2 hours ago', category: 'Food', color: 'text-red-400' },
    { name: 'Salary Credit', amount: '+₹75,000', time: '1 day ago', category: 'Income', color: 'text-green-400' },
    { name: 'Uber Ride', amount: '-₹180', time: '3 days ago', category: 'Transport', color: 'text-red-400' },
    { name: 'Netflix Subscription', amount: '-₹799', time: '5 days ago', category: 'Entertainment', color: 'text-red-400' },
  ];

  const quickActions = [
    { title: 'Send Money', icon: ArrowUp, action: () => console.log('Send Money'), gradient: 'from-blue-500 to-cyan-500' },
    { title: 'Request Money', icon: ArrowDown, action: () => console.log('Request Money'), gradient: 'from-green-500 to-emerald-500' },
    { title: 'Pay Bills', icon: Zap, action: () => console.log('Pay Bills'), gradient: 'from-purple-500 to-violet-500' },
    { title: 'Investments', icon: TrendingUp, action: () => console.log('Investments'), gradient: 'from-orange-500 to-red-500' },
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
    <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 cursor-custom">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div 
          ref={heroRef}
          className={`text-center mb-8 transition-all duration-1000 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4 animate-fade-in">
            Financial Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-delayed-fade">
            Your complete financial overview at a glance
          </p>
        </div>

        {/* Main Stats Grid */}
        <div 
          ref={statsRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-1000 ${
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {mainStats.map((stat, index) => (
            <Card 
              key={index} 
              className={`bg-gradient-to-br ${stat.gradient} p-1 rounded-2xl hover-lift floating-card animate-bounce-in animate-stagger-${index + 1}`}
            >
              <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-white/10 rounded-lg">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-5 w-5 text-white" />
                    ) : (
                      <ArrowDown className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    stat.trend === 'up' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">
                    {stat.label.includes('Balance') && !balanceVisible ? '••••••' : stat.value}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="glass-card mb-8 bg-white/5 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-400" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    onClick={action.action}
                    className={`bg-gradient-to-r ${action.gradient} hover:scale-105 transition-all duration-300 p-6 h-auto flex-col space-y-2 animate-glow`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-sm">{action.title}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Banking Connection & Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Banking Connection */}
          <Card className="glass-card bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <Wallet className="w-5 h-5 mr-2 text-green-400" />
                  Connected Accounts
                </div>
                <Button
                  size="sm"
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  variant="ghost"
                  className="text-white/70 hover:text-white"
                >
                  {balanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {connectedAccounts.length > 0 ? (
                <div className="space-y-3">
                  {connectedAccounts.map((account, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{account.name}</p>
                          <p className="text-white/60 text-sm capitalize">{account.type}</p>
                        </div>
                      </div>
                      <div className="text-green-400 text-sm">Connected</div>
                    </div>
                  ))}
                  <Button onClick={openBankingModal} className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Account
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white/70 mb-4">No accounts connected</p>
                  <Button onClick={openBankingModal} className="bg-gradient-to-r from-blue-500 to-purple-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Connect Account
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="glass-card bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="w-5 h-5 mr-2 text-purple-400" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover-lift">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Receipt className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{transaction.name}</p>
                        <p className="text-white/60 text-sm">{transaction.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${transaction.color}`}>{transaction.amount}</p>
                      <p className="text-white/60 text-xs">{transaction.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Manager Section */}
        <div className="mb-8">
          <BudgetManager />
        </div>

        {/* Main Features Grid */}
        <div 
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
        >
          <div className={`transition-all duration-700 ${featuresVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <FeatureCard
              icon={Receipt}
              title="Smart Receipt Scanner"
              description="Upload and analyze receipts with AI"
              onClick={() => navigate('/receipt-scanner')}
              className="animate-float bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20"
            >
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                onClick={() => navigate('/receipt-scanner')}
              >
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
              className="animate-float bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/20"
            >
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                onClick={() => navigate('/analytics')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </FeatureCard>
          </div>

          <div className={`transition-all duration-700 ${featuresVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <FeatureCard
              icon={MessageSquare}
              title="AI Assistant"
              description="Chat with your financial advisor"
              onClick={() => navigate('/ai-assistant')}
              className="animate-float bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20"
            >
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                onClick={() => navigate('/ai-assistant')}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat Now
              </Button>
            </FeatureCard>
          </div>

          <div className={`transition-all duration-700 ${featuresVisible[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <FeatureCard
              icon={PiggyBank}
              title="Budget Planner"
              description="Set and track spending limits"
              onClick={() => navigate('/analytics')}
              className="animate-float bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20"
            >
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 animate-glow"
                onClick={() => navigate('/analytics')}
              >
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
              className="animate-float bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20"
            >
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                onClick={() => navigate('/analytics')}
              >
                <Target className="w-4 h-4 mr-2" />
                Set Goals
              </Button>
            </FeatureCard>
          </div>

          <div className={`transition-all duration-700 ${featuresVisible[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <FeatureCard
              icon={DollarSign}
              title="Smart Insights"
              description="AI-powered financial recommendations"
              onClick={() => navigate('/analytics')}
              className="animate-float bg-gradient-to-br from-pink-500/10 to-rose-500/10 border-pink-500/20"
            >
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700"
                onClick={() => navigate('/analytics')}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Get Insights
              </Button>
            </FeatureCard>
          </div>
        </div>
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
