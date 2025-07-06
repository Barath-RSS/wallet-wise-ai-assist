
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Brain, Zap, TrendingUp, Eye, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analytics",
      description: "Smart insights into your spending patterns with advanced machine learning"
    },
    {
      icon: Shield,
      title: "Bank-Grade Security", 
      description: "End-to-end encryption ensures your financial data stays protected"
    },
    {
      icon: Zap,
      title: "Real-Time Tracking",
      description: "Instant receipt processing and expense categorization"
    },
    {
      icon: TrendingUp,
      title: "Smart Budgeting",
      description: "Automated budget suggestions based on your spending habits"
    },
    {
      icon: Eye,
      title: "Visual Insights",
      description: "Beautiful charts and graphs to understand your finances"
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your data never leaves our secure, encrypted environment"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-green-500/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div 
          ref={heroRef}
          className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="glass-card p-12 rounded-3xl backdrop-blur-2xl">
            <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6 animate-fade-in">
              Project Raseed
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-delayed-fade">
              Your AI-powered financial companion for smarter money management
            </p>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-delayed-fade">
              Transform the way you handle receipts, track expenses, and make financial decisions with cutting-edge AI technology
            </p>
            
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 animate-glow hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/onboarding')}
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div 
          ref={featuresRef}
          className={`max-w-6xl mx-auto transition-all duration-1000 ${
            featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Why Choose Project Raseed?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of personal finance management with our innovative features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className={`glass-card hover-lift floating-card animate-bounce-in animate-stagger-${index + 1}`}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-glow">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div 
          ref={ctaRef}
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="glass-card p-12 rounded-3xl backdrop-blur-2xl">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Ready to Transform Your Finances?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already revolutionized their financial management
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 animate-glow hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/onboarding')}
            >
              Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
