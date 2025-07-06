
import React, { useState, useEffect } from 'react';
import { DollarSign, Coins, CreditCard } from 'lucide-react';

interface MoneyAnimationProps {
  trigger: boolean;
  amount?: number;
  type?: 'spend' | 'save' | 'earn';
}

const MoneyAnimation: React.FC<MoneyAnimationProps> = ({ 
  trigger, 
  amount = 0, 
  type = 'spend' 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; delay: number }>>([]);

  useEffect(() => {
    if (trigger) {
      setIsAnimating(true);
      // Create multiple particles for effect
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        delay: i * 0.1
      }));
      setParticles(newParticles);
      
      setTimeout(() => {
        setIsAnimating(false);
        setParticles([]);
      }, 2000);
    }
  }, [trigger]);

  if (!isAnimating) return null;

  const getIcon = () => {
    switch (type) {
      case 'spend': return DollarSign;
      case 'save': return Coins;
      case 'earn': return CreditCard;
      default: return DollarSign;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'spend': return 'text-red-500';
      case 'save': return 'text-green-500';
      case 'earn': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const Icon = getIcon();

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Main amount display */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className={`
          text-4xl font-bold ${getColor()} 
          animate-bounce
          drop-shadow-2xl
          animate-[scale-in_0.5s_ease-out_forwards,fade-out_0.5s_ease-out_1.5s_forwards]
        `}>
          {type === 'spend' ? '-' : '+'}${amount.toFixed(2)}
        </div>
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            animate-[money-float_2s_ease-out_forwards]
          `}
          style={{
            animationDelay: `${particle.delay}s`,
            transform: `translate(-50%, -50%) rotate(${particle.id * 45}deg) translateY(-100px)`
          }}
        >
          <Icon className={`w-8 h-8 ${getColor()} opacity-80`} />
        </div>
      ))}
      
      {/* Background pulse effect */}
      <div className={`
        absolute inset-0 
        ${type === 'spend' ? 'bg-red-500/5' : type === 'save' ? 'bg-green-500/5' : 'bg-blue-500/5'}
        animate-[pulse_1s_ease-out_2]
      `} />
    </div>
  );
};

export default MoneyAnimation;
