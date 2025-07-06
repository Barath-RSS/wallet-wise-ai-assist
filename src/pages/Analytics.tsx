
import React, { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Target, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  const spendingData = [
    { category: 'Groceries', amount: 456.78, change: 12, color: '#3B82F6' },
    { category: 'Restaurants', amount: 234.56, change: -8, color: '#10B981' },
    { category: 'Transportation', amount: 189.32, change: 15, color: '#F59E0B' },
    { category: 'Shopping', amount: 167.89, change: 23, color: '#EF4444' },
    { category: 'Utilities', amount: 145.67, change: 2, color: '#8B5CF6' },
    { category: 'Entertainment', amount: 98.45, change: -12, color: '#EC4899' },
  ];

  const monthlyTrend = [
    { month: 'Jan', amount: 1200 },
    { month: 'Feb', amount: 1450 },
    { month: 'Mar', amount: 1100 },
    { month: 'Apr', amount: 1380 },
    { month: 'May', amount: 1250 },
    { month: 'Jun', amount: 1420 },
  ];

  const savingsOpportunities = [
    { category: 'Groceries', suggestion: 'Switch to store brand products', potential: 23.45 },
    { category: 'Subscriptions', suggestion: 'Cancel unused Netflix subscription', potential: 15.99 },
    { category: 'Transportation', suggestion: 'Use public transport 2 days/week', potential: 34.50 },
  ];

  const goals = [
    { name: 'Emergency Fund', target: 5000, current: 3750, category: 'Savings' },
    { name: 'Vacation', target: 2000, current: 1500, category: 'Travel' },
    { name: 'New Laptop', target: 1500, current: 890, category: 'Electronics' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Spending Analytics
          </h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive insights into your financial patterns and opportunities
          </p>
        </div>

        {/* Time Range Selector */}
        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <div className="flex justify-center space-x-4">
              {(['week', 'month', 'year'] as const).map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? 'default' : 'outline'}
                  onClick={() => setTimeRange(range)}
                  className={timeRange === range ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'glass hover:bg-white/20 dark:hover:bg-black/20'}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spending</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,247.50</div>
              <p className="text-xs text-green-500 flex items-center">
                <TrendingDown className="w-3 h-3 mr-1" />
                5% less than last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Transaction</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24.80</div>
              <p className="text-xs text-red-500 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                12% higher than last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">$73.94</div>
              <p className="text-xs text-muted-foreground">
                Identified this month
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Category Breakdown */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={spendingData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="amount"
                    label={({ category, amount }) => `${category}: $${amount}`}
                  >
                    {spendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Spending Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="url(#colorGradient)" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Category Details */}
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {spendingData.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/30 dark:bg-black/20 rounded-lg hover-lift">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <div>
                      <h3 className="font-semibold">{category.category}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category.change > 0 ? '+' : ''}{category.change}% from last month
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">${category.amount.toFixed(2)}</div>
                    <div className={`text-sm flex items-center ${category.change > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {category.change > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {Math.abs(category.change)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Savings Opportunities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-green-600">Savings Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savingsOpportunities.map((opportunity, index) => (
                  <div key={index} className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-green-700 dark:text-green-300">
                        {opportunity.category}
                      </h3>
                      <span className="text-lg font-bold text-green-600">
                        ${opportunity.potential.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 mb-3">
                      {opportunity.suggestion}
                    </p>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                    >
                      Apply Suggestion
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Goals Progress */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Financial Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {goals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{goal.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        ${goal.current} / ${goal.target}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${(goal.current / goal.target) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{goal.category}</span>
                      <span className="font-medium">
                        {Math.round((goal.current / goal.target) * 100)}% complete
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
