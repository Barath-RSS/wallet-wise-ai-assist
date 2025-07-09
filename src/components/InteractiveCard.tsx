
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
  gradient?: string;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ 
  children, 
  className, 
  title, 
  icon, 
  gradient = "from-blue-500/20 to-purple-600/20" 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden transition-all duration-500 hover-lift cursor-pointer",
        "bg-gradient-to-br glass-card backdrop-blur-xl border-white/20",
        "hover:border-white/40 hover:shadow-2xl hover:shadow-blue-500/20",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        `before:${gradient}`,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {title && (
        <CardHeader className="relative z-10">
          <CardTitle className="text-white flex items-center">
            {icon && <span className="mr-2 text-blue-400">{icon}</span>}
            {title}
          </CardTitle>
        </CardHeader>
      )}
      
      <CardContent className="relative z-10">
        {children}
      </CardContent>
      
      {/* Corner accent */}
      <div className={cn(
        "absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-400/20 to-transparent",
        "transition-all duration-500",
        isHovered ? "scale-150 opacity-100" : "scale-100 opacity-50"
      )} />
    </Card>
  );
};

export default InteractiveCard;
