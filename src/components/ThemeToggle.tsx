
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-3 glass-card p-3 rounded-xl hover-lift">
      <Sun className={`h-4 w-4 transition-all duration-500 ${
        theme === 'dark' ? 'text-gray-400 scale-75' : 'text-yellow-500 scale-100'
      }`} />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600 data-[state=unchecked]:bg-gradient-to-r data-[state=unchecked]:from-yellow-400 data-[state=unchecked]:to-orange-500"
      />
      <Moon className={`h-4 w-4 transition-all duration-500 ${
        theme === 'dark' ? 'text-blue-400 scale-100' : 'text-gray-400 scale-75'
      }`} />
    </div>
  );
};

export default ThemeToggle;
