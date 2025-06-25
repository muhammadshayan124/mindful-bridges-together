
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown, Users, Calendar, Bell } from "lucide-react";

// Mock data
const moodData = [
  { day: 'Mon', Emma: 8, Lucas: 6 },
  { day: 'Tue', Emma: 7, Lucas: 7 },
  { day: 'Wed', Emma: 9, Lucas: 5 },
  { day: 'Thu', Emma: 6, Lucas: 8 },
  { day: 'Fri', Emma: 8, Lucas: 6 },
  { day: 'Sat', Emma: 9, Lucas: 9 },
  { day: 'Sun', Emma: 8, Lucas: 7 },
];

const children = [
  {
    id: 1,
    name: "Emma",
    avatar: "👧",
    currentMood: "😊",
    moodScore: 8,
    lastActivity: "2 hours ago",
    alertFlag: false,
    streak: 5
  },
  {
    id: 2,
    name: "Lucas",
    avatar: "👦",
    currentMood: "😐",
    moodScore: 6,
    lastActivity: "30 minutes ago",
    alertFlag: true,
    streak: 2
  }
];

const notifications = [
  {
    id: 1,
    type: "warning",
    message: "Lucas has reported low mood for 3 consecutive days",
    time: "2 hours ago",
    priority: "high"
  },
  {
    id: 2,
    type: "info",
    message: "Emma completed her daily journal entry",
    time: "4 hours ago",
    priority: "low"
  }
];

const ParentDashboard = () => {
  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-poppins">Dashboard</h1>
          <p className="text-gray-600 font-quicksand mt-1">Monitor your children's wellbeing</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 self-start sm:self-auto">
          <Calendar className="w-4 h-4 mr-2" />
          View Calendar
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium font-quicksand">Total Children</p>
                <p className="text-2xl lg:text-3xl font-bold text-blue-800 font-poppins">2</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium font-quicksand">Avg Mood Today</p>
                <p className="text-2xl lg:text-3xl font-bold text-green-800 font-poppins">7.5</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium font-quicksand">Active Alerts</p>
                <p className="text-2xl lg:text-3xl font-bold text-orange-800 font-poppins">1</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium font-quicksand">Weekly Check-ins</p>
                <p className="text-2xl lg:text-3xl font-bold text-purple-800 font-poppins">14</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mood Trends Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-poppins">7-Day Mood Trends</CardTitle>
            <CardDescription className="font-quicksand">
              Track mood patterns over the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="Emma" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Lucas" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-poppins">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-3 lg:p-4 rounded-lg border-l-4 ${
                  notification.priority === 'high' 
                    ? 'bg-red-50 border-red-400' 
                    : 'bg-blue-50 border-blue-400'
                }`}
              >
                <p className="text-sm font-medium text-gray-800 font-quicksand">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Children Summary Cards */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 font-poppins">Children Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {children.map((child) => (
            <Card key={child.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl lg:text-4xl">{child.avatar}</div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 font-poppins">{child.name}</h3>
                      <p className="text-sm text-gray-500 font-quicksand">Last active: {child.lastActivity}</p>
                    </div>
                  </div>
                  {child.alertFlag && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Alert
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 font-quicksand">Current Mood</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{child.currentMood}</span>
                      <span className="text-sm font-semibold text-gray-700">{child.moodScore}/10</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 font-quicksand">Check-in Streak</span>
                    <span className="text-sm font-semibold text-blue-600">{child.streak} days</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${child.moodScore * 10}%` }}
                    ></div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
