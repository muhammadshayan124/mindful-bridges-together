
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Bell, Shield, Clock, User } from "lucide-react";

const ParentSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account, notifications, and parental controls</p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="controls">Parental Controls</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Sarah" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Johnson" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="sarah.johnson@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connected Children</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      E
                    </div>
                    <div>
                      <p className="font-medium">Emma</p>
                      <p className="text-sm text-gray-600">Age 8 • Connected since Sep 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      A
                    </div>
                    <div>
                      <p className="font-medium">Alex</p>
                      <p className="text-sm text-gray-600">Age 10 • Connected since Aug 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      S
                    </div>
                    <div>
                      <p className="font-medium">Sophie</p>
                      <p className="text-sm text-gray-600">Age 6 • Connected since Oct 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">Add New Child</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Daily Summary</p>
                    <p className="text-sm text-gray-600">Receive daily activity summaries</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Low Mood Alerts</p>
                    <p className="text-sm text-gray-600">Get notified when mood drops consistently</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Achievement Notifications</p>
                    <p className="text-sm text-gray-600">Celebrate your child's milestones</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Reports</p>
                    <p className="text-sm text-gray-600">Comprehensive weekly progress reports</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Inactivity Reminders</p>
                    <p className="text-sm text-gray-600">Gentle reminders when child hasn't logged in</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Notification Methods</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Email Notifications</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>SMS Notifications</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Push Notifications</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="controls" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Time Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Daily Usage Limits</Label>
                  <p className="text-sm text-gray-600 mb-3">Set maximum daily usage time for each child</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span>Emma (Age 8)</span>
                      <div className="flex items-center gap-2">
                        <Input type="number" defaultValue="60" className="w-20" />
                        <span className="text-sm text-gray-600">minutes/day</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span>Alex (Age 10)</span>
                      <div className="flex items-center gap-2">
                        <Input type="number" defaultValue="90" className="w-20" />
                        <span className="text-sm text-gray-600">minutes/day</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span>Sophie (Age 6)</span>
                      <div className="flex items-center gap-2">
                        <Input type="number" defaultValue="45" className="w-20" />
                        <span className="text-sm text-gray-600">minutes/day</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Allowed Hours</Label>
                  <p className="text-sm text-gray-600 mb-3">Set when children can access the platform</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input id="startTime" type="time" defaultValue="15:00" />
                    </div>
                    <div>
                      <Label htmlFor="endTime">End Time</Label>
                      <Input id="endTime" type="time" defaultValue="20:00" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Safe Mode</p>
                  <p className="text-sm text-gray-600">Extra content filtering for younger children</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Profanity Filter</p>
                  <p className="text-sm text-gray-600">Block inappropriate language in chats</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Advanced AI Monitoring</p>
                  <p className="text-sm text-gray-600">AI analyzes conversations for concerning content</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Sharing with AI</p>
                    <p className="text-sm text-gray-600">Allow anonymized data to improve AI responses</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Research Participation</p>
                    <p className="text-sm text-gray-600">Participate in child mental health research (anonymized)</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Third-party Analytics</p>
                    <p className="text-sm text-gray-600">Help us improve the platform with usage analytics</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Data Management</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Download My Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Request Data Deletion
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    View Privacy Policy
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Security</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Enable Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    View Login History
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentSettings;
