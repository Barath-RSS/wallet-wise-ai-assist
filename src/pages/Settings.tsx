
import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Globe, Palette, Database, Link } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: {
      spending: true,
      insights: true,
      goals: false,
      receipts: true,
    },
    privacy: {
      analytics: true,
      sharing: false,
      location: true,
    },
    preferences: {
      language: 'en',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
      theme: 'auto',
    },
    account: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
    }
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleConnectService = (service: string) => {
    toast({
      title: `Connect ${service}`,
      description: `${service} integration would be configured here.`,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Settings
          </h1>
          <p className="text-lg text-muted-foreground">
            Customize your Project Raseed experience
          </p>
        </div>

        <div className="space-y-8">
          {/* Account Settings */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Account Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={settings.account.name}
                    onChange={(e) => setSettings({
                      ...settings,
                      account: { ...settings.account, name: e.target.value }
                    })}
                    className="glass bg-white/50 dark:bg-black/30"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.account.email}
                    onChange={(e) => setSettings({
                      ...settings,
                      account: { ...settings.account, email: e.target.value }
                    })}
                    className="glass bg-white/50 dark:bg-black/30"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={settings.account.phone}
                  onChange={(e) => setSettings({
                    ...settings,
                    account: { ...settings.account, phone: e.target.value }
                  })}
                  className="glass bg-white/50 dark:bg-black/30"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Spending Alerts</h3>
                  <p className="text-sm text-muted-foreground">Get notified when you exceed budget limits</p>
                </div>
                <Switch
                  checked={settings.notifications.spending}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, spending: checked }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">AI Insights</h3>
                  <p className="text-sm text-muted-foreground">Receive personalized savings recommendations</p>
                </div>
                <Switch
                  checked={settings.notifications.insights}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, insights: checked }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Goal Progress</h3>
                  <p className="text-sm text-muted-foreground">Updates on your financial goals</p>
                </div>
                <Switch
                  checked={settings.notifications.goals}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, goals: checked }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Receipt Processing</h3>
                  <p className="text-sm text-muted-foreground">Notifications when receipts are processed</p>
                </div>
                <Switch
                  checked={settings.notifications.receipts}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, receipts: checked }
                  })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Privacy & Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Analytics</h3>
                  <p className="text-sm text-muted-foreground">Allow usage analytics to improve the service</p>
                </div>
                <Switch
                  checked={settings.privacy.analytics}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, analytics: checked }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Data Sharing</h3>
                  <p className="text-sm text-muted-foreground">Share anonymized data for research</p>
                </div>
                <Switch
                  checked={settings.privacy.sharing}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, sharing: checked }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Location Services</h3>
                  <p className="text-sm text-muted-foreground">Enable location-based features</p>
                </div>
                <Switch
                  checked={settings.privacy.location}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, location: checked }
                  })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select value={settings.preferences.language}>
                    <SelectTrigger className="glass bg-white/50 dark:bg-black/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={settings.preferences.currency}>
                    <SelectTrigger className="glass bg-white/50 dark:bg-black/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                      <SelectItem value="CAD">CAD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select value={settings.preferences.dateFormat}>
                    <SelectTrigger className="glass bg-white/50 dark:bg-black/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={settings.preferences.theme}>
                    <SelectTrigger className="glass bg-white/50 dark:bg-black/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Integrations */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Link className="w-5 h-5" />
                <span>Integrations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-green-700 dark:text-green-300">Google Wallet</h3>
                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">Connected</span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Automatically sync passes and notifications
                  </p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Gemini AI</h3>
                    <Button 
                      size="sm" 
                      onClick={() => handleConnectService('Gemini AI')}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      Connect
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enhanced AI analysis and insights
                  </p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Bank Account</h3>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleConnectService('Bank Account')}
                      className="glass hover:bg-white/20 dark:hover:bg-black/20"
                    >
                      Connect
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automatic transaction categorization
                  </p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Cloud Storage</h3>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleConnectService('Cloud Storage')}
                      className="glass hover:bg-white/20 dark:hover:bg-black/20"
                    >
                      Connect
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Backup receipts and data automatically
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>Data Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Export Data</h3>
                    <p className="text-sm text-muted-foreground">Download all your data in CSV format</p>
                  </div>
                  <Button variant="outline" className="glass hover:bg-white/20 dark:hover:bg-black/20">
                    Export
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Clear Cache</h3>
                    <p className="text-sm text-muted-foreground">Clear temporary files and cached data</p>
                  </div>
                  <Button variant="outline" className="glass hover:bg-white/20 dark:hover:bg-black/20">
                    Clear
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-red-600">Delete Account</h3>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive">
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-center">
            <Button 
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8"
            >
              Save All Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
