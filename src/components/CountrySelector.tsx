
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, MapPin } from 'lucide-react';

interface Country {
  code: string;
  name: string;
  currency: string;
  symbol: string;
  flag: string;
}

const countries: Country[] = [
  { code: 'US', name: 'United States', currency: 'USD', symbol: '$', flag: '🇺🇸' },
  { code: 'IN', name: 'India', currency: 'INR', symbol: '₹', flag: '🇮🇳' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', symbol: '£', flag: '🇬🇧' },
  { code: 'EU', name: 'European Union', currency: 'EUR', symbol: '€', flag: '🇪🇺' },
  { code: 'JP', name: 'Japan', currency: 'JPY', symbol: '¥', flag: '🇯🇵' },
  { code: 'CA', name: 'Canada', currency: 'CAD', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', currency: 'AUD', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CH', name: 'Switzerland', currency: 'CHF', symbol: 'Fr', flag: '🇨🇭' },
  { code: 'SG', name: 'Singapore', currency: 'SGD', symbol: 'S$', flag: '🇸🇬' },
  { code: 'AE', name: 'UAE', currency: 'AED', symbol: 'د.إ', flag: '🇦🇪' },
];

interface CountrySelectorProps {
  onCountrySelect: (country: Country) => void;
  selectedCountry?: Country;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ onCountrySelect, selectedCountry }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="glass-card bg-white/5 backdrop-blur-xl border-white/10 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Globe className="w-5 h-5 mr-2 text-blue-400" />
          Select Your Country
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={(value) => {
          const country = countries.find(c => c.code === value);
          if (country) onCountrySelect(country);
        }}>
          <SelectTrigger className="w-full glass-card bg-white/10 border-white/20 text-white">
            <SelectValue placeholder={
              selectedCountry ? 
              `${selectedCountry.flag} ${selectedCountry.name} (${selectedCountry.symbol})` : 
              "Choose your country"
            } />
          </SelectTrigger>
          <SelectContent className="glass-card bg-black/90 backdrop-blur-xl border-white/20">
            {countries.map((country) => (
              <SelectItem 
                key={country.code} 
                value={country.code}
                className="text-white hover:bg-white/10 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{country.flag}</span>
                  <span>{country.name}</span>
                  <span className="text-blue-400">({country.symbol})</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {selectedCountry && (
          <div className="mt-4 p-3 glass-card bg-blue-500/10 rounded-lg animate-slide-in-right">
            <div className="flex items-center space-x-2 text-white">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Currency: {selectedCountry.currency} ({selectedCountry.symbol})</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CountrySelector;
