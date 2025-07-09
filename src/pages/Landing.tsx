
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Upload, BarChart3, Mic, MicOff, MessageCircle, Star, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import GeminiChatbot from '@/components/GeminiChatbot';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3D Graph Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(1, 'rgba(147, 51, 234, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated graph lines
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for (let x = 0; x < canvas.width; x += 10) {
        const y = canvas.height / 2 + Math.sin((x + time) * 0.01) * 50;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw floating data points
      ctx.fillStyle = 'rgba(34, 197, 94, 0.8)';
      for (let i = 0; i < 5; i++) {
        const x = (canvas.width / 6) * (i + 1) + Math.sin(time * 0.005 + i) * 20;
        const y = canvas.height / 2 + Math.cos(time * 0.003 + i) * 30;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 1;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Voice recognition implementation would go here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden cursor-custom">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden particle-bg">
        <div 
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float animate-morphing"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            top: '10%',
            left: '10%'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            top: '60%',
            right: '10%',
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-float animate-morphing"
          style={{
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
            bottom: '20%',
            left: '50%',
            animationDelay: '4s'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center animate-glow animate-rotate3d">
              <span className="text-white font-bold text-xl">$</span>
            </div>
            <h1 className="text-2xl font-bold text-white text-glow">Project Raseed</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white/80 hover:text-white transition-colors hover:text-glow">Features</a>
            <a href="#about" className="text-white/80 hover:text-white transition-colors hover:text-glow">About</a>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/10 hover:scale-110 transition-all duration-300"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button 
              className="bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white px-6 py-2 rounded-full font-semibold animate-glow hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/onboarding')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:scale-110 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass-enhanced border-t border-white/10 p-6 animate-slide-in-right">
            <div className="space-y-4">
              <a href="#features" className="block text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#about" className="block text-white/80 hover:text-white transition-colors">About</a>
              <Button 
                className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white rounded-full font-semibold"
                onClick={() => navigate('/onboarding')}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div 
            ref={heroRef}
            className={`space-y-8 transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="inline-flex items-center space-x-2 glass-enhanced rounded-full px-4 py-2 border border-white/20 animate-sparkle">
              <Star className="w-4 h-4 text-orange-400 animate-sparkle" />
              <span className="text-white/90 text-sm">AI-Powered Receipt Intelligence</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight text-glow">
                Your Smart
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent animate-gradient-shift">
                  Financial
                </span>
                <br />
                Assistant
              </h1>

              <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
                Transform your receipts into actionable insights with AI. Seamlessly integrated with Google Wallet for the ultimate financial management experience.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white px-8 py-4 rounded-full font-semibold text-lg animate-glow hover:scale-105 transition-all duration-300 perspective-card"
                onClick={() => navigate('/receipt-scanner')}
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Receipt
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-lg glass-enhanced hover:scale-105 transition-all duration-300 perspective-card"
                onClick={() => navigate('/analytics')}
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Analyze Spending
              </Button>
            </div>
          </div>

          {/* Right Content - Glass Card with 3D Graph */}
          <div 
            className={`relative transition-all duration-1000 delay-300 ${
              heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div 
              className="glass-enhanced p-8 rounded-3xl border border-white/20 shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 transform hover:scale-105 card-3d box-glow"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * 0.005}deg) rotateX(${mousePosition.y * -0.005}deg)`
              }}
            >
              {/* Wallet Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center animate-glow">
                    <span className="text-white font-bold">$</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Google Wallet</h3>
                    <p className="text-white/60 text-sm">Smart Receipt Manager</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-white text-glow">$2,847</p>
                  <p className="text-green-400 text-sm">↗ +12.5%</p>
                </div>
              </div>

              {/* 3D Graph Canvas */}
              <div className="relative mb-6 h-32 rounded-xl overflow-hidden glass-enhanced">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full"
                  style={{ background: 'transparent' }}
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-enhanced rounded-xl p-4 border border-white/10 hover:scale-105 transition-all duration-300">
                  <p className="text-white/60 text-sm">Recent Transactions</p>
                  <p className="text-white text-2xl font-bold">24</p>
                </div>
                <div className="glass-enhanced rounded-xl p-4 border border-white/10 hover:scale-105 transition-all duration-300">
                  <p className="text-white/60 text-sm">Monthly Savings</p>
                  <p className="text-green-400 text-2xl font-bold">$184</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-20">
        <div 
          ref={statsRef}
          className={`max-w-7xl mx-auto transition-all duration-1000 ${
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center glass-enhanced p-8 rounded-2xl border border-white/20 hover:scale-105 transition-all duration-300 card-3d animate-stagger-1">
              <h3 className="text-5xl font-bold text-white mb-2 text-glow">10M+</h3>
              <p className="text-white/70">Receipts Processed</p>
            </div>
            <div className="text-center glass-enhanced p-8 rounded-2xl border border-white/20 hover:scale-105 transition-all duration-300 card-3d animate-stagger-2">
              <h3 className="text-5xl font-bold text-white mb-2 text-glow">95%</h3>
              <p className="text-white/70">Accuracy Rate</p>
            </div>
            <div className="text-center glass-enhanced p-8 rounded-2xl border border-white/20 hover:scale-105 transition-all duration-300 card-3d animate-stagger-3">
              <h3 className="text-5xl font-bold text-white mb-2 text-glow">$2.5B</h3>
              <p className="text-white/70">Savings Generated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Assistant Button */}
      <Button
        className={`fixed bottom-24 right-6 w-16 h-16 rounded-full z-50 transition-all duration-300 ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
        } shadow-2xl animate-float animate-floating-cursor`}
        onClick={handleVoiceToggle}
      >
        {isListening ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
      </Button>

      {/* Gemini AI Chatbot Button */}
      <Button
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 z-50 shadow-2xl animate-glow animate-rainbow-pulse hover:scale-110 transition-all duration-300"
        onClick={() => setIsChatOpen(true)}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>

      {/* Gemini AI Chatbot */}
      <GeminiChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Landing;
