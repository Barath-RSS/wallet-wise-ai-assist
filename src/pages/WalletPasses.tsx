
import React, { useState } from 'react';
import { Wallet, Plus, QrCode, Download, Share, Bell, CreditCard, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface WalletPass {
  id: string;
  type: 'receipt' | 'shopping_list' | 'insight' | 'coupon' | 'loyalty';
  title: string;
  subtitle: string;
  details: string[];
  value?: string;
  expiryDate?: string;
  color: string;
  backgroundColor: string;
}

const WalletPasses: React.FC = () => {
  const { toast } = useToast();
  const [passes] = useState<WalletPass[]>([
    {
      id: '1',
      type: 'receipt',
      title: 'Walmart Receipt',
      subtitle: 'June 5, 2024 - $67.43',
      details: [
        'Organic Bananas - $3.47',
        'Whole Milk - $4.29',
        'Chicken Breast - $12.45',
        'Bread Loaf - $2.98',
        'Greek Yogurt - $5.99'
      ],
      color: 'text-blue-600',
      backgroundColor: 'from-blue-500 to-blue-600'
    },
    {
      id: '2',
      type: 'shopping_list',
      title: 'Weekly Shopping List',
      subtitle: 'AI Generated - 8 items',
      details: [
        'Bananas (2 lbs)',
        'Spinach (1 bag)',
        'Greek yogurt (2 containers)',
        'Whole grain bread',
        'Rice (2 lbs)',
        'Olive oil',
        'Tomatoes (3 lbs)',
        'Milk (1 gallon)'
      ],
      value: 'Est. $47.80',
      color: 'text-green-600',
      backgroundColor: 'from-green-500 to-green-600'
    },
    {
      id: '3',
      type: 'insight',
      title: 'Monthly Savings Insight',
      subtitle: 'Potential Savings Identified',
      details: [
        'Switch to store brands: $12.30/month',
        'Use coupons for frequent items: $8.75/month',
        'Buy bananas at different store: $4.50/month',
        'Total monthly savings potential: $25.55'
      ],
      value: 'Save $25.55',
      color: 'text-purple-600',
      backgroundColor: 'from-purple-500 to-purple-600'
    },
    {
      id: '4',
      type: 'coupon',
      title: '20% Off Groceries',
      subtitle: 'Valid at participating stores',
      details: [
        'Maximum discount: $15.00',
        'Valid on fresh produce only',
        'Cannot combine with other offers',
        'Show this pass at checkout'
      ],
      value: '20% OFF',
      expiryDate: '2024-07-15',
      color: 'text-orange-600',
      backgroundColor: 'from-orange-500 to-orange-600'
    },
    {
      id: '5',
      type: 'loyalty',
      title: 'Target Circle Points',
      subtitle: 'Rewards Balance',
      details: [
        'Current points: 2,450',
        'Points value: $24.50',
        'Next reward at: 2,500 points',
        'Earn 1 point per $1 spent'
      ],
      value: '2,450 pts',
      color: 'text-red-600',
      backgroundColor: 'from-red-500 to-red-600'
    }
  ]);

  const getPassIcon = (type: string) => {
    switch (type) {
      case 'receipt': return CreditCard;
      case 'shopping_list': return Wallet;
      case 'insight': return Bell;
      case 'coupon': return Gift;
      case 'loyalty': return QrCode;
      default: return Wallet;
    }
  };

  const handleAddToWallet = (pass: WalletPass) => {
    toast({
      title: "Added to Google Wallet",
      description: `${pass.title} has been added to your Google Wallet successfully.`,
    });
  };

  const handleSharePass = (pass: WalletPass) => {
    toast({
      title: "Pass Shared",
      description: `${pass.title} has been shared successfully.`,
    });
  };

  const handleCreateNewPass = () => {
    toast({
      title: "Create New Pass",
      description: "This feature would open the pass creation wizard.",
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Google Wallet Integration
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your receipts, shopping lists, and financial insights as wallet passes
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button 
            onClick={handleCreateNewPass}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Pass
          </Button>
          <Button variant="outline" className="glass hover:bg-white/20 dark:hover:bg-black/20">
            <Download className="w-4 h-4 mr-2" />
            Export All Passes
          </Button>
          <Button variant="outline" className="glass hover:bg-white/20 dark:hover:bg-black/20">
            <QrCode className="w-4 h-4 mr-2" />
            Scan QR Code
          </Button>
        </div>

        {/* Pass Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card hover-lift">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">23</div>
              <p className="text-sm text-muted-foreground">Active Passes</p>
            </CardContent>
          </Card>
          <Card className="glass-card hover-lift">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">$156.30</div>
              <p className="text-sm text-muted-foreground">Total Savings</p>
            </CardContent>
          </Card>
          <Card className="glass-card hover-lift">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-500 mb-2">12</div>
              <p className="text-sm text-muted-foreground">This Month</p>
            </CardContent>
          </Card>
        </div>

        {/* Wallet Passes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {passes.map((pass) => {
            const Icon = getPassIcon(pass.type);
            
            return (
              <Card key={pass.id} className="glass-card hover-lift overflow-hidden">
                {/* Pass Header */}
                <div className={`bg-gradient-to-r ${pass.backgroundColor} p-4 text-white`}>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-6 h-6" />
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {pass.type.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold">{pass.title}</h3>
                  <p className="text-sm opacity-90">{pass.subtitle}</p>
                  {pass.value && (
                    <div className="text-2xl font-bold mt-2">{pass.value}</div>
                  )}
                </div>

                {/* Pass Content */}
                <CardContent className="p-4">
                  <div className="space-y-2 mb-4">
                    {pass.details.slice(0, 4).map((detail, index) => (
                      <div key={index} className="text-sm text-muted-foreground">
                        • {detail}
                      </div>
                    ))}
                    {pass.details.length > 4 && (
                      <div className="text-sm text-blue-500 cursor-pointer hover:underline">
                        +{pass.details.length - 4} more items
                      </div>
                    )}
                  </div>

                  {pass.expiryDate && (
                    <div className="text-xs text-red-500 mb-4">
                      Expires: {new Date(pass.expiryDate).toLocaleDateString()}
                    </div>
                  )}

                  {/* Pass Actions */}
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleAddToWallet(pass)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <Wallet className="w-3 h-3 mr-1" />
                      Add to Wallet
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleSharePass(pass)}
                      className="glass hover:bg-white/20 dark:hover:bg-black/20"
                    >
                      <Share className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Integration Info */}
        <Card className="glass-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <QrCode className="w-5 h-5" />
              <span>Google Wallet Integration</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">How it works:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• AI analyzes your receipts and creates digital passes</li>
                  <li>• Shopping lists are converted to actionable wallet items</li>
                  <li>• Financial insights become trackable wallet notifications</li>
                  <li>• All passes sync automatically with Google Wallet</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Features:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Real-time spending notifications</li>
                  <li>• Location-based shopping reminders</li>
                  <li>• Automatic coupon and deal discovery</li>
                  <li>• Multi-language support for receipts</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletPasses;
