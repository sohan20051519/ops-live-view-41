import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/components/theme-provider";
import { 
  Settings as SettingsIcon,
  User,
  Palette,
  Save,
  Moon,
  Sun,
  Monitor
} from "lucide-react";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Admin",
    lastName: "User", 
    email: "admin@oneops.com",
    company: "OneOps Inc.",
    phone: "+1 (555) 123-4567",
    timezone: "UTC-8"
  });

  const [notifications, setNotifications] = useState({
    deployments: true,
    builds: true,
    failures: true,
    security: true
  });

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your OneOps platform preferences</p>
        </div>
        <Button className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <SettingsIcon className="w-4 h-4" />
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={personalInfo.firstName}
                    onChange={(e) => handlePersonalInfoChange("firstName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={personalInfo.lastName}
                    onChange={(e) => handlePersonalInfoChange("lastName", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={personalInfo.company}
                    onChange={(e) => handlePersonalInfoChange("company", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={personalInfo.timezone} onValueChange={(value) => handlePersonalInfoChange("timezone", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC-12">UTC-12 (Baker Island)</SelectItem>
                    <SelectItem value="UTC-11">UTC-11 (Hawaii)</SelectItem>
                    <SelectItem value="UTC-10">UTC-10 (Alaska)</SelectItem>
                    <SelectItem value="UTC-9">UTC-9 (Pacific)</SelectItem>
                    <SelectItem value="UTC-8">UTC-8 (Mountain)</SelectItem>
                    <SelectItem value="UTC-7">UTC-7 (Central)</SelectItem>
                    <SelectItem value="UTC-6">UTC-6 (Eastern)</SelectItem>
                    <SelectItem value="UTC-5">UTC-5 (Atlantic)</SelectItem>
                    <SelectItem value="UTC+0">UTC+0 (London)</SelectItem>
                    <SelectItem value="UTC+1">UTC+1 (Berlin)</SelectItem>
                    <SelectItem value="UTC+2">UTC+2 (Cairo)</SelectItem>
                    <SelectItem value="UTC+3">UTC+3 (Moscow)</SelectItem>
                    <SelectItem value="UTC+8">UTC+8 (Singapore)</SelectItem>
                    <SelectItem value="UTC+9">UTC+9 (Tokyo)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Theme & Appearance */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Theme & Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-4 block">Theme Selection</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card 
                    className={`cursor-pointer border-2 transition-colors ${
                      theme === "light" ? "border-primary bg-primary/5" : "border-border hover:border-border/60"
                    }`}
                    onClick={() => setTheme("light")}
                  >
                    <CardContent className="p-4 text-center">
                      <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                      <h3 className="font-semibold">Light</h3>
                      <p className="text-sm text-muted-foreground">Clean and bright interface</p>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer border-2 transition-colors ${
                      theme === "dark" ? "border-primary bg-primary/5" : "border-border hover:border-border/60"
                    }`}
                    onClick={() => setTheme("dark")}
                  >
                    <CardContent className="p-4 text-center">
                      <Moon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <h3 className="font-semibold">Dark</h3>
                      <p className="text-sm text-muted-foreground">Easy on the eyes</p>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer border-2 transition-colors ${
                      theme === "system" ? "border-primary bg-primary/5" : "border-border hover:border-border/60"
                    }`}
                    onClick={() => setTheme("system")}
                  >
                    <CardContent className="p-4 text-center">
                      <Monitor className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <h3 className="font-semibold">System</h3>
                      <p className="text-sm text-muted-foreground">Follows system preference</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">Display Options</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="compact-mode">Compact Mode</Label>
                      <p className="text-sm text-muted-foreground">Reduce spacing and padding</p>
                    </div>
                    <Switch id="compact-mode" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sidebar-mini">Mini Sidebar</Label>
                      <p className="text-sm text-muted-foreground">Show only icons in sidebar</p>
                    </div>
                    <Switch id="sidebar-mini" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5 text-primary" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-medium">Email Notifications</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notify-deployments">Deployment Updates</Label>
                      <p className="text-sm text-muted-foreground">Get notified about deployment status changes</p>
                    </div>
                    <Switch 
                      id="notify-deployments"
                      checked={notifications.deployments}
                      onCheckedChange={(value) => handleNotificationChange("deployments", value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notify-builds">Build Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive updates on build completions</p>
                    </div>
                    <Switch 
                      id="notify-builds"
                      checked={notifications.builds}
                      onCheckedChange={(value) => handleNotificationChange("builds", value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notify-failures">Failure Alerts</Label>
                      <p className="text-sm text-muted-foreground">Critical alerts for deployment failures</p>
                    </div>
                    <Switch 
                      id="notify-failures"
                      checked={notifications.failures}
                      onCheckedChange={(value) => handleNotificationChange("failures", value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notify-security">Security Updates</Label>
                      <p className="text-sm text-muted-foreground">Important security notifications</p>
                    </div>
                    <Switch 
                      id="notify-security"
                      checked={notifications.security}
                      onCheckedChange={(value) => handleNotificationChange("security", value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">General Preferences</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="auto-refresh">Auto Refresh Interval</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="30 seconds" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 seconds</SelectItem>
                        <SelectItem value="30">30 seconds</SelectItem>
                        <SelectItem value="60">1 minute</SelectItem>
                        <SelectItem value="300">5 minutes</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="default-branch">Default Branch</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="main" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">main</SelectItem>
                        <SelectItem value="master">master</SelectItem>
                        <SelectItem value="develop">develop</SelectItem>
                        <SelectItem value="staging">staging</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;