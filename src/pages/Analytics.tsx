import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Target, PieChart, Calendar, Filter, Download, Settings, Globe } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, AreaChart, Area, Pie } from 'recharts';
import EnhancedBackground from '@/components/EnhancedBackground';
import InteractiveCard from '@/components/InteractiveCard';
import CountrySelector from '@/components/CountrySelector';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedCountry, setSelectedCountry] = useState({ 
    code: 'IN', 
    name: 'India', 
    currency: 'INR', 
    symbol: '₹', 
    flag: '🇮🇳' 
  });

  // Sample data with dynamic currency
  const spendingTrends = [
    { month: 'Jan', spending: 45000, income: 75000, savings: 30000 },
    { month: 'Feb', spending: 38000, income: 75000, savings: 37000 },
    { month: 'Mar', spending: 52000, income: 80000, savings: 28000 },
    { month: 'Apr', spending: 41000, income: 75000, savings: 34000 },
    { month: 'May', spending: 48000, income: 75000, savings: 27000 },
    { month: 'Jun', spending: 44000, income: 78000, savings: 34000 },
  ];

  const categoryData = [
    { name: 'Food & Dining', value: 25, amount: 15000, color: '#8884d8' },
    { name: 'Transportation', value: 20, amount: 12000, color: '#82ca9d' },
    { name: 'Entertainment', value: 15, amount: 9000, color: '#ffc658' },
    { name: 'Shopping', value: 30, amount: 18000, color: '#ff7300' },
    { name: 'Bills', value: 10, amount: 6000, color: '#00ff88' },
  ];

  const budgetComparison = [
    { category: 'Food', budgeted: 20000, actual: 15000, variance: -5000 },
    { category: 'Transport', budgeted: 15000, actual: 12000, variance: -3000 },
    { category: 'Entertainment', budgeted: 10000, actual: 9000, variance: -1000 },
    { category: 'Shopping', budgeted: 20000, actual: 18000, variance: -2000 },
    { category: 'Bills', budgeted: 8000, actual: 6000, variance: -2000 },
  ];

  const savingsGoals = [
    { goal: 'Emergency Fund', target: 300000, current: 185000, progress: 62 },
    { goal: 'Vacation', target: 150000, current: 95000, progress: 63 },
    { goal: 'New Car', target: 800000, current: 320000, progress: 40 },
    { goal: 'Home Down Payment', target: 2000000, current: 600000, progress: 30 },
  ];

  const formatCurrency = (amount: number) => {
    return `${selectedCountry.symbol}${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 relative">
      <EnhancedBackground />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Country Selector */}
        <div className="text-center mb-8 space-y-6">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-glow bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Financial Analytics
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced insights into your spending patterns and financial health across global markets
            </p>
          </div>
          
          <div className="max-w-md mx-auto animate-slide-in-right">
            <CountrySelector 
              onCountrySelect={setSelectedCountry}
              selectedCountry={selectedCountry}
            />
          </div>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <InteractiveCard gradient="from-blue-500/20 to-purple-600/20" className="animate-bounce-in">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="w-8 h-8 text-white animate-pulse" />
                <span className="text-green-300 text-sm font-bold">+12.5%</span>
              </div>
              <h3 className="text-white/70 text-sm font-medium mb-1">Total Spent</h3>
              <p className="text-2xl font-bold text-white">{formatCurrency(268000)}</p>
            </div>
          </InteractiveCard>

          <InteractiveCard gradient="from-green-500/20 to-blue-600/20" className="animate-bounce-in" style={{ animationDelay: '0.1s' }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-white animate-pulse" />
                <span className="text-green-300 text-sm font-bold">+8.3%</span>
              </div>
              <h3 className="text-white/70 text-sm font-medium mb-1">Avg Monthly</h3>
              <p className="text-2xl font-bold text-white">{formatCurrency(44667)}</p>
            </div>
          </InteractiveCard>

          <InteractiveCard gradient="from-purple-500/20 to-pink-600/20" className="animate-bounce-in" style={{ animationDelay: '0.2s' }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8 text-white animate-pulse" />
                <span className="text-red-300 text-sm font-bold">-3.2%</span>
              </div>
              <h3 className="text-white/70 text-sm font-medium mb-1">Budget Used</h3>
              <p className="text-2xl font-bold text-white">89.4%</p>
            </div>
          </InteractiveCard>

          <InteractiveCard gradient="from-orange-500/20 to-red-600/20" className="animate-bounce-in" style={{ animationDelay: '0.3s' }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-white animate-pulse" />
                <span className="text-green-300 text-sm font-bold">+15.7%</span>
              </div>
              <h3 className="text-white/70 text-sm font-medium mb-1">Savings Rate</h3>
              <p className="text-2xl font-bold text-white">42.8%</p>
            </div>
          </InteractiveCard>
        </div>

        {/* Enhanced Analytics Tabs */}
        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid w-full grid-cols-4 glass-card bg-white/10 backdrop-blur-xl mb-8 p-2 rounded-2xl">
            <TabsTrigger 
              value="trends" 
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/30 data-[state=active]:to-purple-500/30 data-[state=active]:text-blue-200 rounded-xl transition-all duration-300 hover:bg-white/10"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Trends
            </TabsTrigger>
            <TabsTrigger 
              value="categories" 
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/30 data-[state=active]:to-pink-500/30 data-[state=active]:text-purple-200 rounded-xl transition-all duration-300 hover:bg-white/10"
            >
              <PieChart className="w-4 h-4 mr-2" />
              Categories
            </TabsTrigger>
            <TabsTrigger 
              value="budget" 
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/30 data-[state=active]:to-blue-500/30 data-[state=active]:text-green-200 rounded-xl transition-all duration-300 hover:bg-white/10"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Budget
            </TabsTrigger>
            <TabsTrigger 
              value="goals" 
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/30 data-[state=active]:to-red-500/30 data-[state=active]:text-orange-200 rounded-xl transition-all duration-300 hover:bg-white/10"
            >
              <Target className="w-4 h-4 mr-2" />
              Goals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-8 animate-fade-in">
            <InteractiveCard title="Spending Trends Over Time" icon={<TrendingUp className="w-5 h-5" />}>
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={spendingTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#ffffff60" />
                  <YAxis stroke="#ffffff60" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [formatCurrency(value), '']}
                  />
                  <Area type="monotone" dataKey="income" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="spending" stackId="2" stroke="#8884d8" fill="#8884d8" fillOpacity={0.8} />
                  <Area type="monotone" dataKey="savings" stackId="3" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </InteractiveCard>
          </TabsContent>

          <TabsContent value="categories" className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <InteractiveCard title="Spending by Category" icon={<PieChart className="w-5 h-5" />}>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`${value}%`, 'Percentage']}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </InteractiveCard>

              <InteractiveCard title="Category Breakdown">
                <div className="space-y-4">
                  {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 glass-card bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full animate-pulse" 
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-white font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{formatCurrency(category.amount)}</p>
                        <p className="text-white/60 text-sm">{category.value}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </InteractiveCard>
            </div>
          </TabsContent>

          <TabsContent value="budget" className="space-y-8 animate-fade-in">
            <InteractiveCard title="Budget vs Actual Spending" icon={<BarChart3 className="w-5 h-5" />}>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={budgetComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="category" stroke="#ffffff60" />
                  <YAxis stroke="#ffffff60" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [formatCurrency(value), '']}
                  />
                  <Bar dataKey="budgeted" fill="#82ca9d" name="Budgeted" />
                  <Bar dataKey="actual" fill="#8884d8" name="Actual" />
                </BarChart>
              </ResponsiveContainer>
            </InteractiveCard>
          </TabsContent>

          <TabsContent value="goals" className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savingsGoals.map((goal, index) => (
                <InteractiveCard 
                  key={index} 
                  title={goal.goal} 
                  icon={<Target className="w-5 h-5" />}
                  className="animate-slide-in-right"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-white">{goal.progress}%</span>
                      <div className="text-right">
                        <p className="text-white/70 text-sm">Remaining</p>
                        <p className="text-orange-400 font-bold">{formatCurrency(goal.target - goal.current)}</p>
                      </div>
                    </div>
                    
                    <Progress value={goal.progress} className="w-full h-3 bg-white/20" />
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white/70 text-sm">Current</p>
                        <p className="text-white font-bold">{formatCurrency(goal.current)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white/70 text-sm">Target</p>
                        <p className="text-white font-bold">{formatCurrency(goal.target)}</p>
                      </div>
                    </div>
                  </div>
                </InteractiveCard>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
