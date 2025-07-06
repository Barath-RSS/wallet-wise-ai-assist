
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Receipt, BarChart3, MessageSquare, Wallet, Settings } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/receipt-scanner', icon: Receipt, label: 'Receipt Scanner' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/ai-assistant', icon: MessageSquare, label: 'AI Assistant' },
    { path: '/wallet', icon: Wallet, label: 'Wallet Passes' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card m-4 rounded-2xl">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold gradient-text">Project Raseed</h1>
        </div>

        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover-lift ${
                  isActive 
                    ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/25' 
                    : 'hover:bg-white/10 dark:hover:bg-black/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
