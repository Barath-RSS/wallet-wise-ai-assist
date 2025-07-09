
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Target, PieChart, Calendar, Filter, Download, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, AreaChart, Area } from 'recharts';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6months');

  // Sample data - in real app, this would come from your backend
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

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-glow">
            Financial Analytics
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Deep insights into your spending patterns and financial health
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-2xl hover-lift">
            <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
                <span className="text-green-300 text-sm">+12.5%</span>
              </div>
              <h3 className="text-white/70 text-sm font-medium mb-1">Total Spent</h3>
              <p className="text-2xl font-bold text-white">₹2,68,000</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-blue-600 p-1 rounded-2xl hover-lift">
            <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
                <span className="text-green-300 text-sm">+8.3%</span>
              </div>
              <h3 className="text-white/70 text-sm font-medium mb-1">Avg Monthly</h3>
              <p className="text-2xl font-bold text-white">₹44,667</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 p-1 rounded-2xl hover-lift">
            <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8 text-white" />
                <span className="text-red-300 text-sm">-3.2%</span>
              </div>
              <h3 className="text-white/70 text-sm font-medium mb-1">Budget Used</h3>
              <p className="text-2xl font-bold text-white">89.4%</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-600 p-1 rounded-2xl hover-lift">
            <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-white" />
                <span className="text-green-300 text-sm">+15.7%</span>
              </div>
              <h3 className="text-white/70 text-sm font-medium mb-1">Savings Rate</h3>
              <p className="text-2xl font-bold text-white">42.8%</p>
            </div>
          </Card>
        </div>

        {/* Main Analytics */}
        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-xl mb-8">
            <TabsTrigger value="trends" className="text-white data-[state=active]:bg-blue-500/30 data-[state=active]:text-blue-200">
              Spending Trends
            </TabsTrigger>
            <TabsTrigger value="categories" className="text-white data-[state=active]:bg-purple-500/30 data-[state=active]:text-purple-200">
              Categories
            </TabsTrigger>
            <TabsTrigger value="budget" className="text-white data-[state=active]:bg-green-500/30 data-[state=active]:text-green-200">
              Budget Analysis
            </TabsTrigger>
            <TabsTrigger value="goals" className="text-white data-[state=active]:bg-orange-500/30 data-[state=active]:text-orange-200">
              Savings Goals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-8">
            <Card className="glass-card bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                    Spending Trends Over Time
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="text-white border-white/20">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm" variant="outline" className="text-white border-white/20">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
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
                    />
                    <Area type="monotone" dataKey="income" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="spending" stackId="2" stroke="#8884d8" fill="#8884d8" fillOpacity={0.8} />
                    <Area type="monotone" dataKey="savings" stackId="3" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="glass-card bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-purple-400" />
                    Spending by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="glass-card bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Category Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryData.map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="text-white font-medium">{category.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">₹{category.amount.toLocaleString()}</p>
                          <p className="text-white/60 text-sm">{category.value}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="budget" className="space-y-8">
            <Card className="glass-card bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-green-400" />
                  Budget vs Actual Spending
                </CardTitle>
              </CardHeader>
              <CardContent>
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
                    />
                    <Bar dataKey="budgeted" fill="#82ca9d" name="Budgeted" />
                    <Bar dataKey="actual" fill="#8884d8" name="Actual" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savingsGoals.map((goal, index) => (
                <Card key={index} className="glass-card bg-white/5 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <div className="flex items-center">
                        <Target className="w-5 h-5 mr-2 text-orange-400" />
                        {goal.goal}
                      </div>
                      <span className="text-lg font-bold text-white">{goal.progress}%</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Progress value={goal.progress} className="w-full h-3" />
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white/70 text-sm">Current</p>
                          <p className="text-white font-bold">₹{goal.current.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/70 text-sm">Target</p>
                          <p className="text-white font-bold">₹{goal.target.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-white/70 text-sm">Remaining</p>
                        <p className="text-orange-400 font-bold">₹{(goal.target - goal.current).toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
