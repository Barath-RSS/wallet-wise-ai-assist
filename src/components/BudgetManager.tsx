
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface BudgetItem {
  category: string;
  budgeted: number;
  spent: number;
  color: string;
}

const BudgetManager: React.FC = () => {
  const [budgets] = useState<BudgetItem[]>([
    { category: 'Groceries', budgeted: 800, spent: 567.45, color: 'bg-blue-500' },
    { category: 'Entertainment', budgeted: 300, spent: 245.20, color: 'bg-purple-500' },
    { category: 'Transportation', budgeted: 200, spent: 180.00, color: 'bg-green-500' },
    { category: 'Dining Out', budgeted: 400, spent: 420.30, color: 'bg-red-500' },
  ]);

  const totalBudgeted = budgets.reduce((sum, item) => sum + item.budgeted, 0);
  const totalSpent = budgets.reduce((sum, item) => sum + item.spent, 0);
  const remainingBudget = totalBudgeted - totalSpent;

  return (
    <Card className="glass-card hover-lift animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-blue-500" />
          <span>Budget Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Budget Summary */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Budgeted</p>
            <p className="text-lg font-bold text-blue-500">${totalBudgeted.toFixed(2)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Spent</p>
            <p className="text-lg font-bold text-purple-500">${totalSpent.toFixed(2)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Remaining</p>
            <p className={`text-lg font-bold ${remainingBudget >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ${remainingBudget.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-4">
          {budgets.map((budget, index) => {
            const percentage = (budget.spent / budget.budgeted) * 100;
            const isOverBudget = budget.spent > budget.budgeted;
            
            return (
              <div key={budget.category} className="space-y-2 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{budget.category}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">${budget.spent.toFixed(2)} / ${budget.budgeted.toFixed(2)}</span>
                    {isOverBudget ? (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>
                <Progress 
                  value={Math.min(percentage, 100)} 
                  className="h-2"
                  style={{
                    background: `linear-gradient(to right, ${isOverBudget ? '#ef4444' : '#10b981'} 0%, ${isOverBudget ? '#ef4444' : '#10b981'} ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
                  }}
                />
                <div className="text-xs text-muted-foreground">
                  {percentage.toFixed(1)}% of budget used
                </div>
              </div>
            );
          })}
        </div>

        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 animate-glow">
          <TrendingUp className="w-4 h-4 mr-2" />
          Set New Budget Goals
        </Button>
      </CardContent>
    </Card>
  );
};

export default BudgetManager;
