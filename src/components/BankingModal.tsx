
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Building, Smartphone, CreditCard } from 'lucide-react';

interface BankingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (type: string, name: string) => void;
}

const BankingModal: React.FC<BankingModalProps> = ({ isOpen, onClose, onConnect }) => {
  const banks = [
    { name: 'State Bank of India', url: 'https://www.onlinesbi.sbi/', logo: '🏦' },
    { name: 'HDFC Bank', url: 'https://netbanking.hdfcbank.com/', logo: '🏦' },
    { name: 'ICICI Bank', url: 'https://www.icicibank.com/', logo: '🏦' },
    { name: 'Axis Bank', url: 'https://www.axisbank.com/', logo: '🏦' },
    { name: 'Kotak Mahindra Bank', url: 'https://www.kotak.com/', logo: '🏦' },
    { name: 'Punjab National Bank', url: 'https://www.pnbindia.in/', logo: '🏦' },
  ];

  const upiApps = [
    { name: 'Google Pay', url: 'https://pay.google.com/', logo: '💳' },
    { name: 'PhonePe', url: 'https://www.phonepe.com/', logo: '📱' },
    { name: 'Paytm', url: 'https://paytm.com/', logo: '💰' },
    { name: 'Amazon Pay', url: 'https://www.amazon.in/amazonpay', logo: '🛒' },
    { name: 'BHIM UPI', url: 'https://www.npci.org.in/what-we-do/upi/product-overview', logo: '🇮🇳' },
    { name: 'Mobikwik', url: 'https://www.mobikwik.com/', logo: '📲' },
  ];

  const creditCards = [
    { name: 'HDFC Credit Card', url: 'https://www.hdfcbank.com/personal/pay/cards/credit-cards', logo: '💳' },
    { name: 'SBI Credit Card', url: 'https://www.sbicard.com/', logo: '💳' },
    { name: 'ICICI Credit Card', url: 'https://www.icicibank.com/personal-banking/cards/credit-card', logo: '💳' },
    { name: 'Axis Bank Credit Card', url: 'https://www.axisbank.com/personal/cards/credit-card', logo: '💳' },
    { name: 'American Express', url: 'https://www.americanexpress.com/in/', logo: '💳' },
    { name: 'Citibank Credit Card', url: 'https://www.online.citibank.co.in/products-services/credit-cards/', logo: '💳' },
  ];

  const handleConnect = (type: string, item: any) => {
    window.open(item.url, '_blank');
    onConnect(type, item.name);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto glass-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">Connect Your Accounts</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="banks" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="banks" className="flex items-center">
              <Building className="w-4 h-4 mr-2" />
              Banks
            </TabsTrigger>
            <TabsTrigger value="upi" className="flex items-center">
              <Smartphone className="w-4 h-4 mr-2" />
              UPI Apps
            </TabsTrigger>
            <TabsTrigger value="cards" className="flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              Credit Cards
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="banks" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {banks.map((bank, index) => (
                <Card key={index} className="hover-lift transition-all duration-300 cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-2">{bank.logo}</div>
                    <h3 className="font-semibold mb-2">{bank.name}</h3>
                    <Button 
                      onClick={() => handleConnect('bank', bank)}
                      className="w-full"
                      size="sm"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="upi" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upiApps.map((app, index) => (
                <Card key={index} className="hover-lift transition-all duration-300 cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-2">{app.logo}</div>
                    <h3 className="font-semibold mb-2">{app.name}</h3>
                    <Button 
                      onClick={() => handleConnect('upi', app)}
                      className="w-full"
                      size="sm"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="cards" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {creditCards.map((card, index) => (
                <Card key={index} className="hover-lift transition-all duration-300 cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-2">{card.logo}</div>
                    <h3 className="font-semibold mb-2">{card.name}</h3>
                    <Button 
                      onClick={() => handleConnect('card', card)}
                      className="w-full"
                      size="sm"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default BankingModal;
