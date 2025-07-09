
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Receipt, BarChart3, MessageSquare, Wallet, Upload, TrendingUp, DollarSign, Target, PiggyBank, Calculator, CreditCard, Smartphone, Building, Plus, CheckCircle, ArrowUp, ArrowDown, Activity, Users, Zap, Eye, EyeOff, LineChart, PieChart, Settings, Layout, Grid3X3, Palette, Save, RotateCcw } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';
import BudgetManager from '@/components/BudgetManager';
import BankingModal from '@/components/BankingModal';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, AreaChart, Area, Pie, BarChart, Bar, ComposedChart, Legend } from 'recharts';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [connectedAccounts, setConnectedAccounts] = useState<Array<{type: string, name: string}>>([]);
  const [showBankingModal, setShowBankingModal] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [dashboardLayout, setDashboardLayout] = useState({
    showStats: true,
    showCharts: true,
    showQuickActions: true,
    showTransactions: true,
    showAccounts: true,
    showBudget: true,
    showFeatures: true,
    chartsPerRow: 2,
    statsPerRow: 4
  });

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: chartsRef, isVisible: chartsVisible } = useScrollAnimation();
  const { containerRef: featuresRef, visibleItems: featuresVisible } = useStaggeredAnimation(6, 0.15);

  // Enhanced spending data with more details
  const detailedSpendingData = [
    { name: 'Jan', spending: 2400, income: 3000, savings: 600, budget: 2800, categories: { food: 600, transport: 400, entertainment: 300, shopping: 700, bills: 400 } },
    { name: 'Feb', spending: 1398, income: 3000, savings: 1602, budget: 2800, categories: { food: 450, transport: 250, entertainment: 200, shopping: 348, bills: 150 } },
    { name: 'Mar', spending: 2800, income: 3200, savings: 400, budget: 2800, categories: { food: 700, transport: 500, entertainment: 400, shopping: 800, bills: 400 } },
    { name: 'Apr', spending: 2108, income: 3100, savings: 992, budget: 2800, categories: { food: 550, transport: 350, entertainment: 308, shopping: 600, bills: 300 } },
    { name: 'May', spending: 2600, income: 3300, savings: 700, budget: 2800, categories: { food: 650, transport: 450, entertainment: 350, shopping: 750, bills: 400 } },
    { name: 'Jun', spending: 2200, income: 3400, savings: 1200, budget: 2800, categories: { food: 600, transport: 400, entertainment: 300, shopping: 600, bills: 300 } },
  ];

  // Enhanced category data with subcategories
  const enhancedCategoryData = [
    { 
      name: 'Food & Dining', 
      value: 30, 
      color: '#8884d8', 
      amount: 1800,
      subcategories: [
        { name: 'Restaurants', value: 15, amount: 900 },
        { name: 'Groceries', value: 10, amount: 600 },
        { name: 'Delivery', value: 5, amount: 300 }
      ]
    },
    { 
      name: 'Transportation', 
      value: 20, 
      color: '#82ca9d',
      amount: 1200,
      subcategories: [
        { name: 'Fuel', value: 12, amount: 720 },
        { name: 'Public Transport', value: 5, amount: 300 },
        { name: 'Maintenance', value: 3, amount: 180 }
      ]
    },
    { 
      name: 'Entertainment', 
      value: 15, 
      color: '#ffc658',
      amount: 900,
      subcategories: [
        { name: 'Movies', value: 7, amount: 420 },
        { name: 'Games', value: 5, amount: 300 },
        { name: 'Events', value: 3, amount: 180 }
      ]
    },
    { 
      name: 'Shopping', 
      value: 25, 
      color: '#ff7300',
      amount: 1500,
      subcategories: [
        { name: 'Clothing', value: 15, amount: 900 },
        { name: 'Electronics', value: 7, amount: 420 },
        { name: 'Others', value: 3, amount: 180 }
      ]
    },
    { 
      name: 'Bills & Utilities', 
      value: 10, 
      color: '#00ff88',
      amount: 600,
      subcategories: [
        { name: 'Electricity', value: 4, amount: 240 },
        { name: 'Internet', value: 3, amount: 180 },
        { name: 'Phone', value: 3, amount: 180 }
      ]
    },
  ];

  // Monthly comparison data
  const monthlyComparisonData = [
    { month: 'Jan', thisYear: 2400, lastYear: 2200, budget: 2800 },
    { month: 'Feb', thisYear: 1398, lastYear: 1800, budget: 2800 },
    { month: 'Mar', thisYear: 2800, lastYear: 2400, budget: 2800 },
    { month: 'Apr', thisYear: 2108, lastYear: 2300, budget: 2800 },
    { month: 'May', thisYear: 2600, lastYear: 2500, budget: 2800 },
    { month: 'Jun', thisYear: 2200, lastYear: 2100, budget: 2800 },
  ];

  const mainStats = [
    { 
      label: 'Total Balance', 
      value: '₹1,17,650', 
      change: '+12.5%', 
      trend: 'up', 
      gradient: 'from-blue-500 to-purple-600',
      icon: Wallet
    },
    { 
      label: 'Monthly Spending', 
      value: '₹45,280', 
      change: '-5.2%', 
      trend: 'down', 
      gradient: 'from-purple-500 to-pink-600',
      icon: TrendingUp
    },
    { 
      label: 'Savings Goal', 
      value: '₹2,50,000', 
      change: '68%', 
      trend: 'up', 
      gradient: 'from-green-500 to-blue-500',
      icon: Target
    },
    { 
      label: 'Investments', 
      value: '₹85,430', 
      change: '+18.7%', 
      trend: 'up', 
      gradient: 'from-orange-500 to-red-500',
      icon: PieChart
    },
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

  const saveLayout = () => {
    localStorage.setItem('dashboardLayout', JSON.stringify(dashboardLayout));
    setIsCustomizing(false);
  };

  const resetLayout = () => {
    setDashboardLayout({
      showStats: true,
      showCharts: true,
      showQuickActions: true,
      showTransactions: true,
      showAccounts: true,
      showBudget: true,
      showFeatures: true,
      chartsPerRow: 2,
      statsPerRow: 4
    });
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
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white animate-fade-in text-glow">
              Financial Dashboard
            </h1>
            <Button
              onClick={() => setIsCustomizing(!isCustomizing)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Settings className="w-4 h-4 mr-2" />
              Customize
            </Button>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-delayed-fade">
            Your complete financial overview at a glance
          </p>
        </div>

        {/* Customization Panel */}
        {isCustomizing && (
          <Card className="glass-card mb-8 bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Layout className="w-5 h-5 mr-2 text-blue-400" />
                Dashboard Customization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {Object.entries(dashboardLayout).map(([key, value]) => {
                  if (typeof value === 'boolean') {
                    return (
                      <label key={key} className="flex items-center space-x-2 text-white">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setDashboardLayout(prev => ({ ...prev, [key]: e.target.checked }))}
                          className="rounded"
                        />
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </label>
                    );
                  }
                  return null;
                })}
              </div>
              <div className="flex space-x-4">
                <Button onClick={saveLayout} className="bg-gradient-to-r from-green-500 to-blue-500">
                  <Save className="w-4 h-4 mr-2" />
                  Save Layout
                </Button>
                <Button onClick={resetLayout} variant="outline" className="text-white border-white/20">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Stats Grid */}
        {dashboardLayout.showStats && (
          <div 
            ref={statsRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${dashboardLayout.statsPerRow} gap-6 mb-8 transition-all duration-1000 ${
              statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {mainStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={index} 
                  className={`bg-gradient-to-br ${stat.gradient} p-1 rounded-2xl hover-lift floating-card animate-bounce-in animate-stagger-${index + 1}`}
                >
                  <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        stat.trend === 'up' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                      }`}>
                        {stat.change}
                      </div>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm mb-1 font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">
                        {stat.label.includes('Balance') && !balanceVisible ? '••••••' : stat.value}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Enhanced Charts Section */}
        {dashboardLayout.showCharts && (
          <div 
            ref={chartsRef}
            className={`transition-all duration-1000 mb-8 ${
              chartsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-xl">
                <TabsTrigger value="overview" className="text-white data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">Overview</TabsTrigger>
                <TabsTrigger value="detailed" className="text-white data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300">Detailed</TabsTrigger>
                <TabsTrigger value="comparison" className="text-white data-[state=active]:bg-green-500/20 data-[state=active]:text-green-300">Comparison</TabsTrigger>
                <TabsTrigger value="categories" className="text-white data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-300">Categories</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className={`grid grid-cols-1 lg:grid-cols-${dashboardLayout.chartsPerRow} gap-8`}>
                  {/* Spending Trends Chart */}
                  <Card className="glass-card bg-white/5 backdrop-blur-xl border-white/10 animate-glow">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <LineChart className="w-5 h-5 mr-2 text-blue-400" />
                        Spending Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={detailedSpendingData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="name" stroke="#ffffff60" />
                          <YAxis stroke="#ffffff60" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(0,0,0,0.8)', 
                              border: '1px solid rgba(255,255,255,0.2)',
                              borderRadius: '8px'
                            }}
                          />
                          <Area type="monotone" dataKey="spending" stroke="#8884d8" fill="url(#colorGradient)" />
                          <Area type="monotone" dataKey="income" stroke="#82ca9d" fill="url(#incomeGradient)" />
                          <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Category Breakdown */}
                  <Card className="glass-card bg-white/5 backdrop-blur-xl border-white/10 animate-glow">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <PieChart className="w-5 h-5 mr-2 text-purple-400" />
                        Spending Categories
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <RechartsPieChart>
                          <Pie
                            data={enhancedCategoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {enhancedCategoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(0,0,0,0.8)', 
                              border: '1px solid rgba(255,255,255,0.2)',
                              borderRadius: '8px'
                            }}
                          />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {enhancedCategoryData.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-white/70 text-sm">{item.name}</span>
                            <span className="text-white/50 text-xs">₹{item.amount}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="detailed" className="mt-6">
                <Card className="glass-card bg-white/5 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Detailed Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <ComposedChart data={detailedSpendingData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="name" stroke="#ffffff60" />
                        <YAxis stroke="#ffffff60" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(0,0,0,0.8)', 
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="spending" fill="#8884d8" name="Spending" />
                        <Line type="monotone" dataKey="budget" stroke="#ff7300" name="Budget" />
                        <Area type="monotone" dataKey="savings" fill="#82ca9d" stroke="#82ca9d" name="Savings" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comparison" className="mt-6">
                <Card className="glass-card bg-white/5 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Year-over-Year Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={monthlyComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="month" stroke="#ffffff60" />
                        <YAxis stroke="#ffffff60" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(0,0,0,0.8)', 
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="thisYear" fill="#8884d8" name="This Year" />
                        <Bar dataKey="lastYear" fill="#82ca9d" name="Last Year" />
                        <Bar dataKey="budget" fill="#ffc658" name="Budget" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="categories" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enhancedCategoryData.map((category, index) => (
                    <Card key={index} className="glass-card bg-white/5 backdrop-blur-xl border-white/10">
                      <CardHeader>
                        <CardTitle className="text-white text-lg flex items-center">
                          <div 
                            className="w-4 h-4 rounded-full mr-2" 
                            style={{ backgroundColor: category.color }}
                          />
                          {category.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white mb-4">₹{category.amount}</div>
                        <div className="space-y-2">
                          {category.subcategories.map((sub, subIndex) => (
                            <div key={subIndex} className="flex justify-between items-center">
                              <span className="text-white/70">{sub.name}</span>
                              <span className="text-white font-medium">₹{sub.amount}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Quick Actions */}
        {dashboardLayout.showQuickActions && (
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
        )}

        {/* Banking Connection & Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Banking Connection */}
          {dashboardLayout.showAccounts && (
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
          )}

          {/* Recent Transactions */}
          {dashboardLayout.showTransactions && (
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
          )}
        </div>

        {/* Budget Manager Section */}
        {dashboardLayout.showBudget && (
          <div className="mb-8">
            <BudgetManager />
          </div>
        )}

        {/* Main Features Grid */}
        {dashboardLayout.showFeatures && (
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
        )}
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
