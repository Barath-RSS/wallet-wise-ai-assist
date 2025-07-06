
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  onClick,
  className = '',
  children
}) => {
  return (
    <div
      className={`glass-card p-6 hover-lift cursor-pointer transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/20 ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl animate-glow">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default FeatureCard;
