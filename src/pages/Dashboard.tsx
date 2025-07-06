
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Receipt, BarChart3, MessageSquare, Wallet, Upload, TrendingUp, DollarSign, Target } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const quickStats = [
    { label: 'This Month Spending', value: '$1,247.50', change: '+12%', trend: 'up' },
    { label: 'Receipts Processed', value: '84', change: '+23%', trend: 'up' },
    { label: 'Savings Identified', value: '$127.30', change: '+8%', trend: 'up' },
    { label: 'Active Goals', value: '3', change: '0%', trend: 'neutral' },
  ];

  const recentActivities = [
    { type: 'receipt', description: 'Walmart receipt processed', amount: '$45.67', time: '2 hours ago' },
    { type: 'insight', description: 'Savings opportunity identified', amount: '$12.30', time: '5 hours ago' },
    { type: 'goal', description: 'Monthly budget goal updated', amount: '$800.00', time: '1 day ago' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4 animate-fade-in">
            Welcome to Project Raseed
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            Your AI-powered financial assistant for smart receipt management and spending insights
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickStats.map((stat, index) => (
            <Card key={index} className="glass-card hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <TrendingUp className={`h-4 w-4 ${stat.trend === 'up' ? 'text-green-500' : 'text-gray-500'}`} />
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

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            icon={Receipt}
            title="Smart Receipt Scanner"
            description="Upload and analyze receipts with AI"
            onClick={() => navigate('/receipt-scanner')}
          >
            <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Upload className="w-4 h-4 mr-2" />
              Scan Receipt
            </Button>
          </FeatureCard>

          <FeatureCard
            icon={BarChart3}
            title="Spending Analytics"
            description="Track expenses and identify patterns"
            onClick={() => navigate('/analytics')}
          >
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Groceries</span>
                <span>$456.78</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </FeatureCard>

          <FeatureCard
            icon={MessageSquare}
            title="AI Assistant"
            description="Chat with your financial advisor"
            onClick={() => navigate('/ai-assistant')}
          >
            <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-muted-foreground">
                "How much did I spend on groceries this week?"
              </p>
            </div>
          </FeatureCard>

          <FeatureCard
            icon={Wallet}
            title="Google Wallet Integration"
            description="Manage passes and insights"
            onClick={() => navigate('/wallet')}
          >
            <Button className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
              <Wallet className="w-4 h-4 mr-2" />
              View Passes
            </Button>
          </FeatureCard>

          <FeatureCard
            icon={Target}
            title="Savings Goals"
            description="Set and track financial objectives"
            onClick={() => navigate('/analytics')}
          >
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Vacation Fund</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </FeatureCard>

          <FeatureCard
            icon={DollarSign}
            title="Smart Insights"
            description="AI-powered financial recommendations"
            onClick={() => navigate('/analytics')}
          >
            <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-700 dark:text-green-300">
                💡 You could save $23 by switching brands
              </p>
            </div>
          </FeatureCard>
        </div>

        {/* Recent Activity */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${activity.type === 'receipt' ? 'bg-blue-500' : activity.type === 'insight' ? 'bg-green-500' : 'bg-purple-500'}`}></div>
                    <div>
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">{activity.amount}</span>
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
