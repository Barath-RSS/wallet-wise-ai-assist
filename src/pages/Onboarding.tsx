
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, User, Mail, Phone, MapPin, Shield, Eye, EyeOff, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  zipCode: string;
  password: string;
  confirmPassword: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    zipCode: '',
    password: '',
    confirmPassword: ''
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const { ref: cardRef, isVisible: cardVisible } = useScrollAnimation();

  // Enhanced validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string): { isValid: boolean; strength: string; errors: string[] } => {
    const errors: string[] = [];
    let strength = 'Weak';

    if (password.length < 8) errors.push('At least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
    if (!/\d/.test(password)) errors.push('One number');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('One special character');

    if (errors.length === 0) strength = 'Strong';
    else if (errors.length <= 2) strength = 'Medium';

    return { isValid: errors.length === 0, strength, errors };
  };

  const validateZipCode = (zipCode: string): boolean => {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zipCode);
  };

  const validateAge = (dateOfBirth: string): boolean => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouchedFields(prev => new Set(prev).add(field));
    
    // Real-time validation
    const errors: ValidationErrors = {};
    
    if (field === 'email' && value && !validateEmail(value)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (field === 'phone' && value && !validatePhone(value)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (field === 'password' && value) {
      const validation = validatePassword(value);
      if (!validation.isValid) {
        errors.password = `Missing: ${validation.errors.join(', ')}`;
      }
    }
    
    if (field === 'confirmPassword' && value && value !== formData.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (field === 'zipCode' && value && !validateZipCode(value)) {
      errors.zipCode = 'Please enter a valid ZIP code (12345 or 12345-6789)';
    }
    
    if (field === 'dateOfBirth' && value && !validateAge(value)) {
      errors.dateOfBirth = 'You must be at least 18 years old';
    }
    
    setValidationErrors(prev => ({ ...prev, ...errors }));
  };

  const handleBlur = (field: keyof FormData) => {
    setTouchedFields(prev => new Set(prev).add(field));
  };

  const getPasswordStrength = () => {
    if (!formData.password) return { strength: '', color: '' };
    const validation = validatePassword(formData.password);
    const colors = {
      'Weak': 'text-red-400',
      'Medium': 'text-yellow-400',
      'Strong': 'text-green-400'
    };
    return { strength: validation.strength, color: colors[validation.strength as keyof typeof colors] };
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('User data:', formData);
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3 text-white mx-auto mb-4 animate-glow">
                <User className="w-full h-full" />
              </div>
              <h2 className="text-2xl font-bold gradient-text">Personal Information</h2>
              <p className="text-muted-foreground">Let's get to know you better</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  onBlur={() => handleBlur('firstName')}
                  placeholder="Enter your first name"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  onBlur={() => handleBlur('lastName')}
                  placeholder="Enter your last name"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="your.email@example.com"
                  className={`mt-2 ${validationErrors.email && touchedFields.has('email') ? 'border-red-500' : ''}`}
                  required
                />
                {validationErrors.email && touchedFields.has('email') && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {validationErrors.email}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  placeholder="+1 (555) 000-0000"
                  className={`mt-2 ${validationErrors.phone && touchedFields.has('phone') ? 'border-red-500' : ''}`}
                  required
                />
                {validationErrors.phone && touchedFields.has('phone') && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {validationErrors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full p-3 text-white mx-auto mb-4 animate-glow">
                <MapPin className="w-full h-full" />
              </div>
              <h2 className="text-2xl font-bold gradient-text">Address & Age Verification</h2>
              <p className="text-muted-foreground">Secure information for account verification</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  onBlur={() => handleBlur('dateOfBirth')}
                  className={`mt-2 ${validationErrors.dateOfBirth && touchedFields.has('dateOfBirth') ? 'border-red-500' : ''}`}
                  required
                />
                {validationErrors.dateOfBirth && touchedFields.has('dateOfBirth') && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {validationErrors.dateOfBirth}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  onBlur={() => handleBlur('address')}
                  placeholder="123 Main Street"
                  className="mt-2"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    onBlur={() => handleBlur('city')}
                    placeholder="Your city"
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    onBlur={() => handleBlur('zipCode')}
                    placeholder="12345"
                    className={`mt-2 ${validationErrors.zipCode && touchedFields.has('zipCode') ? 'border-red-500' : ''}`}
                    required
                  />
                  {validationErrors.zipCode && touchedFields.has('zipCode') && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {validationErrors.zipCode}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        const passwordStrength = getPasswordStrength();
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full p-3 text-white mx-auto mb-4 animate-glow">
                <Lock className="w-full h-full" />
              </div>
              <h2 className="text-2xl font-bold gradient-text">Enhanced Security Setup</h2>
              <p className="text-muted-foreground">Create a strong password to protect your account</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onBlur={() => handleBlur('password')}
                    placeholder="Create a strong password"
                    className={`mt-2 pr-10 ${validationErrors.password && touchedFields.has('password') ? 'border-red-500' : ''}`}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-2 h-10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {formData.password && (
                  <p className={`text-sm mt-1 ${passwordStrength.color}`}>
                    Password strength: {passwordStrength.strength}
                  </p>
                )}
                {validationErrors.password && touchedFields.has('password') && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {validationErrors.password}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    onBlur={() => handleBlur('confirmPassword')}
                    placeholder="Confirm your password"
                    className={`mt-2 pr-10 ${validationErrors.confirmPassword && touchedFields.has('confirmPassword') ? 'border-red-500' : ''}`}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-2 h-10"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <p className="text-green-500 text-sm mt-1 flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Passwords match
                  </p>
                )}
                {validationErrors.confirmPassword && touchedFields.has('confirmPassword') && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {validationErrors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Password Requirements:</h4>
                <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• One uppercase letter</li>
                  <li>• One lowercase letter</li>
                  <li>• One number</li>
                  <li>• One special character (!@#$%^&*)</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full p-3 text-white mx-auto mb-4 animate-glow">
                <Shield className="w-full h-full" />
              </div>
              <h2 className="text-2xl font-bold gradient-text">Security & Privacy Confirmation</h2>
              <p className="text-muted-foreground">Your data is protected with enterprise-grade security</p>
            </div>
            
            <div className="space-y-4">
              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 animate-fade-in">
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2 flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  End-to-End Encryption
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Your financial data is protected with AES-256 encryption
                </p>
              </div>
              
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  GDPR Compliant
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  We follow international data protection standards
                </p>
              </div>
              
              <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2 flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Multi-Factor Authentication
                </h3>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Additional security layers protect your account
                </p>
              </div>

              <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300 mb-2 flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Zero Data Sharing
                </h3>
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  We never share your personal information with third parties
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    const hasValidationErrors = Object.keys(validationErrors).length > 0;
    
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone && !hasValidationErrors;
      case 2:
        return formData.dateOfBirth && formData.address && formData.city && formData.zipCode && !hasValidationErrors;
      case 3:
        return formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && !hasValidationErrors;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center px-4 py-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-green-500/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div 
        ref={cardRef}
        className={`w-full max-w-2xl transition-all duration-1000 relative z-10 ${
          cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <Card className="glass-card backdrop-blur-xl border border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold gradient-text mb-4">
              Welcome to Project Raseed
            </CardTitle>
            <Progress value={(step / 4) * 100} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">
              Step {step} of 4 - {['Personal Info', 'Address', 'Security', 'Confirmation'][step - 1]}
            </p>
          </CardHeader>
          
          <CardContent className="p-8">
            {renderStep()}
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              {step < 4 ? (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="flex items-center bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                >
                  Complete Setup
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
