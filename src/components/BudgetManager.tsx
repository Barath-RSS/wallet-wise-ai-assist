
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, AlertCircle, CheckCircle, Plus } from 'lucide-react';

interface BudgetItem {
  category: string;
  budgeted: number;
  spent: number;
  gradient: string;
}

const BudgetManager: React.FC = () => {
  const [budgets] = useState<BudgetItem[]>([
    { category: 'Groceries', budgeted: 15000, spent: 8567, gradient: 'from-blue-500 to-cyan-500' },
    { category: 'Entertainment', budgeted: 5000, spent: 3245, gradient: 'from-purple-500 to-pink-500' },
    { category: 'Transportation', budgeted: 3000, spent: 2180, gradient: 'from-green-500 to-emerald-500' },
    { category: 'Dining Out', budgeted: 8000, spent: 9420, gradient: 'from-orange-500 to-red-500' },
  ]);

  const totalBudgeted = budgets.reduce((sum, item) => sum + item.budgeted, 0);
  const totalSpent = budgets.reduce((sum, item) => sum + item.spent, 0);
  const remainingBudget = totalBudgeted - totalSpent;

  return (
    <Card className="glass-card hover-lift animate-fade-in bg-white/5 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Target className="w-5 h-5 text-blue-400" />
          <span>Budget Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Budget Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-xl text-center">
            <p className="text-white/70 text-sm mb-1">Budgeted</p>
            <p className="text-xl font-bold text-white">₹{totalBudgeted.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-xl text-center">
            <p className="text-white/70 text-sm mb-1">Spent</p>
            <p className="text-xl font-bold text-white">₹{totalSpent.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-4 rounded-xl text-center">
            <p className="text-white/70 text-sm mb-1">Remaining</p>
            <p className={`text-xl font-bold ${remainingBudget >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ₹{Math.abs(remainingBudget).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-4">
          {budgets.map((budget, index) => {
            const percentage = (budget.spent / budget.budgeted) * 100;
            const isOverBudget = budget.spent > budget.budgeted;
            
            return (
              <div key={budget.category} className="space-y-3 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{budget.category}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white/80 text-sm">₹{budget.spent.toLocaleString()} / ₹{budget.budgeted.toLocaleString()}</span>
                    {isOverBudget ? (
                      <AlertCircle className="w-4 h-4 text-red-400" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${budget.gradient} transition-all duration-500 ease-out rounded-full`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  {isOverBudget && (
                    <div 
                      className="absolute top-0 h-full bg-red-500/50 rounded-full"
                      style={{ 
                        left: '100%', 
                        width: `${((budget.spent - budget.budgeted) / budget.budgeted) * 100}%`,
                        minWidth: '4px'
                      }}
                    />
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/60">
                    {percentage.toFixed(1)}% of budget used
                  </span>
                  {isOverBudget && (
                    <span className="text-xs text-red-400 font-medium">
                      Over by ₹{(budget.spent - budget.budgeted).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 animate-glow">
          <Plus className="w-4 h-4 mr-2" />
          Add New Budget Category
        </Button>
      </CardContent>
    </Card>
  );
};

export default BudgetManager;
