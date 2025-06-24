
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, TrendingUp, MessageCircle, Calendar, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock mood trend data for the last 7 days
const moodTrendData = [
  { day: 'Mon', Emma: 4, Alex: 3, Sophie: 5 },
  { day: 'Tue', Emma: 4, Alex: 2, Sophie: 4 },
  { day: 'Wed', Emma: 3, Alex: 2, Sophie: 5 },
  { day: 'Thu', Emma: 4, Alex: 3, Sophie: 4 },
  { day: 'Fri', Emma: 5, Alex: 2, Sophie: 5 },
  { day: 'Sat', Emma: 4, Alex: 3, Sophie: 4 },
  { day: 'Sun', Emma: 4, Alex: 2, Sophie: 5 },
];

const childrenData = [
  {
    id: 1,
    name: "Emma",
    age: 8,
    avatar: "E",
    lastActivity: "2 hours ago",
    currentMood: { emoji: "😊", level: 4, trend: "stable" },
    weeklyAverage: 3.8,
    hasAlert: false,
    recentActivity: "Completed breathing exercise",
    moodDeclineCount: 0,
  },
  {
    id: 2,
    name: "Alex",
    age: 10,
    avatar: "A",
    lastActivity: "1 day ago",
    currentMood: { emoji: "😐", level: 2, trend: "declining" },
    weeklyAverage: 2.4,
    hasAlert: true,
    recentActivity: "Wrote in journal about school stress",
    moodDeclineCount: 4,
  },
  {
    id: 3,
    name: "Sophie",
    age: 6,
    avatar: "S",
    lastActivity: "30 minutes ago",
    currentMood: { emoji: "😄", level: 5, trend: "improving" },
    weeklyAverage: 4.6,
    hasAlert: false,
    recentActivity: "Played Gratitude Garden game",
    moodDeclineCount: 0,
  }
];

const weeklyStats = {
  totalSessions: 24,
  averageMood: 3.7,
  gamesPlayed: 12,
  journalEntries: 8,
  moodCheckins: 15
};

const notifications = [
  {
    id: 1,
    type: "alert" as const,
    child: "Alex",
    message: "Mood consistently low for 4 days - consider check-in",
    time: "2 hours ago",
    severity: "high" as const
  },
  {
    id: 2,
    type: "info" as const,
    child: "Emma",
    message: "Completed 7-day mood tracking streak!",
    time: "1 day ago",
    severity: "low" as const
  },
  {
    id: 3,
    type: "warning" as const,
    child: "Sophie",
    message: "Missed journal entry for 2 days",
    time: "3 hours ago",
    severity: "medium" as const
  }
];

const ParentDashboard = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-poppins">Dashboard</h1>
          <p className="text-gray-600 font-quicksand">Monitor your children's mental health and wellbeing</p>
        </div>
        <div className="text-sm text-gray-500 font-quicksand">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-poppins">Total Sessions</CardTitle>
            <MessageCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">{weeklyStats.totalSessions}</div>
            <p className="text-xs text-gray-600 font-quicksand">This week</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-poppins">Average Mood</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">{weeklyStats.averageMood}/5</div>
            <p className="text-xs text-green-600 font-quicksand">+0.3 from last week</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-poppins">Games Played</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">{weeklyStats.gamesPlayed}</div>
            <p className="text-xs text-gray-600 font-quicksand">This week</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-poppins">Journal Entries</CardTitle>
            <MessageCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">{weeklyStats.journalEntries}</div>
            <p className="text-xs text-blue-600 font-quicksand">+2 from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Mood Trend Chart */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="font-poppins">7-Day Mood Trends</CardTitle>
          <p className="text-sm text-gray-600 font-quicksand">Track mood patterns across all children</p>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  domain={[0, 5]} 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Emma" 
                  stroke="#60a5fa" 
                  strokeWidth={3}
                  dot={{ fill: '#60a5fa', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#60a5fa', strokeWidth: 2, fill: 'white' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Alex" 
                  stroke="#f87171" 
                  strokeWidth={3}
                  dot={{ fill: '#f87171', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#f87171', strokeWidth: 2, fill: 'white' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Sophie" 
                  stroke="#34d399" 
                  strokeWidth={3}
                  dot={{ fill: '#34d399', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#34d399', strokeWidth: 2, fill: 'white' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-sm font-quicksand">Emma</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-sm font-quicksand">Alex</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm font-quicksand">Sophie</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Children Overview */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="font-poppins">Children Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {childrenData.map((child) => (
              <div 
                key={child.id} 
                className={`flex items-center justify-between p-6 border rounded-lg hover:shadow-md transition-all duration-200 ${
                  child.hasAlert ? 'border-red-200 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl font-poppins shadow-lg">
                      {child.avatar}
                    </div>
                    {child.hasAlert && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg font-poppins">{child.name}</h3>
                      <span className="text-sm text-gray-500 font-quicksand">({child.age} years old)</span>
                      {child.moodDeclineCount >= 3 && (
                        <Badge variant="destructive" className="text-xs font-quicksand">
                          {child.moodDeclineCount} days declining
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 font-quicksand mb-1">{child.recentActivity}</p>
                    <p className="text-xs text-gray-500 font-quicksand">Last active: {child.lastActivity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{child.currentMood.emoji}</span>
                    <div className="text-sm">
                      <div className="font-medium font-poppins">Mood: {child.currentMood.level}/5</div>
                      <div className={`text-xs font-quicksand ${
                        child.currentMood.trend === 'improving' ? 'text-green-600' :
                        child.currentMood.trend === 'declining' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {child.currentMood.trend}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 font-quicksand">
                    Weekly avg: {child.weeklyAverage}/5
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-poppins">
            <AlertCircle className="w-5 h-5" />
            Important Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border-l-4 hover:shadow-sm transition-shadow duration-200 ${
                  notification.severity === 'high' 
                    ? 'bg-red-50 border-red-400' 
                    : notification.severity === 'medium'
                    ? 'bg-yellow-50 border-yellow-400'
                    : 'bg-blue-50 border-blue-400'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium font-poppins">{notification.child}</span>
                      <Badge 
                        variant={
                          notification.severity === 'high' ? 'destructive' : 
                          notification.severity === 'medium' ? 'secondary' : 'default'
                        }
                        className="font-quicksand"
                      >
                        {notification.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 font-quicksand">{notification.message}</p>
                  </div>
                  <span className="text-xs text-gray-500 font-quicksand">{notification.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentDashboard;
