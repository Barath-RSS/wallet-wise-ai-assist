
import React, { useState, useCallback } from 'react';
import { Upload, Camera, FileImage, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ReceiptData {
  id: string;
  storeName: string;
  date: string;
  total: number;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  tax: number;
  status: 'processing' | 'completed' | 'error';
}

const ReceiptScanner: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [receipts, setReceipts] = useState<ReceiptData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processReceipt = async (file: File) => {
    setIsProcessing(true);
    
    // Mock AI processing
    const mockReceipt: ReceiptData = {
      id: Date.now().toString(),
      storeName: 'Walmart Supercenter',
      date: new Date().toLocaleDateString(),
      total: Math.random() * 100 + 20,
      items: [
        { name: 'Organic Bananas', price: 3.47, quantity: 2 },
        { name: 'Whole Milk', price: 4.29, quantity: 1 },
        { name: 'Bread Loaf', price: 2.98, quantity: 1 },
        { name: 'Chicken Breast', price: 12.45, quantity: 1 },
      ],
      tax: 2.34,
      status: 'processing'
    };

    setReceipts(prev => [mockReceipt, ...prev]);

    // Simulate processing time
    setTimeout(() => {
      setReceipts(prev => 
        prev.map(receipt => 
          receipt.id === mockReceipt.id 
            ? { ...receipt, status: 'completed' as const }
            : receipt
        )
      );
      setIsProcessing(false);
      
      toast({
        title: "Receipt Processed Successfully",
        description: `Found ${mockReceipt.items.length} items totaling $${mockReceipt.total.toFixed(2)}`,
      });
    }, 3000);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      processReceipt(imageFiles[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      processReceipt(files[0]);
    }
  };

  const handleCameraCapture = () => {
    toast({
      title: "Camera Feature",
      description: "Camera integration would be implemented here with real device camera access",
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Smart Receipt Scanner
          </h1>
          <p className="text-lg text-muted-foreground">
            Upload receipts and let AI extract all the details automatically
          </p>
        </div>

        {/* Upload Section */}
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Upload Receipt</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                isDragging
                  ? 'border-blue-500 bg-blue-500/10 scale-105'
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-glow">
                  <FileImage className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Drop your receipt here</h3>
                  <p className="text-muted-foreground mb-4">
                    Support for JPG, PNG, PDF files. AI will analyze automatically.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    <Upload className="w-4 h-4 mr-2" />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Choose File
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleCameraCapture}
                    className="glass hover:bg-white/20 dark:hover:bg-black/20"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Use Camera
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Processing Status */}
        {isProcessing && (
          <Card className="glass-card mb-8 border-blue-500/50">
            <CardContent className="flex items-center justify-center p-8">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Processing Receipt...</h3>
                <p className="text-muted-foreground">
                  AI is extracting items, prices, and details from your receipt
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Receipts */}
        {receipts.length > 0 && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Recent Receipts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {receipts.map((receipt) => (
                  <div
                    key={receipt.id}
                    className="p-6 bg-white/50 dark:bg-black/20 rounded-xl border border-white/20 dark:border-white/10 hover-lift"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{receipt.storeName}</h3>
                        <p className="text-sm text-muted-foreground">{receipt.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {receipt.status === 'processing' && (
                          <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                        )}
                        {receipt.status === 'completed' && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        {receipt.status === 'error' && (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        )}
                        <span className="text-2xl font-bold">
                          ${receipt.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {receipt.status === 'completed' && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {receipt.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-3 bg-white/30 dark:bg-black/30 rounded-lg"
                            >
                              <div>
                                <span className="font-medium">{item.name}</span>
                                <span className="text-sm text-muted-foreground ml-2">
                                  x{item.quantity}
                                </span>
                              </div>
                              <span className="font-semibold">
                                ${item.price.toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-white/20 dark:border-white/10">
                          <span className="text-sm text-muted-foreground">
                            Tax: ${receipt.tax.toFixed(2)}
                          </span>
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                          >
                            Add to Wallet
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReceiptScanner;
